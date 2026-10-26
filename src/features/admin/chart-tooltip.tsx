"use client";

import type { TooltipContentProps } from "recharts";

type Series = { dataKey: string; label: string; color: string; format?: (value: number) => string };

type Row = { dataKey?: unknown; payload?: Record<string, unknown> };

/**
 * Shared recharts tooltip: token-colored series rows with id-ID numbers.
 * Accepts only what it needs from recharts' loosely-typed tooltip props.
 */
export function chartTooltipContent(series: Series[]) {
  return function ChartTooltip({ active, payload, label }: TooltipContentProps) {
    if (!active || !payload?.length) return null;
    const rows = payload as unknown as Row[];
    return (
      <div className="rounded-md border border-border bg-background p-3 text-body-s shadow-md">
        {label != null && <p className="mb-1 font-medium text-text-primary">{String(label)}</p>}
        {series.map((item) => {
          const row = rows.find((entry) => String(entry.dataKey) === item.dataKey);
          const value = typeof row?.payload?.[item.dataKey] === "number" ? (row.payload[item.dataKey] as number) : null;
          return (
            <p key={item.dataKey} className="flex items-center gap-2 text-text-secondary">
              <span aria-hidden className="h-0.5 w-4" style={{ backgroundColor: item.color }} />
              {item.label}:{" "}
              <span className="font-medium text-text-primary">
                {value === null ? "—" : item.format ? item.format(value) : value.toLocaleString("id-ID")}
              </span>
            </p>
          );
        })}
      </div>
    );
  };
}
