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
import { sdrPipeline } from "@/data/mock-marketing";
import type { SdrPipelineRow } from "@/data/mock-marketing";

const COLUMNS: { key: keyof SdrPipelineRow; label: string; sortable: boolean }[] = [
  { key: "sdr", label: "SDR", sortable: true },
  { key: "nov", label: "Nov", sortable: true },
  { key: "dec", label: "Dec", sortable: true },
  { key: "jan", label: "Jan", sortable: true },
  { key: "attainment", label: "Attainment", sortable: true },
  { key: "q4", label: "Q4", sortable: true },
  { key: "q4Attainment", label: "Attainment", sortable: true },
];

export function SdrPipelineTable() {
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

  const sortedData = [...sdrPipeline].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a.isTotal) return 1;
    if (b.isTotal) return -1;
    const aVal = a[sortColumn as keyof SdrPipelineRow] ?? "";
    const bVal = b[sortColumn as keyof SdrPipelineRow] ?? "";
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      {/* Title block */}
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">SDR Attainment - Pipeline</h3>
        </div>
        <PinButton chartId="sdr-pipeline" />
      </div>

      <AiInsight
        suggestion="Pair top performers Jake and Dylan with underperforming SDRs for shadowing sessions to distribute pipeline generation skills"
        linearTeam="SALES"
      >
        Dylan DeSimone leads Jan pipeline at $635K (212% attainment), while Bridget Larkin is at $0K — the top 3 SDRs are generating 54% of all pipeline, suggesting capacity for better distribution.
      </AiInsight>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{sdrPipeline.length} items</span>
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
          {sortedData.map((row) => (
            <TableRow
              key={row.sdr}
              className={row.isTotal ? "border-t-2 border-t-foreground" : ""}
            >
              {COLUMNS.map((col, i) => {
                const isGreenHighlight =
                  row.isTotal && (col.key === "q4" || col.key === "q4Attainment");
                return (
                  <TableCell
                    key={`${col.key}-${i}`}
                    className={`px-6 py-4 text-sm tabular-nums ${row.isTotal ? "font-bold" : ""}`}
                  >
                    {isGreenHighlight ? (
                      <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-emerald-800">
                        {row[col.key] as string}
                      </span>
                    ) : (
                      (row[col.key] as string)
                    )}
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
