import type { Okr } from "@/types/okr";

export const salesOkrs: Okr[] = [
  {
    name: "$20M Total ARR",
    dueDate: "2026-03-31",
    percentComplete: 22,
  },
  {
    name: "Deliver in $80M pipeline built",
    dueDate: "2026-01-31",
    percentComplete: 50,
  },
  {
    name: "Achieve 90% win rate",
    dueDate: "2026-03-31",
    percentComplete: 70,
    status: "green",
  },
];

export interface OpenDeal {
  owner: string;
  dealName: string;
  forecastCategory: "Commit" | "Most Likely" | "Best case";
  stage: string;
  closeDate: string;
  amount: number;
  nextSteps: string;
}

export interface ForecastRow {
  team: string;
  pipeline: number;
  pipelineVar: number;
  bestCase: number;
  bestCaseVar: number;
  mostLikely: number;
  mostLikelyVar: number;
  commit: number;
  commitVar: number;
  won: number;
  wonVar: number;
  isTotal?: boolean;
}

export const openDeals: OpenDeal[] = [
  {
    owner: "Brian McCool",
    dealName: "OneTrust",
    forecastCategory: "Commit",
    stage: "5. Pricing/Proposal",
    closeDate: "2026-01-28",
    amount: 241600,
    nextSteps:
      "1/26: Call with procurement\n1/26: Return redlines\n1/28: Legal/procurement approval\n1/29: Sign contracts",
  },
  {
    owner: "Brian McCool",
    dealName: "Bynder",
    forecastCategory: "Commit",
    stage: "5. Pricing/Proposal",
    closeDate: "2026-01-27",
    amount: 71544,
    nextSteps: "1/26: Finalize redlines\n1/27: Sign contracts",
  },
  {
    owner: "Ben Sisk",
    dealName: "Bluebeam, Inc.",
    forecastCategory: "Most Likely",
    stage: "5. Pricing/Proposal",
    closeDate: "2026-01-30",
    amount: 198000,
    nextSteps:
      "1/26 - Meeting with champion to determine legal and AI team progress\n1/27 - Receive redlines\n1/28 - Potential call with AI team to get approval\n1/29 - Legal approval\n1/30 - Sign contracts",
  },
  {
    owner: "Dave Scalera",
    dealName: "KARL STORZ United States",
    forecastCategory: "Best case",
    stage: "2. Full Demo",
    closeDate: "2026-01-30",
    amount: 200000,
    nextSteps:
      "1/26 - Marian meeting with CFO to determine if he can expedite approval\n1/27 - President approval\n1/30 - Sign contracts",
  },
  {
    owner: "Mac Riedy",
    dealName: "Ouster",
    forecastCategory: "Most Likely",
    stage: "5. Pricing/Proposal",
    closeDate: "2026-01-30",
    amount: 54800,
    nextSteps:
      "1/26 - Passed security requirements; meeting with Ouster GC on Monday to review feedback; Last hurdle before signature",
  },
  {
    owner: "Bob Vail",
    dealName: "Pantheon Platform",
    forecastCategory: "Most Likely",
    stage: "2. Full Demo",
    closeDate: "2026-01-29",
    amount: 110000,
    nextSteps:
      "1/26 - Pricing presented ahead of closing call on Wednesday; Need to send order form for review early this week",
  },
  {
    owner: "Michelle Coffey",
    dealName: "ClickUp",
    forecastCategory: "Commit",
    stage: "5. Pricing/Proposal",
    closeDate: "2026-01-30",
    amount: 82500,
    nextSteps:
      "1/26: Response to auto renewal and increase cap\n1/27: Approval from procurement/finance\n1/30: Sign OF",
  },
];

export const salesForecast: ForecastRow[] = [
  {
    team: "Strategic",
    pipeline: 1243467,
    pipelineVar: 0,
    bestCase: 1243467,
    bestCaseVar: 0,
    mostLikely: 1243467,
    mostLikelyVar: 0,
    commit: 1243467,
    commitVar: 0,
    won: 1243467,
    wonVar: 0,
  },
  {
    team: "Enterprise",
    pipeline: 1735794,
    pipelineVar: -119500,
    bestCase: 1735794,
    bestCaseVar: -119500,
    mostLikely: 1087794,
    mostLikelyVar: 28044,
    commit: 1087794,
    commitVar: 154044,
    won: 721750,
    wonVar: 0,
  },
  {
    team: "Midmarket",
    pipeline: 909780,
    pipelineVar: -100000,
    bestCase: 859780,
    bestCaseVar: 0,
    mostLikely: 859780,
    mostLikelyVar: 110000,
    commit: 644980,
    commitVar: 0,
    won: 644980,
    wonVar: 0,
  },
  {
    team: "Total",
    pipeline: 3889041,
    pipelineVar: -219500,
    bestCase: 3839041,
    bestCaseVar: -119500,
    mostLikely: 3191041,
    mostLikelyVar: 138044,
    commit: 2976241,
    commitVar: 154044,
    won: 2610197,
    wonVar: 0,
    isTotal: true,
  },
];
