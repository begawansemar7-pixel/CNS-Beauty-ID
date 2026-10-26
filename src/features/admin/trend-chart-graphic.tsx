"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { chartTooltipContent } from "./chart-tooltip";

export type TrendPoint = { label: string; pages: number; orders: number };

/**
 * Weekly visitor trend. Chart colors follow theme tokens (var(--color-*)) so
 * they track dark mode automatically (Legion chart rules).
 */
export function TrendChartGraphic({ points }: { points: TrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={192}>
      <LineChart data={points} accessibilityLayer margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          minTickGap={24}
          tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          width={40}
          allowDecimals={false}
          tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
        />
        <Tooltip
          content={chartTooltipContent([
            { dataKey: "pages", label: "Pengunjung halaman", color: "var(--color-brand-cocoa)" },
            { dataKey: "orders", label: "Pengunjung yang memesan", color: "var(--color-ai-accent)" },
          ])}
        />
        <Line
          type="monotone"
          dataKey="pages"
          name="Pengunjung halaman"
          stroke="var(--color-brand-cocoa)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="orders"
          name="Pengunjung yang memesan"
          stroke="var(--color-ai-accent)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
