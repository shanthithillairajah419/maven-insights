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
import { incidentData } from "@/data/mock-prodeng";

const chartConfig = {
  minor: { label: "#00 - Minor", color: "#8b5cf6" },
  major: { label: "#01 - Major", color: "#a78bfa" },
  critical: { label: "#02 - Critical", color: "#c4b5fd" },
} satisfies ChartConfig;

export function IncidentChart() {
  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <h3 className="text-base font-semibold text-foreground">
          Incidents Reported by Severity
        </h3>
        <PinButton chartId="incident-chart" />
      </div>

      <AiInsight
        suggestion="Conduct a root-cause analysis on the Jan 26 spike to identify systemic issues before they escalate"
        linearTeam="PRODENG"
      >
        Incidents spiked to 4 in week of Jan 26 (including 1 critical) after 2 stable weeks — investigate whether recent deployments contributed to the uptick.
      </AiInsight>

      <div className="px-6 pb-6 pt-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={incidentData} margin={{ left: 10 }}>
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
              allowDecimals={false}
              label={{
                value: "Number of incidents",
                angle: -90,
                position: "insideLeft",
                offset: -5,
                style: { textAnchor: "middle", fontSize: 12 },
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="minor"
              stackId="incidents"
              fill="var(--color-minor)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="major"
              stackId="incidents"
              fill="var(--color-major)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="critical"
              stackId="incidents"
              fill="var(--color-critical)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
