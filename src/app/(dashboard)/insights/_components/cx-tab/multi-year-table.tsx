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
import { multiYearQ1 } from "@/data/mock-cx";
import type { MultiYearRow } from "@/data/mock-cx";

const COLUMNS: { key: keyof MultiYearRow; label: string; sortable: boolean }[] = [
  { key: "customerName", label: "Customer Name", sortable: true },
  { key: "anniversaryDate", label: "Anniversary Date", sortable: true },
  { key: "dealType", label: "Deal Type", sortable: true },
  { key: "owner", label: "Owner", sortable: true },
  { key: "dealStage", label: "Deal Stage", sortable: true },
  { key: "forecastCategory", label: "Forecast Category", sortable: true },
  { key: "renewableArr", label: "Renewable ARR", sortable: true },
  { key: "forecastedArr", label: "Forecasted ARR", sortable: true },
  { key: "nextStep", label: "Next Step", sortable: true },
];

export function MultiYearTable() {
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

  const sortedData = [...multiYearQ1].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a.isTotal) return 1;
    if (b.isTotal) return -1;
    const aVal = a[sortColumn as keyof MultiYearRow] ?? "";
    const bVal = b[sortColumn as keyof MultiYearRow] ?? "";
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Multi-Year Anniversaries - Q1
          </h3>
        </div>
        <PinButton chartId="multi-year-q1" />
      </div>

      <AiInsight
        suggestion="Begin expansion conversations with Clio and Intralinks now while anniversary sentiment is positive to upsell additional surfaces"
        linearTeam="CX"
      >
        All $717K in multi-year anniversaries are closed-won, reflecting strong long-term customer commitment — Intralinks ($184K) and Clio ($166K) are the largest and both on track.
      </AiInsight>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{multiYearQ1.length} items</span>
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
          {sortedData.map((row) => {
            return (
              <TableRow
                key={row.customerName}
                className={row.isTotal ? "border-t-2 border-t-foreground" : ""}
              >
                {COLUMNS.map((col) => {
                  const value = row[col.key] as string;
                  const isDealStage = col.key === "dealStage";
                  const isNextStep = col.key === "nextStep";
                  const cellBg = isDealStage && value === "Closed Won" ? "bg-[#dcfce7]" : "";

                  return (
                    <TableCell
                      key={col.key}
                      className={`px-6 py-4 text-sm tabular-nums ${row.isTotal ? "font-bold" : ""} ${cellBg} ${isNextStep ? "truncate max-w-[200px]" : ""}`}
                      title={isNextStep ? value : undefined}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
