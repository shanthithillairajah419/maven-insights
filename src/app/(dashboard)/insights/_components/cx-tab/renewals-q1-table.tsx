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
import { renewalsQ1 } from "@/data/mock-cx";
import type { RenewalRow } from "@/data/mock-cx";

const COLUMNS: { key: keyof RenewalRow; label: string; sortable: boolean }[] = [
  { key: "customerName", label: "Customer Name", sortable: true },
  { key: "renewalDate", label: "Renewal Date", sortable: true },
  { key: "dealType", label: "Deal Type", sortable: true },
  { key: "owner", label: "Owner", sortable: true },
  { key: "dealStage", label: "Deal Stage", sortable: true },
  { key: "forecastCategory", label: "Forecast Category", sortable: true },
  { key: "renewableArr", label: "Renewable ARR", sortable: true },
  { key: "forecastedArr", label: "Forecasted ARR", sortable: true },
  { key: "nextStep", label: "Next Step", sortable: true },
];

function dealStageBg(value: string): string {
  if (value === "Closed Won") return "bg-[#dcfce7]";
  return "";
}

function forecastCategoryBg(value: string): string {
  if (value === "At Risk") return "bg-[#fecaca]";
  return "";
}

export function RenewalsQ1Table() {
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

  const sortedData = [...renewalsQ1].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn as keyof RenewalRow] ?? "";
    const bVal = b[sortColumn as keyof RenewalRow] ?? "";
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">Renewals Forecast - Q1</h3>
        </div>
        <PinButton chartId="renewals-q1" />
      </div>

      <AiInsight
        suggestion="Escalate Payphone to executive sponsorship this week given at-risk status and $20K ARR exposure before contract end"
        linearTeam="CX"
      >
        Mastermind's $163K closed-won renewal secures over half of Q1 renewable ARR, but Payphone at $20K is flagged at-risk — early intervention could prevent further churn this quarter.
      </AiInsight>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{renewalsQ1.length} items</span>
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
            <TableRow key={row.customerName}>
              {COLUMNS.map((col) => {
                const value = row[col.key] as string;
                const isDealStage = col.key === "dealStage";
                const isForecastCategory = col.key === "forecastCategory";
                const isNextStep = col.key === "nextStep";
                const cellBg = isDealStage
                  ? dealStageBg(value)
                  : isForecastCategory
                    ? forecastCategoryBg(value)
                    : "";

                return (
                  <TableCell
                    key={col.key}
                    className={`px-6 py-4 text-sm tabular-nums ${cellBg} ${isNextStep ? "truncate max-w-[200px]" : ""}`}
                    title={isNextStep ? value : undefined}
                  >
                    {value}
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
