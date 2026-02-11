import { OkrSection } from "@/components/okr-section";
import { prodEngOkrs } from "@/data/mock-prodeng";
import { ConsumptionChart } from "./prodeng-tab/consumption-chart";
import { FeaturesBugsTeamChart } from "./prodeng-tab/features-bugs-team-chart";
import { NewBugsTeamChart } from "./prodeng-tab/new-bugs-team-chart";

export function ProdEngTab() {
  return (
    <div className="flex flex-col gap-6 px-10 pt-10 pb-10">
      <OkrSection
        okrs={prodEngOkrs}
        chartId="prodeng-okrs"
        insight="Voice APIs are 75% complete and leading other initiatives, while Agent Ops at 22% is the biggest risk — consider reallocating sprint capacity to close the gap before Q1 end."
        suggestion="Move one engineer from Voice APIs (75% done) to Agent Ops (22%) to ensure the lowest-progress OKR gets unblocked before Q1 end"
        linearTeam="PRODENG"
      />
      <ConsumptionChart />
      <FeaturesBugsTeamChart />
      <NewBugsTeamChart />
    </div>
  );
}
