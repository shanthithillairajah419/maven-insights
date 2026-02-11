"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { PinButton } from "@/components/pin-button";
import { AiInsight } from "@/components/ai-insight";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { newBugs } from "@/data/mock-solutions";

const chartConfig = {
  high: { label: "High", color: "#8b5cf6" },
  medium: { label: "Medium", color: "#d4a8d4" },
  low: { label: "Low", color: "#7b8cbe" },
} satisfies ChartConfig;

export function NewBugsChart() {
  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <h3 className="text-base font-semibold text-foreground">
          Net New Bugs Incoming
        </h3>
        <PinButton chartId="new-bugs" />
      </div>
      <AiInsight
        suggestion="Conduct a root-cause analysis on the W3 Jan high-severity spike to prevent recurrence and reduce bug inflow below 20 per week"
        linearTeam="SOLUTIONS"
      >
        Total bug inflow dropped 29% from W3 Jan (32) to W4 Jan (20), but high-severity bugs remain volatile — W3 Jan's spike to 8 high bugs warrants a root-cause review.
      </AiInsight>

      <div className="px-6 pb-6 pt-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={newBugs} margin={{ left: 20 }}>
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Bug Count",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fontSize: 12 },
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="high"
              fill="var(--color-high)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="medium"
              fill="var(--color-medium)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="low"
              fill="var(--color-low)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
