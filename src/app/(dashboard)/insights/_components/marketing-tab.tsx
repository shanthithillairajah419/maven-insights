import { OkrSection } from "@/components/okr-section";
import { marketingOkrs } from "@/data/mock-marketing";
import { PipeGenAttainmentTable } from "./marketing-tab/pipe-gen-attainment-table";
import { SiteTrafficTable } from "./marketing-tab/site-traffic-table";
import { FunnelTable } from "./marketing-tab/funnel-table";
import { SdrPipelineTable } from "./marketing-tab/sdr-pipeline-table";
import { SdrOpsTable } from "./marketing-tab/sdr-ops-table";

export function MarketingTab() {
  return (
    <div className="flex flex-col gap-6 px-10 pt-10 pb-10">
      <OkrSection
        okrs={marketingOkrs}
        chartId="marketing-okrs"
        insight="Industry presence exceeded target at 158%, but lead gen and content OKRs are significantly behind — consider reallocating event-driven momentum toward direct lead campaigns."
        suggestion="Launch a targeted paid content campaign this month to convert event-driven brand awareness into direct MQL pipeline"
        linearTeam="MARKETING"
      />
      <PipeGenAttainmentTable />
      <SiteTrafficTable />
      <FunnelTable />
      <SdrPipelineTable />
      <SdrOpsTable />
    </div>
  );
}
