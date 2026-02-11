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
import { featuresBugsByTeam } from "@/data/mock-prodeng";

const chartConfig = {
  featuresDelivered: { label: "Features Delivered", color: "#c4b5fd" },
  bugsFixed: { label: "Bugs Fixed", color: "#7c3aed" },
} satisfies ChartConfig;

export function FeaturesBugsTeamChart() {
  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <h3 className="text-base font-semibold text-foreground">
          Features Delivered & Bugs Fixed
        </h3>
        <PinButton chartId="features-bugs-team" />
      </div>
      <AiInsight
        suggestion="Run a Torus tech debt sprint next week to clear the 4:1 bug-to-feature ratio before it compounds into delivery delays"
        linearTeam="PRODENG"
      >
        Helix and Solutions are the most active teams this week with 10 combined deliveries each, while Torus shipped only 1 feature against 4 bugs — indicating heavy tech debt or stability focus.
      </AiInsight>

      <div className="px-6 pb-6 pt-4">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={featuresBugsByTeam} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              type="category"
              dataKey="team"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="featuresDelivered"
              fill="var(--color-featuresDelivered)"
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="bugsFixed"
              fill="var(--color-bugsFixed)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
