export type GovernorateSlug =
  | "baghdad"
  | "basra"
  | "erbil"
  | "najaf"
  | "ninawa"
  | "dhi-qar"
  | "maysan"
  | "karbala";

export type Candidate = {
  id: string;
  name: string;
  governorate: GovernorateSlug;
  party: string;
  gender: "male" | "female";
  biography: string;
  priorities: string[];
  incumbent: boolean;
};

export const candidates: Candidate[] = [
  {
    id: "cand-001",
    name: "Layla al-Hassan",
    governorate: "baghdad",
    party: "Progressive Youth Coalition",
    gender: "female",
    biography:
      "Former civic activist focused on rebuilding neighborhood councils and boosting youth employment in Baghdad's densest districts.",
    priorities: [
      "Digitize municipal services",
      "Expand apprenticeships",
      "Create safe transit routes for students",
    ],
    incumbent: false,
  },
  {
    id: "cand-002",
    name: "Hassan al-Tamimi",
    governorate: "basra",
    party: "Basra Renewal Bloc",
    gender: "male",
    biography:
      "Energy engineer working with port authorities to modernize customs, reduce leakage, and reinvest revenues into coastal infrastructure.",
    priorities: [
      "Transparent oil revenue dashboards",
      "Port worker protections",
      "Water desalination partnerships",
    ],
    incumbent: true,
  },
  {
    id: "cand-003",
    name: "Ava Barzan",
    governorate: "erbil",
    party: "New Horizons Movement",
    gender: "female",
    biography:
      "Policy researcher championing bilingual education, cross-border trade, and startup incubators across the Kurdistan Region.",
    priorities: [
      "Launch multilingual school platform",
      "Simplify SME licensing",
      "Green tech investment fund",
    ],
    incumbent: false,
  },
  {
    id: "cand-004",
    name: "Sami al-Fayadh",
    governorate: "najaf",
    party: "Justice & Heritage Alliance",
    gender: "male",
    biography:
      "Community organizer preserving cultural heritage while advocating for transparent charitable trusts and tourism reinvestment.",
    priorities: [
      "Open trust registries",
      "Pilgrim services digitization",
      "Cultural heritage apprenticeships",
    ],
    incumbent: true,
  },
  {
    id: "cand-005",
    name: "Mira al-Jubouri",
    governorate: "ninawa",
    party: "Reconstruction Front",
    gender: "female",
    biography:
      "Urban planner leading Mosul's reconstruction hackathons, focused on resilient housing and inclusive community centers.",
    priorities: [
      "Rebuild resilient homes",
      "Support women-led cooperatives",
      "Launch open tender tracker",
    ],
    incumbent: false,
  },
  {
    id: "cand-006",
    name: "Omar al-Lami",
    governorate: "dhi-qar",
    party: "Southern Prosperity List",
    gender: "male",
    biography:
      "Economist partnering with marshland communities to expand agro-tourism, wetlands restoration, and climate adaptation funds.",
    priorities: [
      "Protect marshlands",
      "Community-owned solar programs",
      "Modernize agricultural cooperatives",
    ],
    incumbent: false,
  },
  {
    id: "cand-007",
    name: "Reem al-Khafaji",
    governorate: "maysan",
    party: "Future Cities Coalition",
    gender: "female",
    biography:
      "Civil engineer piloting smart drainage and public transport upgrades to ease flooding in Amarah districts.",
    priorities: [
      "Stormwater digitization",
      "Accessible transit corridors",
      "Youth engineering scholarships",
    ],
    incumbent: true,
  },
  {
    id: "cand-008",
    name: "Mustafa al-Hilli",
    governorate: "karbala",
    party: "Unity and Service Alliance",
    gender: "male",
    biography:
      "Technology entrepreneur building open-budget dashboards for municipal councils across the Karbala governorate.",
    priorities: [
      "Publish participatory budgets",
      "Upgrade emergency response tech",
      "Create digital literacy labs",
    ],
    incumbent: false,
  },
];

export const parties = Array.from(new Set(candidates.map((candidate) => candidate.party))).sort();

export const governorateSlugs = Array.from(
  new Set(candidates.map((candidate) => candidate.governorate)),
).sort();
