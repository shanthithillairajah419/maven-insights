"use client";

import { useState } from "react";
import { OkrSection } from "@/components/okr-section";
import {
  generalOkrs,
  helixOkrs,
  forgeOkrs,
  athenaOkrs,
} from "@/data/mock-prodeng";
import { ConsumptionChart } from "./prodeng-tab/consumption-chart";
import { FeaturesBugsTeamChart } from "./prodeng-tab/features-bugs-team-chart";
import { NewBugsTeamChart } from "./prodeng-tab/new-bugs-team-chart";
import { UptimeStatus } from "./prodeng-tab/uptime-status";
import { IncidentChart } from "./prodeng-tab/incident-chart";
import { cn } from "@/lib/utils";

const PRODENG_TABS = [
  { value: "general", label: "General" },
  { value: "forge", label: "Forge" },
  { value: "helix", label: "Helix" },
  { value: "athena", label: "Athena" },
] as const;

type ProdEngTabValue = (typeof PRODENG_TABS)[number]["value"];

export function ProdEngTab() {
  const [activeSubTab, setActiveSubTab] = useState<ProdEngTabValue>("general");

  return (
    <div className="flex flex-col gap-6 px-10 pt-6 pb-10">
      {/* Horizontal sub-tabs */}
      <div className="flex gap-1 border-b border-border">
        {PRODENG_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveSubTab(tab.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeSubTab === tab.value
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeSubTab === "general" && <GeneralContent />}
      {activeSubTab === "forge" && <ForgeContent />}
      {activeSubTab === "helix" && <HelixContent />}
      {activeSubTab === "athena" && <AthenaContent />}
    </div>
  );
}

function GeneralContent() {
  return (
    <div className="flex flex-col gap-6">
      <OkrSection
        okrs={generalOkrs}
        chartId="prodeng-general-okrs"
        insight="System uptime remains at 100% across all components, but autonomous resolution rate at 37.7% is significantly below the 80% target — this is the key metric to accelerate."
        suggestion="Prioritize tuning the resolution engine on the top 10 most-common enterprise journey types to rapidly close the gap toward 80%"
        linearTeam="PRODENG"
      />
      <UptimeStatus />
      <IncidentChart />
    </div>
  );
}

function ForgeContent() {
  return (
    <div className="flex flex-col gap-6">
      <OkrSection
        okrs={forgeOkrs}
        chartId="prodeng-forge-okrs"
        insight="Email channel is leading at 40%, but Freshservice copilot is at 0% with the same Jan 31 deadline — immediate focus needed to avoid missing the target entirely."
        suggestion="Assign a dedicated engineer to the Freshservice copilot integration to unblock progress before the Jan 31 deadline"
        linearTeam="PRODENG"
      />
    </div>
  );
}

function HelixContent() {
  return (
    <div className="flex flex-col gap-6">
      <OkrSection
        okrs={helixOkrs}
        chartId="prodeng-helix-okrs"
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

function AthenaContent() {
  return (
    <div className="flex flex-col gap-6">
      <OkrSection
        okrs={athenaOkrs}
        chartId="prodeng-athena-okrs"
        insight="Events API is well on track at 80%, but Platform API is only progressing — ensure the dependency chain doesn't block proactive features downstream."
        suggestion="Schedule a cross-team sync between Platform API and Events API owners to identify and resolve any blocking dependencies this sprint"
        linearTeam="PRODENG"
      />
    </div>
  );
}
