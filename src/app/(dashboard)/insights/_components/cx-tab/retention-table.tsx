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
import { retention } from "@/data/mock-cx";
import type { RetentionCell, RetentionRow } from "@/data/mock-cx";

const COLUMNS: { key: "metric" | "q4" | "fy25" | "q1"; label: string; sortable: boolean }[] = [
  { key: "metric", label: "Metric", sortable: true },
  { key: "q4", label: "2025-Q4", sortable: true },
  { key: "fy25", label: "FY25", sortable: true },
  { key: "q1", label: "2026-Q1", sortable: true },
];

const COLOR_BG: Record<RetentionCell["color"], string> = {
  green: "bg-[#dcfce7]",
  red: "bg-[#fecaca]",
  blue: "bg-[#dbeafe]",
  "": "",
};

export function RetentionTable() {
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

  const sortedData = [...retention].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = sortColumn === "metric" ? a.metric : (a[sortColumn as keyof RetentionRow] as RetentionCell).value;
    const bVal = sortColumn === "metric" ? b.metric : (b[sortColumn as keyof RetentionRow] as RetentionCell).value;
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">Retention</h3>
        </div>
        <PinButton chartId="retention" />
      </div>

      <AiInsight
        suggestion="Create a Q1 retention war room with weekly reviews to sustain the 90% GRR momentum and identify any early warning signs"
        linearTeam="CX"
      >
        Q1 GRR forecast improved sharply to 90% from Q4's 72%, signaling that recent churn prevention efforts are working — maintaining NRR at 109% confirms healthy expansion activity.
      </AiInsight>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{retention.length} items</span>
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
                <button
                  className="flex items-center gap-1 text-xs font-medium text-muted-foreground"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.metric}>
              <TableCell className="px-6 py-4 text-sm">{row.metric}</TableCell>
              {(["q4", "fy25", "q1"] as const).map((period) => {
                const cell = row[period];
                return (
                  <TableCell
                    key={period}
                    className={`px-6 py-4 text-sm tabular-nums ${COLOR_BG[cell.color]}`}
                  >
                    {cell.value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
