"use client";

import { IconRefresh } from "@tabler/icons-react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { notify } from "@/lib/utils/notify";

import { reorderAction } from "./actions";

/** "Pesan lagi": refills the cart with this order's products (current prices apply). */
export function ReorderButton({ orderId }: { orderId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="primary"
        fullWidth
        loading={pending}
        leadingIcon={<IconRefresh aria-hidden className="size-4" />}
        onClick={() =>
          startTransition(async () => {
            const result = await reorderAction(orderId);
            if (!result.ok) {
              setError(result.message);
              return;
            }
            notify("Produk ditambahkan ke keranjang.");
          })
        }
      >
        Pesan lagi
      </Button>
      <p role="status" className="text-caption text-text-secondary">
        {error ?? "Harga dan stok mengikuti kondisi terbaru."}
      </p>
    </div>
  );
}
