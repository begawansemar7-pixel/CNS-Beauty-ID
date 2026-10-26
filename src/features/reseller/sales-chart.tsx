"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { formatIDR } from "@/lib/utils/format";
import type { SalesSummary } from "@/services/reseller/model";

/** Monthly purchase totals for the partner portal; bars follow the theme tokens. */
export function SalesChart({ months }: { months: SalesSummary["months"] }) {
  const summary = `Total pembelian per bulan: ${months.map((month) => `${month.label}: ${formatIDR(month.total)}`).join("; ")}.`;
  return (
    <div role="img" aria-label={summary} className="h-36 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={months} margin={{ top: 8, right: 0, bottom: 0, left: 0 }} barCategoryGap="20%">
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
            interval={0}
          />
          <YAxis hide domain={[0, "auto"]} />
          <Bar dataKey="total" fill="var(--color-brand-cocoa)" radius={[4, 4, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
