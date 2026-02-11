"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PinButton } from "@/components/pin-button";
import { AiInsight } from "@/components/ai-insight";
import type { LinearTeamKey } from "@/lib/linear";
import type { Okr } from "@/types/okr";
import { cn } from "@/lib/utils";

const OkrStatus = {
  RED: "red",
  YELLOW: "yellow",
  GREEN: "green",
} as const;
type OkrStatus = (typeof OkrStatus)[keyof typeof OkrStatus];

function getOkrStatus(percent: number): OkrStatus {
  if (percent < 40) return OkrStatus.RED;
  if (percent < 70) return OkrStatus.YELLOW;
  return OkrStatus.GREEN;
}

const statusStyles: Record<OkrStatus, { bar: string; badge: string }> = {
  [OkrStatus.RED]: {
    bar: "bg-red-500",
    badge: "bg-red-50 text-red-700",
  },
  [OkrStatus.YELLOW]: {
    bar: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700",
  },
  [OkrStatus.GREEN]: {
    bar: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
};

function formatDueDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function OkrTile({ okr }: { okr: Okr }) {
  const status = okr.status ?? getOkrStatus(okr.percentComplete);
  const styles = statusStyles[status];
  // Cap the visual bar width at 100% for OKRs that exceed target
  const barWidth = Math.min(okr.percentComplete, 100);

  return (
    <Card className="gap-3 py-4">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">
              {okr.name}
            </span>
            <span className="text-xs text-muted-foreground">
              Due {formatDueDate(okr.dueDate)}
            </span>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
              styles.badge
            )}
          >
            {okr.percentComplete}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", styles.bar)}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface OkrSectionProps {
  okrs: Okr[];
  chartId: string;
  insight?: string;
  suggestion?: string;
  linearTeam?: LinearTeamKey;
}

export function OkrSection({ okrs, chartId, insight, suggestion, linearTeam }: OkrSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">OKRs</h2>
        <PinButton chartId={chartId} />
      </div>
      {insight && (
        <AiInsight className="px-0" suggestion={suggestion} linearTeam={linearTeam}>
          {insight}
        </AiInsight>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {okrs.map((okr) => (
          <OkrTile key={okr.name} okr={okr} />
        ))}
      </div>
    </div>
  );
}
