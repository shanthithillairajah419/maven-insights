"use client";

import { useState } from "react";
import { ArrowUpDown, Download, Maximize2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PinButton } from "@/components/pin-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AiInsight } from "@/components/ai-insight";
import { onboardingOnTrack } from "@/data/mock-solutions";
import type { OnboardingRow } from "@/data/mock-solutions";

const COLUMNS: { key: keyof OnboardingRow; label: string; sortable: boolean }[] = [
  { key: "customerName", label: "Customer Name", sortable: true },
  { key: "fde", label: "FDE", sortable: true },
  { key: "cxm", label: "CXM", sortable: true },
  { key: "kickOffDate", label: "Kick Off Date", sortable: true },
  { key: "onboardingStatus", label: "Onboarding Status", sortable: true },
  { key: "daysToOnboard", label: "Days to Onboard", sortable: true },
  { key: "nextSteps", label: "Onboarding Next Steps", sortable: false },
];

export function OnboardingOnTrackTable() {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = [...onboardingOnTrack].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn as keyof OnboardingRow] ?? "";
    const bVal = b[sortColumn as keyof OnboardingRow] ?? "";
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Onboarding Forecast - On Track
          </h3>
        </div>
        <PinButton chartId="onboarding-on-track" />
      </div>

      <AiInsight
        suggestion="Fast-track Apryse and Practice Better as sub-30-day onboarding case studies to demonstrate the team's improving velocity"
        linearTeam="SOLUTIONS"
      >
        3 new customers kicked off in January with a healthy average of 12 days — Apryse (4 days) and Practice Better (12 days) are on pace for sub-30-day onboarding.
      </AiInsight>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {onboardingOnTrack.length} items
          </span>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm font-normal">
            <Download className="h-3.5 w-3.5" />
            Download
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Expand">
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm font-normal">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Display
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t border-border-subtle hover:bg-transparent">
            {COLUMNS.map((col) => (
              <TableHead key={col.key} className="h-10 px-6">
                {col.sortable ? (
                  <button
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">
                    {col.label}
                  </span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.customerName}>
              <TableCell className="px-6 py-4 text-sm">{row.customerName}</TableCell>
              <TableCell className="px-6 py-4 text-sm">{row.fde}</TableCell>
              <TableCell className="px-6 py-4 text-sm">{row.cxm}</TableCell>
              <TableCell className="px-6 py-4 text-sm tabular-nums">{row.kickOffDate}</TableCell>
              <TableCell className="px-6 py-4 text-sm">{row.onboardingStatus}</TableCell>
              <TableCell className="px-6 py-4 text-sm tabular-nums">{row.daysToOnboard}</TableCell>
              <TableCell
                className="px-6 py-4 text-sm max-w-[200px] truncate"
                title={row.nextSteps}
              >
                {row.nextSteps}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
