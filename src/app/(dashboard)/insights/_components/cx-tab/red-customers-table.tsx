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
import { redCustomers } from "@/data/mock-cx";
import type { RedCustomerRow } from "@/data/mock-cx";

const COLUMNS: { key: keyof RedCustomerRow; label: string; sortable: boolean }[] = [
  { key: "companyName", label: "Company Name", sortable: true },
  { key: "cxm", label: "CXM", sortable: true },
  { key: "healthScore", label: "Customer Health Score", sortable: true },
  { key: "companyDisposition", label: "Company Disposition", sortable: true },
  { key: "contractEndDate", label: "Contract End Date", sortable: true },
  { key: "companyArr", label: "Company ARR", sortable: true },
];

export function RedCustomersTable() {
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

  const sortedData = [...redCustomers].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a.isTotal) return 1;
    if (b.isTotal) return -1;
    const aVal = a[sortColumn as keyof RedCustomerRow] ?? "";
    const bVal = b[sortColumn as keyof RedCustomerRow] ?? "";
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">Red Customers</h3>
        </div>
        <PinButton chartId="red-customers" />
      </div>

      <AiInsight
        suggestion="Assign executive sponsors to Runway and impact.com this week — they represent $389K in at-risk ARR and need VP-level intervention"
        linearTeam="CX"
      >
        $916K in ARR is at risk across 9 red accounts — Runway ($223K) and impact.com ($166K) represent 42% of the exposure and both are in value realization, making them high-priority intervention targets.
      </AiInsight>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{redCustomers.length} items</span>
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
                key={row.companyName}
                className={row.isTotal ? "border-t-2 border-t-foreground" : ""}
              >
                {COLUMNS.map((col) => {
                  const value = row[col.key] as string;
                  const isHealthScore = col.key === "healthScore";
                  const healthBg = isHealthScore && value === "Red" ? "bg-[#fecaca]" : isHealthScore && value === "Green" ? "bg-[#dcfce7]" : "";
                  return (
                    <TableCell
                      key={col.key}
                      className={`px-6 py-4 text-sm tabular-nums ${row.isTotal ? "font-bold" : ""} ${healthBg}`}
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
