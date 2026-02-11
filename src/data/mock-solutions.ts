import type { Okr } from "@/types/okr";

export const solutionsOkrs: Okr[] = [
  {
    name: "Onboard 80% of customers in < 30 days",
    dueDate: "2026-03-31",
    percentComplete: 25,
  },
  {
    name: "120% prorated total consumption of contracted resolutions",
    dueDate: "2026-03-31",
    percentComplete: 114,
    status: "green",
  },
];

// ---------------------------------------------------------------------------
// Features Delivered & Bugs Fixed (Weekly bar chart)
// ---------------------------------------------------------------------------

export interface FeaturesAndBugsWeek {
  week: string;
  featuresDelivered: number;
  bugsFixed: number;
}

export const featuresAndBugs: FeaturesAndBugsWeek[] = [
  { week: "W1 Jan", featuresDelivered: 3, bugsFixed: 5 },
  { week: "W2 Jan", featuresDelivered: 5, bugsFixed: 7 },
  { week: "W3 Jan", featuresDelivered: 2, bugsFixed: 9 },
  { week: "W4 Jan", featuresDelivered: 6, bugsFixed: 4 },
  { week: "W1 Feb", featuresDelivered: 4, bugsFixed: 6 },
];

// ---------------------------------------------------------------------------
// Net New Bugs Incoming (Weekly bar chart by priority)
// ---------------------------------------------------------------------------

export interface NewBugsWeek {
  week: string;
  high: number;
  medium: number;
  low: number;
}

export const newBugs: NewBugsWeek[] = [
  { week: "W1 Jan", high: 6, medium: 11, low: 18 },
  { week: "W2 Jan", high: 4, medium: 14, low: 12 },
  { week: "W3 Jan", high: 8, medium: 9, low: 15 },
  { week: "W4 Jan", high: 3, medium: 7, low: 10 },
  { week: "W1 Feb", high: 5, medium: 12, low: 8 },
];

// ---------------------------------------------------------------------------
// Onboarding Forecast - At Risk
// ---------------------------------------------------------------------------

export interface OnboardingRow {
  customerName: string;
  fde: string;
  cxm: string;
  kickOffDate: string;
  onboardingStatus: string;
  daysToOnboard: string;
  nextSteps: string;
  isTotal?: boolean;
}

export const onboardingAtRisk: OnboardingRow[] = [
  {
    customerName: "Great Place To Work",
    fde: "Ryan Gemos",
    cxm: "Derek Ford",
    kickOffDate: "2025-09-04",
    onboardingStatus: "Off Track",
    daysToOnboard: "144",
    nextSteps:
      "1/26 - Currently scheduled to go live for Chat and IA on Jan 29.",
  },
  {
    customerName: "Rockstar Automations",
    fde: "Crystal Baker",
    cxm: "Derek Ford",
    kickOffDate: "2025-07-07",
    onboardingStatus: "Off Track",
    daysToOnboard: "203",
    nextSteps:
      "1/26 - Jasmine followed up and reiterated their desire to disengage with Maven.",
  },
  {
    customerName: "Vanilla",
    fde: "Ryan Gemos",
    cxm: "Daniel Stern",
    kickOffDate: "2025-11-12",
    onboardingStatus: "At Risk",
    daysToOnboard: "75",
    nextSteps:
      "1/26 - Same as last week, for their eng to tackle userAuth, slack is live internally. Blocked by them.",
  },
  {
    customerName: "Quest",
    fde: "Ryan Gemos",
    cxm: "Chris Belz",
    kickOffDate: "2025-11-24",
    onboardingStatus: "At Risk",
    daysToOnboard: "63",
    nextSteps:
      "1/26 - Final week of testing and QA before go live next week. No critical blockers at this time.",
  },
  {
    customerName: "Cometeer",
    fde: "Ryan Gemos",
    cxm: "Aimee Allen",
    kickOffDate: "2025-09-18",
    onboardingStatus: "At Risk",
    daysToOnboard: "130",
    nextSteps:
      "1/26 - Crystal is pushing on the final fixes, once delivered this week they should be able to go live next week.",
  },
  {
    customerName: "Fortress OS",
    fde: "Ryan Gemos",
    cxm: "John Bowman",
    kickOffDate: "2025-11-07",
    onboardingStatus: "At Risk",
    daysToOnboard: "80",
    nextSteps:
      "1/26 - The team made significant progress on knowledge base organization, with Fortress completing the labeling of all customer success content.",
  },
  {
    customerName: "Tishman Speyer",
    fde: "Ryan Gemos",
    cxm: "Aimee Allen",
    kickOffDate: "2025-09-11",
    onboardingStatus: "At Risk",
    daysToOnboard: "137",
    nextSteps:
      "1/26 - Continuing with Integration build, Tishman team is engaged and happy.",
  },
  {
    customerName: "Total",
    fde: "",
    cxm: "",
    kickOffDate: "",
    onboardingStatus: "",
    daysToOnboard: "119",
    nextSteps: "",
    isTotal: true,
  },
];

// ---------------------------------------------------------------------------
// Onboarding Forecast - On Track
// ---------------------------------------------------------------------------

export const onboardingOnTrack: OnboardingRow[] = [
  {
    customerName: "Apryse",
    fde: "Ryan Gemos",
    cxm: "Chris Belz",
    kickOffDate: "2026-01-22",
    onboardingStatus: "On Track",
    daysToOnboard: "4",
    nextSteps:
      "1/26 - Had kickoff call and first Implementation call to go over everything.",
  },
  {
    customerName: "iApartments",
    fde: "Ryan Gemos",
    cxm: "Mark Smith",
    kickOffDate: "2026-01-05",
    onboardingStatus: "On Track",
    daysToOnboard: "21",
    nextSteps:
      "1/26 - Configured salesforce last Friday, knowledge is now set up and we are moving to quality and tuning.",
  },
  {
    customerName: "Practice Better",
    fde: "Ryan Gemos",
    cxm: "Mark Smith",
    kickOffDate: "2026-01-14",
    onboardingStatus: "On Track",
    daysToOnboard: "12",
    nextSteps:
      "1/26 - Finally had kickoff call, setup a recurring weekly meeting or Implementation.",
  },
  {
    customerName: "SOLO",
    fde: "Ryan Gemos",
    cxm: "Mark Smith",
    kickOffDate: "2025-12-09",
    onboardingStatus: "On Track",
    daysToOnboard: "48",
    nextSteps: "1/26 - Moving along with quality testing and tuning",
  },
  {
    customerName: "HubSync",
    fde: "Ryan Gemos",
    cxm: "Chris Belz",
    kickOffDate: "2025-12-03",
    onboardingStatus: "On Track",
    daysToOnboard: "54",
    nextSteps:
      "1/26 - FDE team is investigating the Docsie connection.",
  },
  {
    customerName: "hyperexponential",
    fde: "Matthew Starr",
    cxm: "Aimee Allen",
    kickOffDate: "2025-09-10",
    onboardingStatus: "On Track",
    daysToOnboard: "138",
    nextSteps:
      "1/26 - Chat on app delayed until February; waiting on JIRA copilot testing availability",
  },
  {
    customerName: "Bonterra",
    fde: "Ryan Gemos",
    cxm: "Chris Belz",
    kickOffDate: "2025-12-03",
    onboardingStatus: "On Track",
    daysToOnboard: "54",
    nextSteps:
      "1/26 - Meeting with product today to discuss various chat features.",
  },
];
