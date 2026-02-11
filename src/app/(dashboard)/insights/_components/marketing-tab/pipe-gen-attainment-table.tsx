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
import { pipeGenAttainment } from "@/data/mock-marketing";
import type { PipeGenAttainmentRow } from "@/data/mock-marketing";

const COLUMNS: { key: keyof PipeGenAttainmentRow; label: string; sortable: boolean }[] = [
  { key: "pipelineSource", label: "Pipeline Source", sortable: true },
  { key: "newOpps", label: "New Opps", sortable: true },
  { key: "oppGoalFq", label: "Opp Goal (FQ)", sortable: true },
  { key: "oppGoalPacing", label: "Opp Goal (Pacing)", sortable: true },
  { key: "newOppsAttainment", label: "New Opps Attainment", sortable: true },
  { key: "newPipeline", label: "New Pipeline", sortable: true },
  { key: "pipelineGoalFq", label: "Pipeline Goal (FQ)", sortable: true },
  { key: "pipelineGoalPacing", label: "Pipeline Goal (Pacing)", sortable: true },
  { key: "newPipelineAttainment", label: "New Pipeline Attainment", sortable: true },
];

// Attainment coloring: green for >= 50%, red/pink for < 50%
function attainmentBg(value: string): string {
  const num = parseInt(value, 10);
  if (isNaN(num)) return "";
  if (num >= 50) return "bg-[#dcfce7]";
  return "bg-[#fee2e2]";
}

export function PipeGenAttainmentTable() {
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

  const sortedData = [...pipeGenAttainment].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a.isTotal) return 1;
    if (b.isTotal) return -1;
    const aVal = a[sortColumn as keyof PipeGenAttainmentRow] ?? "";
    const bVal = b[sortColumn as keyof PipeGenAttainmentRow] ?? "";
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">Pipe Gen Attainment</h3>
        </div>
        <PinButton chartId="pipe-gen-attainment" />
      </div>

      <AiInsight
        suggestion="Schedule a partner enablement sprint with the top 5 channel partners to accelerate PQL pipeline from 6% to target pacing"
        linearTeam="MARKETING"
      >
        SDR channel is outperforming at 62% opp attainment and driving $10.3M in pipeline, while Partner channel is critically behind at 6% — partner enablement needs immediate attention.
      </AiInsight>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{pipeGenAttainment.length} items</span>
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
              key={row.pipelineSource}
              className={row.isTotal ? "border-t-2 border-t-foreground" : ""}
            >
              {COLUMNS.map((col) => {
                const value = row[col.key] as string;
                const isAttainmentCol =
                  col.key === "newOppsAttainment" || col.key === "newPipelineAttainment";
                const cellBg = isAttainmentCol ? attainmentBg(value) : "";

                return (
                  <TableCell
                    key={col.key}
                    className={`px-6 py-4 text-sm tabular-nums ${row.isTotal ? "font-bold" : ""} ${cellBg}`}
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
