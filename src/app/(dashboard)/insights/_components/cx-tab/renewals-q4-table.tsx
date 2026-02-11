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
import { renewalsQ4 } from "@/data/mock-cx";
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
  if (value === "Closed Lost") return "bg-[#fecaca]";
  return "";
}

export function RenewalsQ4Table() {
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

  const sortedData = [...renewalsQ4].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a.isTotal) return 1;
    if (b.isTotal) return -1;
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
          <h3 className="text-base font-semibold text-foreground">Renewals Forecast - Q4</h3>
        </div>
        <PinButton chartId="renewals-q4" />
      </div>

      <AiInsight
        suggestion="Conduct a post-mortem on Spotnana and Hive churn to identify common signals and build an early-warning playbook for Q1"
        linearTeam="CX"
      >
        Q4 closed at $212K forecasted against $317K renewable — Spotnana and Hive churn accounted for $98K in losses, but Digital.ai's $121K renewal anchored the quarter.
      </AiInsight>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{renewalsQ4.length} items</span>
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

                  return (
                    <TableCell
                      key={col.key}
                      className={`px-6 py-4 text-sm tabular-nums ${row.isTotal ? "font-bold" : ""} ${isDealStage ? dealStageBg(value) : ""} ${isNextStep ? "truncate max-w-[200px]" : ""}`}
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
