export const LinearTeam = {
  SOLUTIONS: {
    teamId: "2a5b90cc-d6cc-4580-b126-244bddcf8146",
    triageStateId: "0b0ede04-02c0-4cb3-bd61-f6d488420102",
    label: "GTM Solutions",
  },
  SALES: {
    teamId: "ac80aada-ec68-4294-a886-2c9ed99ee9ae",
    triageStateId: "35c789ea-c0eb-4d6d-9fd3-e879e1081b12",
    label: "GTM Sales",
  },
  CX: {
    teamId: "8f622d22-5735-423e-88ba-b0ae4881ae9a",
    triageStateId: "2bf0c9dc-5d13-4dfb-8b90-e93ab762fafb",
    label: "GTM Customer Experience",
  },
  MARKETING: {
    teamId: "1e64d8c3-8127-4cbd-afd8-16a058256ac7",
    triageStateId: "8da81abf-68c7-4427-84c2-037eec45e350",
    label: "Marketing",
  },
  PRODENG: {
    teamId: "3c5ab62e-e7f4-4aaf-ac0c-efb62bcbc5ea",
    triageStateId: "205658bc-62c5-4c47-a60b-5cc97d90000b",
    label: "Product Engineering",
  },
} as const;

export type LinearTeamKey = keyof typeof LinearTeam;
