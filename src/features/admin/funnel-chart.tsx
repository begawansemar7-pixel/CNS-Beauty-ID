"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { ANALYTICS_EVENT_LABELS } from "@/constants/analytics";
import type { FunnelStep } from "@/services/analytics/model";

const number = (value: number) => value.toLocaleString("id-ID");
const percent = (value: number | null) => (value === null ? "—" : `${(value * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`);

type TickProps = { x?: number; y?: number; payload?: { index: number; value: string } };

/** Two-line category tick: step label above, visitors and step-to-step share below. */
function StepTick({ x = 0, y = 0, payload, notes }: TickProps & { notes: string[] }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-8} y={-4} textAnchor="end" fill="var(--color-text-primary)" fontSize={12}>
        {payload?.value}
      </text>
      <text x={-8} y={12} textAnchor="end" fill="var(--color-text-secondary)" fontSize={11}>
        {notes[payload?.index ?? 0]}
      </text>
    </g>
  );
}

/** Horizontal funnel: unique visitors per step, bar width relative to the first step. */
export function FunnelChart({ title, steps }: { title: string; steps: FunnelStep[] }) {
  const top = steps[0]?.visitors ?? 0;
  const data = steps.map((step, index) => ({ label: `${index + 1}. ${ANALYTICS_EVENT_LABELS[step.event]}`, visitors: step.visitors }));
  const notes = steps.map((step, index) =>
    index === 0 ? `${number(step.visitors)} pengunjung` : `${number(step.visitors)} · ${percent(step.fromPrevious)} dari tahap sebelumnya`,
  );
  const summary = steps
    .map((step, index) => {
      const label = `${index + 1}. ${ANALYTICS_EVENT_LABELS[step.event]}`;
      const share = index === 0 ? "" : ` (${percent(step.fromPrevious)} dari tahap sebelumnya)`;
      return `${label}: ${number(step.visitors)} pengunjung${share}`;
    })
    .join("; ");

  return (
    <section aria-label={title} className="rounded-lg border border-border bg-background p-6">
      <h2 className="mb-4 text-h4">{title}</h2>
      {top === 0 ? (
        <p className="text-body-s text-text-secondary">Belum ada pengunjung di tahap pertama pada periode ini.</p>
      ) : (
        <div role="img" aria-label={summary} className="w-full">
          <ResponsiveContainer width="100%" height={steps.length * 48 + 12}>
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 0 }} barCategoryGap={16}>
              <XAxis type="number" hide domain={[0, top]} />
              <YAxis
                type="category"
                dataKey="label"
                width={180}
                interval={0}
                axisLine={{ stroke: "var(--color-border)" }}
                tickLine={false}
                tick={<StepTick notes={notes} />}
              />
              <Bar dataKey="visitors" fill="var(--color-brand-cocoa)" radius={[0, 4, 4, 0]} barSize={18} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {top > 0 && steps.length > 1 && (
        <p className="mt-4 text-caption text-text-secondary">Konversi keseluruhan: {percent(steps.at(-1)?.fromStart ?? null)}</p>
      )}
    </section>
  );
}
