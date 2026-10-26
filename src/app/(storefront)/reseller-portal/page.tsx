import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/states";
import { ROUTES } from "@/constants/routes";
import { PartnerGateNotice } from "@/features/reseller/partner-gate-notice";
import { SalesChart } from "@/features/reseller/sales-chart";
import { formatIDR } from "@/lib/utils/format";
import { PARTNER_TYPE_LABELS, summarizeSales } from "@/services/reseller/model";
import { listPartnerOrders, requirePartner } from "@/services/reseller/reseller";

export const metadata = { title: "Ringkasan" };

export default async function ResellerDashboardPage() {
  const gate = await requirePartner(ROUTES.resellerPortal.dashboard);
  if (gate.status !== "ok") return <PartnerGateNotice status={gate.status} retryHref={ROUTES.resellerPortal.dashboard} />;
  const { partner } = gate;
  const orders = await listPartnerOrders();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-h1 text-brand-cocoa-dark">Halo, {partner.storeName ?? "Partner"}</h1>
        <p className="mt-2 text-body-s text-text-secondary">
          {PARTNER_TYPE_LABELS[partner.memberType]}
          {partner.memberType === "reseller" && ` · Level ${partner.tierLevel}`} · Harga partner berlaku otomatis saat kamu berbelanja.
        </p>
      </div>

      {orders === null ? (
        <ErrorState
          description="Ringkasan pesanan belum dapat dimuat. Silakan coba lagi dalam beberapa saat."
          action={
            <ButtonLink href={ROUTES.resellerPortal.dashboard} variant="secondary">
              Coba lagi
            </ButtonLink>
          }
        />
      ) : (
        <Dashboard orders={orders} />
      )}

      <Card as="section" tone="ai" padding="lg" className="flex flex-col gap-3" aria-labelledby="ai-cta">
        <h2 id="ai-cta" className="text-h4">
          Butuh ide caption atau info produk?
        </h2>
        <p className="text-body-s text-text-secondary">Asisten AI partner membantu menyusun materi jualan dari informasi produk resmi CNS Beauty.</p>
        <div>
          <ButtonLink href={ROUTES.resellerPortal.ai} variant="ai">
            Buka Asisten AI
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}

function Dashboard({ orders }: { orders: Parameters<typeof summarizeSales>[0] }) {
  const summary = summarizeSales(orders);

  return (
    <>
      <dl className="grid gap-4 tablet:grid-cols-3">
        {[
          { label: "Total pembelian (dibayar)", value: formatIDR(summary.purchaseTotal) },
          { label: "Pesanan dibayar", value: summary.paidOrders.toLocaleString("id-ID") },
          { label: "Menunggu pembayaran", value: summary.pendingOrders.toLocaleString("id-ID") },
        ].map((stat) => (
          <Card key={stat.label} tone="surface" padding="md">
            <dt className="text-caption text-text-secondary">{stat.label}</dt>
            <dd className="mt-1 font-display text-h2 text-brand-cocoa-dark">{stat.value}</dd>
          </Card>
        ))}
      </dl>

      <section aria-labelledby="monthly-title" className="flex flex-col gap-4">
        <h2 id="monthly-title" className="text-h3">
          Pembelian 6 bulan terakhir
        </h2>
        {summary.paidOrders === 0 ? (
          <p className="text-body-s text-text-secondary">
            Belum ada pesanan partner yang dibayar. Lihat{" "}
            <Link href={ROUTES.resellerPortal.products} className="font-medium text-text-primary underline underline-offset-4">
              daftar harga partner
            </Link>{" "}
            untuk mulai berbelanja.
          </p>
        ) : (
          <SalesChart months={summary.months} />
        )}
      </section>

      {summary.topProducts.length > 0 && (
        <section aria-labelledby="top-title" className="flex flex-col gap-3">
          <h2 id="top-title" className="text-h3">
            Produk paling sering dibeli
          </h2>
          <ul className="flex flex-col divide-y divide-border text-body-s">
            {summary.topProducts.map((product) => (
              <li key={product.name} className="flex justify-between gap-4 py-3">
                <span className="font-medium">{product.name}</span>
                <span className="text-text-secondary">
                  {product.quantity.toLocaleString("id-ID")} pcs · {formatIDR(product.total)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
