import type { Okr } from "@/types/okr";

// ---------------------------------------------------------------------------
// Helix OKRs (existing eng OKRs)
// ---------------------------------------------------------------------------

export const helixOkrs: Okr[] = [
  {
    name: "Bring Voice to GA and accelerate commercial uptake",
    dueDate: "2026-03-31",
    percentComplete: 54,
  },
  {
    name: "First 3 voice partners in production (Papaya Pay, Guthy-Renker, Thumbtack)",
    dueDate: "2026-03-31",
    percentComplete: 33,
  },
  {
    name: "Enable Forge, Solutions, and Customers to fully own voice-surface integrations (Voice APIs)",
    dueDate: "2026-03-31",
    percentComplete: 75,
  },
  {
    name: "Deliver a seamless, high-confidence Agent Ops experience",
    dueDate: "2026-03-31",
    percentComplete: 22,
  },
  {
    name: "[Launch] Segments",
    dueDate: "2026-03-31",
    percentComplete: 50,
  },
  {
    name: "[Launch] Instructions",
    dueDate: "2026-03-31",
    percentComplete: 50,
  },
  {
    name: "[Launch] Capabilities",
    dueDate: "2026-03-31",
    percentComplete: 33,
  },
];

// Keep backward compat alias
export const prodEngOkrs = helixOkrs;

// ---------------------------------------------------------------------------
// General OKRs (uptime + autonomous resolution)
// ---------------------------------------------------------------------------

export const generalOkrs: Okr[] = [
  {
    name: "Maintain 100% all-up system uptime",
    dueDate: "2026-03-31",
    percentComplete: 100,
    status: "green",
  },
  {
    name: "Achieve ≥ 80% autonomous resolution rate on complex enterprise journeys",
    dueDate: "2026-03-31",
    percentComplete: 37,
    status: "yellow",
  },
];

// ---------------------------------------------------------------------------
// Uptime data (per component)
// ---------------------------------------------------------------------------

export interface UptimeComponent {
  name: string;
  uptime: number;
  subComponents?: number;
}

export const uptimeComponents: UptimeComponent[] = [
  { name: "Agent Designer", uptime: 100 },
  { name: "API", uptime: 100, subComponents: 1 },
  { name: "Apps", uptime: 100, subComponents: 4 },
];

// ---------------------------------------------------------------------------
// Incident data
// ---------------------------------------------------------------------------

export interface IncidentWeek {
  week: string;
  minor: number;
  major: number;
  critical: number;
  total: number;
}

export const incidentData: IncidentWeek[] = [
  { week: "Jan 12, 2026", minor: 0, major: 1, critical: 0, total: 1 },
  { week: "Jan 19, 2026", minor: 0, major: 1, critical: 0, total: 1 },
  { week: "Jan 26, 2026", minor: 2, major: 1, critical: 1, total: 4 },
  { week: "Feb 2, 2026", minor: 2, major: 1, critical: 0, total: 3 },
];

// ---------------------------------------------------------------------------
// Forge OKRs
// ---------------------------------------------------------------------------

export const forgeOkrs: Okr[] = [
  {
    name: "Email used by 3+ customers",
    dueDate: "2026-01-31",
    percentComplete: 40,
  },
  {
    name: "Attachment Support for Agent Handoff for 3 ticketing systems (Genesys, Hubspot, Salesforce) used by 1+ customers each",
    dueDate: "2026-01-31",
    percentComplete: 33,
  },
  {
    name: "Freshservice copilot used by 1+ customer",
    dueDate: "2026-01-31",
    percentComplete: 0,
  },
];

// ---------------------------------------------------------------------------
// Athena OKRs
// ---------------------------------------------------------------------------

export const athenaOkrs: Okr[] = [
  {
    name: "LAND: Platform API (Inception)",
    dueDate: "2026-03-31",
    percentComplete: 45,
    status: "yellow",
  },
  {
    name: "LAND: Events API (Dependency to enable proactive)",
    dueDate: "2026-03-31",
    percentComplete: 80,
    status: "green",
  },
  {
    name: "[DEMO] OnPrem used by 1+ customer (phase 1 complete)",
    dueDate: "2026-03-31",
    percentComplete: 40,
  },
];

// ---------------------------------------------------------------------------
// Consumption by Surface (stacked bar chart - key surfaces only)
// ---------------------------------------------------------------------------

export interface ConsumptionMonth {
  month: string;
  chat: number;
  email: number;
  instantAnswers: number;
  sms: number;
  voice: number;
  copilot: number;
}

export const consumptionBySurface: ConsumptionMonth[] = [
  { month: "2025-05", chat: 57000, email: 19000, instantAnswers: 51000, sms: 11000, voice: 11000, copilot: 48000 },
  { month: "2025-06", chat: 59000, email: 18000, instantAnswers: 27000, sms: 12000, voice: 11000, copilot: 47000 },
  { month: "2025-07", chat: 51000, email: 19000, instantAnswers: 17000, sms: 13000, voice: 10000, copilot: 51000 },
  { month: "2025-08", chat: 50000, email: 16000, instantAnswers: 12000, sms: 0, voice: 0, copilot: 48000 },
  { month: "2025-09", chat: 52000, email: 23000, instantAnswers: 10000, sms: 0, voice: 0, copilot: 55000 },
  { month: "2025-10", chat: 59000, email: 29000, instantAnswers: 10000, sms: 0, voice: 0, copilot: 52000 },
  { month: "2025-11", chat: 69000, email: 24000, instantAnswers: 14000, sms: 12000, voice: 0, copilot: 46000 },
  { month: "2025-12", chat: 76000, email: 18000, instantAnswers: 10000, sms: 0, voice: 0, copilot: 45000 },
  { month: "2026-01", chat: 81000, email: 20000, instantAnswers: 0, sms: 0, voice: 0, copilot: 38000 },
];

// ---------------------------------------------------------------------------
// Features & Bugs by Team (horizontal bar chart)
// ---------------------------------------------------------------------------

export interface TeamFeaturesBugs {
  team: string;
  featuresDelivered: number;
  bugsFixed: number;
}

export const featuresBugsByTeam: TeamFeaturesBugs[] = [
  { team: "Athena", featuresDelivered: 3, bugsFixed: 5 },
  { team: "Forge", featuresDelivered: 2, bugsFixed: 3 },
  { team: "Helix", featuresDelivered: 4, bugsFixed: 6 },
  { team: "Torus", featuresDelivered: 1, bugsFixed: 4 },
  { team: "Mobius", featuresDelivered: 3, bugsFixed: 2 },
  { team: "Solutions", featuresDelivered: 4, bugsFixed: 6 },
];

// ---------------------------------------------------------------------------
// New Bugs by Team (grouped vertical bar chart)
// ---------------------------------------------------------------------------

export interface NewBugsByTeamWeek {
  week: string;
  athena: number;
  forge: number;
  helix: number;
  torus: number;
  mobius: number;
}

export const newBugsByTeam: NewBugsByTeamWeek[] = [
  { week: "W1 Jan", athena: 3, forge: 1, helix: 5, torus: 2, mobius: 2 },
  { week: "W2 Jan", athena: 2, forge: 4, helix: 3, torus: 1, mobius: 2 },
  { week: "W3 Jan", athena: 1, forge: 2, helix: 6, torus: 3, mobius: 1 },
  { week: "W4 Jan", athena: 4, forge: 2, helix: 2, torus: 5, mobius: 3 },
  { week: "W1 Feb", athena: 2, forge: 3, helix: 4, torus: 1, mobius: 2 },
];
