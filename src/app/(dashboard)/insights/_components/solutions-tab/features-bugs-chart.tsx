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
import { featuresAndBugs } from "@/data/mock-solutions";

const chartConfig = {
  featuresDelivered: { label: "Features Delivered", color: "#c4b5fd" },
  bugsFixed: { label: "Bugs Fixed", color: "#7c3aed" },
} satisfies ChartConfig;

export function FeaturesBugsChart() {
  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <h3 className="text-base font-semibold text-foreground">
          Solutions: Features Delivered & Bugs Fixed
        </h3>
        <PinButton chartId="features-bugs" />
      </div>
      <AiInsight
        suggestion="Allocate 60% of next sprint to feature delivery to rebalance the bug-fix-heavy ratio and ship more customer-facing value"
        linearTeam="SOLUTIONS"
      >
        Bug fixes consistently outpace feature delivery (31 vs 20 over 5 weeks) — the team is in stabilization mode, with W4 Jan showing the best feature output at 6 deliveries.
      </AiInsight>

      <div className="px-6 pb-6 pt-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={featuresAndBugs} margin={{ left: 10 }}>
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="featuresDelivered"
              fill="var(--color-featuresDelivered)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="bugsFixed"
              fill="var(--color-bugsFixed)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
