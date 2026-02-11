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
import { consumptionBySurface } from "@/data/mock-prodeng";

const chartConfig = {
  chat: { label: "Chat", color: "#8b5cf6" },
  email: { label: "Email", color: "#a78bfa" },
  instantAnswers: { label: "Instant Answers", color: "#c4b5fd" },
  sms: { label: "SMS", color: "#d4a8d4" },
  voice: { label: "Voice", color: "#e8c4e8" },
  copilot: { label: "Copilot", color: "#7b8cbe" },
} satisfies ChartConfig;

function formatTick(value: number): string {
  if (value === 0) return "0";
  return `${value / 1000}K`;
}

export function ConsumptionChart() {
  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <h3 className="text-base font-semibold text-foreground">
          Consumption by Surface
        </h3>
        <PinButton chartId="consumption-surface" />
      </div>
      <AiInsight
        suggestion="Investigate Copilot and Instant Answers decline — schedule a product review to determine if this is intentional migration or a retention issue"
        linearTeam="PRODENG"
      >
        Chat surged 42% over 4 months (57K to 81K) and now represents 58% of total consumption, while Copilot and Instant Answers are declining — the product mix is shifting heavily toward real-time channels.
      </AiInsight>

      <div className="px-6 pb-6 pt-4">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={consumptionBySurface} margin={{ left: 20 }}>
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
              tickFormatter={formatTick}
              label={{
                value: "Consumption",
                angle: -90,
                position: "insideLeft",
                offset: -5,
                style: { textAnchor: "middle", fontSize: 12 },
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="chat"
              stackId="a"
              fill="var(--color-chat)"
            />
            <Bar
              dataKey="email"
              stackId="a"
              fill="var(--color-email)"
            />
            <Bar
              dataKey="instantAnswers"
              stackId="a"
              fill="var(--color-instantAnswers)"
            />
            <Bar
              dataKey="sms"
              stackId="a"
              fill="var(--color-sms)"
            />
            <Bar
              dataKey="voice"
              stackId="a"
              fill="var(--color-voice)"
            />
            <Bar
              dataKey="copilot"
              stackId="a"
              fill="var(--color-copilot)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
