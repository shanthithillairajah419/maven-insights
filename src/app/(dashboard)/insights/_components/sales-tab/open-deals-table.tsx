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
import { openDeals } from "@/data/mock-sales";
import type { OpenDeal } from "@/data/mock-sales";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const COLUMNS = [
  { key: "owner", label: "Owner", sortable: true },
  { key: "dealName", label: "Deal Name", sortable: true },
  { key: "forecastCategory", label: "Forecast Category", sortable: true },
  { key: "stage", label: "Stage", sortable: true },
  { key: "closeDate", label: "Close Date", sortable: true },
  { key: "amount", label: "Amount", sortable: true },
  { key: "nextSteps", label: "Next Steps", sortable: false },
] as const;

export function OpenDealsTable() {
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

  const sortedDeals = [...openDeals].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn as keyof OpenDeal];
    const bVal = b[sortColumn as keyof OpenDeal];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    const aStr = String(aVal);
    const bStr = String(bVal);
    return sortDirection === "asc"
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  return (
    <div className="rounded-xl border border-border-subtle bg-card">
      {/* Title block */}
      <div className="flex items-start justify-between px-6 pt-6 pb-1">
        <div>
          <h3 className="text-base font-semibold text-foreground">Open Deals</h3>
        </div>
        <PinButton chartId="open-deals" />
      </div>

      <AiInsight
        suggestion="Schedule daily check-ins with OneTrust and ClickUp deal owners through Friday to ensure procurement and legal milestones stay on track"
        linearTeam="SALES"
      >
        Pipeline is concentrated with 3 commit-stage deals totaling $396K closing this week — OneTrust at $242K is the largest and most time-sensitive.
      </AiInsight>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{openDeals.length} items</span>
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
          {sortedDeals.map((deal, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 py-4 text-sm">{deal.owner}</TableCell>
              <TableCell className="px-6 py-4 text-sm">{deal.dealName}</TableCell>
              <TableCell className="px-6 py-4 text-sm">{deal.forecastCategory}</TableCell>
              <TableCell className="px-6 py-4 text-sm">{deal.stage}</TableCell>
              <TableCell className="px-6 py-4 text-sm tabular-nums">{deal.closeDate}</TableCell>
              <TableCell className="px-6 py-4 text-sm tabular-nums">
                {formatCurrency(deal.amount)}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm max-w-[300px] truncate">
                {deal.nextSteps.split("\n")[0]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
