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
import { onboardingAtRisk } from "@/data/mock-solutions";
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

const STATUS_BG: Record<string, string> = {
  "Off Track": "bg-[#fecaca]",
  "At Risk": "bg-[#fef9c3]",
};

export function OnboardingAtRiskTable() {
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

  const sortedData = [...onboardingAtRisk].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a.isTotal) return 1;
    if (b.isTotal) return -1;
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
            Onboarding Forecast - At Risk
          </h3>
        </div>
        <PinButton chartId="onboarding-at-risk" />
      </div>

      <AiInsight
        suggestion="Escalate Rockstar Automations to leadership for a retention save-or-churn decision and redirect FDE capacity to Great Place To Work"
        linearTeam="SOLUTIONS"
      >
        Rockstar Automations at 203 days is actively disengaging — Great Place To Work (144 days) is closest to go-live with a Jan 29 target, making it the best candidate for rescue focus.
      </AiInsight>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {onboardingAtRisk.length} items
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
          {sortedData.map((row) => {
            const statusBg = STATUS_BG[row.onboardingStatus] ?? "";

            return (
              <TableRow
                key={row.customerName}
                className={row.isTotal ? "border-t-2 border-t-foreground" : ""}
              >
                <TableCell className={`px-6 py-4 text-sm ${row.isTotal ? "font-bold" : ""}`}>
                  {row.customerName}
                </TableCell>
                <TableCell className={`px-6 py-4 text-sm ${row.isTotal ? "font-bold" : ""}`}>
                  {row.fde}
                </TableCell>
                <TableCell className={`px-6 py-4 text-sm ${row.isTotal ? "font-bold" : ""}`}>
                  {row.cxm}
                </TableCell>
                <TableCell className={`px-6 py-4 text-sm tabular-nums ${row.isTotal ? "font-bold" : ""}`}>
                  {row.kickOffDate}
                </TableCell>
                <TableCell className={`px-6 py-4 text-sm ${row.isTotal ? "font-bold" : ""} ${statusBg}`}>
                  {row.onboardingStatus}
                </TableCell>
                <TableCell className={`px-6 py-4 text-sm tabular-nums ${row.isTotal ? "font-bold" : ""}`}>
                  {row.daysToOnboard}
                </TableCell>
                <TableCell
                  className={`px-6 py-4 text-sm max-w-[200px] truncate ${row.isTotal ? "font-bold" : ""}`}
                  title={row.nextSteps}
                >
                  {row.nextSteps}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
