"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import type { Trend } from "@/services/analytics/trend";

const dayLabel = (day: string) => new Date(`${day}T00:00:00Z`).toLocaleDateString("id-ID", { day: "numeric", month: "short", timeZone: "UTC" });

/** Weekly visitor trend as a recharts line chart; series and axis colors follow the theme tokens. */
export function TrendChart({ weeks, summary }: { weeks: Trend["weeks"]; summary: string }) {
  const data = weeks.map((week) => ({ day: week.weekStart, pages: week.pageVisitors, orders: week.orderVisitors }));
  return (
    <div role="img" aria-label={summary} className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={dayLabel}
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis hide domain={[0, "auto"]} />
          <Line type="linear" dataKey="pages" stroke="var(--color-brand-cocoa)" strokeWidth={2} dot={false} isAnimationActive={false} />
          <Line type="linear" dataKey="orders" stroke="var(--color-ai-accent)" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
