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
import { siteTraffic } from "@/data/mock-marketing";
import type { SiteTrafficRow } from "@/data/mock-marketing";

const COLUMNS: { key: keyof SiteTrafficRow; label: string; sortable: boolean }[] = [
  { key: "metric", label: "Metric", sortable: true },
  { key: "janMtd", label: "Jan (MTD)", sortable: true },
  { key: "dec", label: "Dec", sortable: true },
  { key: "nov", label: "Nov", sortable: true },
];

export function SiteTrafficTable() {
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

  const sortedData = [...siteTraffic].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn as keyof SiteTrafficRow] ?? "";
    const bVal = b[sortColumn as keyof SiteTrafficRow] ?? "";
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">Site Traffic</h3>
        </div>
        <PinButton chartId="site-traffic" />
      </div>

      <AiInsight
        suggestion="Double down on current paid mix while traffic is surging — increase budget allocation to top-performing ad sets this week"
        linearTeam="MARKETING"
      >
        Site traffic surged 63% MoM (5,640 to 9,187) while CPL dropped from $983 to $670 — paid campaigns are driving more efficient top-of-funnel volume this month.
      </AiInsight>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{siteTraffic.length} items</span>
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
            <TableRow
              key={row.metric}
              className=""
            >
              {COLUMNS.map((col) => {
                const value = row[col.key] as string;
                const bold = row.isBold;

                return (
                  <TableCell
                    key={col.key}
                    className={`px-6 py-4 text-sm tabular-nums ${bold ? "font-bold" : ""}`}
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
