"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PinButton } from "@/components/pin-button";
import { AiInsight } from "@/components/ai-insight";
import { incidentData } from "@/data/mock-prodeng";

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

      <div className="px-6 pb-6 pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={incidentData}
            margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              label={{
                value: "Number of incidents",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: {
                  fontSize: 11,
                  fill: "hsl(var(--muted-foreground))",
                  textAnchor: "middle",
                },
              }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--card))",
                fontSize: "12px",
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            />
            <Bar
              dataKey="minor"
              name="#00 - Minor"
              stackId="incidents"
              fill="#a78bfa"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="major"
              name="#01 - Major"
              stackId="incidents"
              fill="#fb923c"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="critical"
              name="#02 - Critical"
              stackId="incidents"
              fill="#93c5fd"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
