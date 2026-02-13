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
import { customerHealth } from "@/data/mock-cx";

const chartConfig = {
  green: { label: "Green", color: "#8b5cf6" },
  yellow: { label: "Yellow", color: "#a78bfa" },
  red: { label: "Red", color: "#c4b5fd" },
} satisfies ChartConfig;

export function CustomerHealthChart() {
  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <h3 className="text-base font-semibold text-foreground">
          Customer Health
        </h3>
        <PinButton chartId="customer-health" />
      </div>
      <AiInsight
        suggestion="Document and replicate the playbook that moved 12 accounts from red/yellow to green over the past 6 months"
        linearTeam="CX"
      >
        Green accounts nearly doubled since June (16 to 31) while red dropped by more than half — proactive engagement efforts are clearly moving the needle on customer health.
      </AiInsight>

      <div className="px-6 pb-6 pt-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={customerHealth} margin={{ left: 10 }}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Accounts",
                angle: -90,
                position: "insideLeft",
                offset: -5,
                style: { textAnchor: "middle", fontSize: 12 },
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="green"
              stackId="a"
              fill="var(--color-green)"
            />
            <Bar
              dataKey="yellow"
              stackId="a"
              fill="var(--color-yellow)"
            />
            <Bar
              dataKey="red"
              stackId="a"
              fill="var(--color-red)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
