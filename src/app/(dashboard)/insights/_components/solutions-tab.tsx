import { OkrSection } from "@/components/okr-section";
import { solutionsOkrs } from "@/data/mock-solutions";
import { FeaturesBugsChart } from "./solutions-tab/features-bugs-chart";
import { NewBugsChart } from "./solutions-tab/new-bugs-chart";
import { OnboardingAtRiskTable } from "./solutions-tab/onboarding-at-risk-table";
import { OnboardingOnTrackTable } from "./solutions-tab/onboarding-on-track-table";

export function SolutionsTab() {
  return (
    <div className="flex flex-col gap-6 px-10 pt-10 pb-10">
      <OkrSection
        okrs={solutionsOkrs}
        chartId="solutions-okrs"
        insight="Onboarding speed is at 25% of target — with 7 at-risk customers averaging 119 days, reducing blockers on customer-side dependencies is critical to hitting the 30-day goal."
        suggestion="Implement a 72-hour SLA for customer-side dependency resolution to prevent onboarding timelines from stretching beyond 30 days"
        linearTeam="SOLUTIONS"
      />
      <FeaturesBugsChart />
      <NewBugsChart />
      <OnboardingAtRiskTable />
      <OnboardingOnTrackTable />
    </div>
  );
}
