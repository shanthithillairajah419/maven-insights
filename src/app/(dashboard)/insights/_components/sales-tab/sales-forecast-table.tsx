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
import { salesForecast } from "@/data/mock-sales";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatVariance(value: number): string {
  if (value === 0) return "$0";
  const prefix = value > 0 ? "$" : "-$";
  return `${prefix}${Math.abs(value).toLocaleString("en-US")}`;
}

function varianceBg(value: number): string {
  if (value > 0) return "bg-[#dcfce7]";
  if (value < 0) return "bg-[#fecaca]";
  return "";
}

const COLUMNS = [
  { key: "team", label: "Team", sortable: true },
  { key: "pipeline", label: "Pipeline", sortable: true },
  { key: "pipelineVar", label: "WoW Var", sortable: true },
  { key: "bestCase", label: "Best Case", sortable: true },
  { key: "bestCaseVar", label: "WoW Var", sortable: true },
  { key: "mostLikely", label: "Most Likely", sortable: true },
  { key: "mostLikelyVar", label: "WoW Var", sortable: true },
  { key: "commit", label: "Commit", sortable: true },
  { key: "commitVar", label: "WoW Var", sortable: true },
  { key: "won", label: "Won", sortable: true },
  { key: "wonVar", label: "WoW Var", sortable: true },
] as const;

const VARIANCE_KEYS = new Set([
  "pipelineVar",
  "bestCaseVar",
  "mostLikelyVar",
  "commitVar",
  "wonVar",
]);

export function SalesForecastTable() {
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

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      {/* Title block */}
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">Sales Forecast</h3>
        </div>
        <PinButton chartId="sales-forecast" />
      </div>

      <AiInsight
        suggestion="Assign 2 additional Midmarket AEs to source new pipeline this week to offset the $220K WoW contraction"
        linearTeam="SALES"
      >
        Commit jumped $154K WoW driven by Enterprise, but total pipeline dropped $220K — Midmarket contraction is the primary drag on top-of-funnel coverage.
      </AiInsight>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{salesForecast.length} items</span>
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

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-t border-border-subtle hover:bg-transparent">
            {COLUMNS.map((col, i) => (
              <TableHead key={`${col.key}-${i}`} className="h-10 px-6">
                {col.sortable ? (
                  <button
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">{col.label}</span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {salesForecast.map((row) => (
            <TableRow
              key={row.team}
              className={row.isTotal ? "border-t-2 border-t-foreground" : ""}
            >
              {COLUMNS.map((col, i) => {
                const value = row[col.key as keyof typeof row];
                const isVariance = VARIANCE_KEYS.has(col.key);
                const isTeam = col.key === "team";
                const isBold = row.isTotal;

                if (isTeam) {
                  return (
                    <TableCell
                      key={`${col.key}-${i}`}
                      className={`px-6 py-4 text-sm ${isBold ? "font-bold" : ""}`}
                    >
                      {value as string}
                    </TableCell>
                  );
                }

                const numVal = value as number;
                return (
                  <TableCell
                    key={`${col.key}-${i}`}
                    className={`px-6 py-4 text-sm tabular-nums ${isBold ? "font-bold" : ""} ${isVariance ? varianceBg(numVal) : ""}`}
                  >
                    {isVariance
                      ? formatVariance(numVal)
                      : formatCurrency(numVal)}
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
