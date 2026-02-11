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
import { newBugsByTeam } from "@/data/mock-prodeng";

const chartConfig = {
  athena: { label: "Athena", color: "#8b5cf6" },
  forge: { label: "Forge", color: "#a78bfa" },
  helix: { label: "Helix", color: "#d4a8d4" },
  torus: { label: "Torus", color: "#7b8cbe" },
  mobius: { label: "Mobius", color: "#c4b5fd" },
} satisfies ChartConfig;

export function NewBugsTeamChart() {
  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <h3 className="text-base font-semibold text-foreground">
          Net New High-Severity Bugs by Team
        </h3>
        <PinButton chartId="new-bugs-team" />
      </div>
      <AiInsight
        suggestion="Add pre-merge automated testing for Helix to reduce their consistently high bug rate and free up QA capacity"
        linearTeam="PRODENG"
      >
        Helix consistently leads in new bugs (averaging 4 per week), peaking at 6 in W3 Jan — Torus had a concerning W4 Jan spike to 5 bugs, potentially related to their recent feature push.
      </AiInsight>

      <div className="px-6 pb-6 pt-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={newBugsByTeam} margin={{ left: 20 }}>
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
                value: "High Bugs",
                angle: -90,
                position: "insideLeft",
                offset: -5,
                style: { textAnchor: "middle", fontSize: 12 },
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="athena" fill="var(--color-athena)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="forge" fill="var(--color-forge)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="helix" fill="var(--color-helix)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="torus" fill="var(--color-torus)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="mobius" fill="var(--color-mobius)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
