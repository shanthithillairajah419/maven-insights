"use client";

import { PinButton } from "@/components/pin-button";
import { AiInsight } from "@/components/ai-insight";
import { uptimeComponents } from "@/data/mock-prodeng";

export function UptimeStatus() {
  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <h3 className="text-base font-semibold text-foreground">
          System Status
        </h3>
        <PinButton chartId="uptime-status" />
      </div>
      <AiInsight
        suggestion="Investigate the Week 3 January spike in critical and major incidents to identify root causes and prevent recurrence"
        linearTeam="PRODENG"
      >
        All components maintain 100% uptime, but incident volume spiked to 4 in Week 3 January (including 1 critical) — a pattern worth investigating before it impacts uptime targets.
      </AiInsight>

      <div className="flex flex-col gap-6 px-6 pb-6 pt-2">
        {uptimeComponents.map((component) => (
          <div key={component.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {component.name}
                </span>
                {component.subComponents !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    {component.subComponents} component{component.subComponents !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium tabular-nums text-foreground">
                {component.uptime}% uptime
              </span>
            </div>
            <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded">
              {Array.from({ length: 90 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full flex-1 rounded-sm bg-purple-300"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
