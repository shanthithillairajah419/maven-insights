import { OkrSection } from "@/components/okr-section";
import { salesOkrs } from "@/data/mock-sales";
import { OpenDealsTable } from "./sales-tab/open-deals-table";
import { SalesForecastTable } from "./sales-tab/sales-forecast-table";
import { SdrPipelineTable } from "./marketing-tab/sdr-pipeline-table";
import { SdrOpsTable } from "./marketing-tab/sdr-ops-table";

export function SalesTab() {
  return (
    <div className="flex flex-col gap-6 px-10 pt-10 pb-10">
      <OkrSection
        okrs={salesOkrs}
        chartId="sales-okrs"
        insight="ARR is tracking at 22% with $80M pipeline at 50%, and win rate is on track at 70% — strong pipeline momentum, but close-rate acceleration is needed to hit the $20M target by Q1 end."
        suggestion="Run a pipeline-to-close conversion workshop with AEs this week to identify and unblock stalled deals before month-end"
        linearTeam="SALES"
      />
      <SdrPipelineTable />
      <SdrOpsTable />
      <OpenDealsTable />
      <SalesForecastTable />
    </div>
  );
}
