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
import { funnel } from "@/data/mock-marketing";
import type { FunnelRow } from "@/data/mock-marketing";

const COLUMNS: { key: keyof FunnelRow; label: string; sortable: boolean }[] = [
  { key: "group", label: "Group", sortable: true },
  { key: "nov2025", label: "2025-Nov", sortable: true },
  { key: "dec2025", label: "2025-Dec", sortable: true },
  { key: "jan2026", label: "2026-Jan", sortable: true },
  { key: "grandTotal", label: "Grand Total", sortable: true },
];

export function FunnelTable() {
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

  const sortedData = [...funnel].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a.isTotal) return 1;
    if (b.isTotal) return -1;
    const aVal = a[sortColumn as keyof FunnelRow] ?? "";
    const bVal = b[sortColumn as keyof FunnelRow] ?? "";
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      {/* Title block */}
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">Funnel</h3>
        </div>
        <PinButton chartId="funnel" />
      </div>

      <AiInsight
        suggestion="Create an always-on organic content calendar to reduce dependency on events, which account for 87% of funnel volume"
        linearTeam="MARKETING"
      >
        Events dominate the funnel at 87% of total leads (2,455 of 2,820), but Jan volume dropped sharply — organic search demos remain the most consistent non-event channel with 26 leads.
      </AiInsight>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{funnel.length} items</span>
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
                  <span className="text-xs font-medium text-muted-foreground">{col.label}</span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow
              key={row.group}
              className={row.isTotal ? "border-t-2 border-t-foreground" : ""}
            >
              {COLUMNS.map((col) => (
                <TableCell
                  key={col.key}
                  className={`px-6 py-4 text-sm tabular-nums ${row.isTotal ? "font-bold" : ""}`}
                >
                  {row[col.key] as string}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
