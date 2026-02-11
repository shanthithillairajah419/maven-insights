import { OkrSection } from "@/components/okr-section";
import { cxOkrs } from "@/data/mock-cx";
import { CustomerHealthChart } from "./cx-tab/customer-health-chart";
import { RetentionTable } from "./cx-tab/retention-table";
import { RenewalsQ4Table } from "./cx-tab/renewals-q4-table";
import { RenewalsQ1Table } from "./cx-tab/renewals-q1-table";
import { MultiYearTable } from "./cx-tab/multi-year-table";
import { RedCustomersTable } from "./cx-tab/red-customers-table";

export function CxTab() {
  return (
    <div className="flex flex-col gap-6 px-10 pt-10 pb-10">
      <OkrSection
        okrs={cxOkrs}
        chartId="cx-okrs"
        insight="Consumption expansion is on track at 70%, but proactive engagement lags at 38% — prioritizing customer touchpoints could accelerate integration adoption and retention."
        suggestion="Schedule weekly proactive check-ins with the 10 lowest-engagement accounts to drive integration adoption and lift the 38% engagement OKR"
        linearTeam="CX"
      />
      <CustomerHealthChart />
      <RetentionTable />
      <RenewalsQ4Table />
      <RenewalsQ1Table />
      <MultiYearTable />
      <RedCustomersTable />
    </div>
  );
}
