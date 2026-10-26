"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ANALYTICS_EVENT_LABELS } from "@/constants/analytics";
import type { FunnelStep } from "@/services/analytics/model";

import { chartTooltipContent } from "./chart-tooltip";

const percent = (value: number | null) => (value === null ? "—" : `${(value * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`);

type FunnelRow = { name: string; visitors: number; fromPrevious: number | null };

/**
 * Horizontal funnel: unique visitors per step, bar width relative to the first
 * step. recharts with token colors (Legion chart rules); the summary text below
 * carries the exact numbers for screen readers.
 */
export function FunnelChart({ title, steps }: { title: string; steps: FunnelStep[] }) {
  const top = steps[0]?.visitors ?? 0;
  const rows: FunnelRow[] = steps.map((step, index) => ({
    name: `${index + 1}. ${ANALYTICS_EVENT_LABELS[step.event]}`,
    visitors: step.visitors,
    fromPrevious: index > 0 ? step.fromPrevious : null,
  }));
  const summary = steps
    .map((step, index) => `${index + 1}. ${ANALYTICS_EVENT_LABELS[step.event]}: ${step.visitors.toLocaleString("id-ID")} pengunjung${index > 0 ? ` (${percent(step.fromPrevious)} dari tahap sebelumnya)` : ""}.`)
    .join(" ");

  return (
    <section aria-label={title} className="rounded-lg border border-border bg-background p-6">
      <h2 className="mb-4 text-h4">{title}</h2>
      {top === 0 ? (
        <p className="text-body-s text-text-secondary">Belum ada pengunjung di tahap pertama pada periode ini.</p>
      ) : (
        <>
          <p className="sr-only">{summary}</p>
          <div className="h-64 w-full" role="presentation">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows} layout="vertical" accessibilityLayer margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  width={200}
                  tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                />
                <Tooltip
                  content={chartTooltipContent([
                    { dataKey: "visitors", label: "Pengunjung", color: "var(--color-brand-cocoa)" },
                    {
                      dataKey: "fromPrevious",
                      label: "Dari tahap sebelumnya",
                      color: "var(--color-text-secondary)",
                      format: percent,
                    },
                  ])}
                />
                <Bar dataKey="visitors" fill="var(--color-brand-cocoa)" radius={[0, 4, 4, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      {top > 0 && steps.length > 1 && (
        <p className="mt-4 text-caption text-text-secondary">Konversi keseluruhan: {percent(steps.at(-1)?.fromStart ?? null)}</p>
      )}
    </section>
  );
}
