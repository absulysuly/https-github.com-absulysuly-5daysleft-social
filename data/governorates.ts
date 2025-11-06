import type { GovernorateSlug } from "./candidates";

export type Governorate = {
  slug: GovernorateSlug;
  name: string;
  population: number;
  seats: number;
  description: string;
};

export const governorates: Governorate[] = [
  {
    slug: "baghdad",
    name: "Baghdad",
    population: 8200000,
    seats: 71,
    description:
      "Capital region with the largest electorate, balancing federal governance, municipal services, and rapid urban expansion.",
  },
  {
    slug: "basra",
    name: "Basra",
    population: 3200000,
    seats: 25,
    description:
      "Strategic port governorate anchoring Iraq's oil exports, focused on infrastructure resilience and equitable revenue sharing.",
  },
  {
    slug: "erbil",
    name: "Erbil",
    population: 1600000,
    seats: 16,
    description:
      "Economic hub of the Kurdistan Region with growing tech, tourism, and logistics corridors linking Iraq with regional markets.",
  },
  {
    slug: "najaf",
    name: "Najaf",
    population: 1400000,
    seats: 19,
    description:
      "Pilgrimage destination stewarding religious tourism, heritage preservation, and expanding public services for seasonal surges.",
  },
  {
    slug: "ninawa",
    name: "Nineveh",
    population: 3600000,
    seats: 34,
    description:
      "Post-conflict reconstruction center rebuilding Mosul's infrastructure, cultural districts, and rural economies with global aid.",
  },
  {
    slug: "dhi-qar",
    name: "Dhi Qar",
    population: 2100000,
    seats: 19,
    description:
      "Southern heartland balancing marshland preservation, agricultural cooperatives, and emerging renewable energy pilots.",
  },
  {
    slug: "maysan",
    name: "Maysan",
    population: 1100000,
    seats: 10,
    description:
      "Marshland governorate modernizing transport links and expanding public works to tackle seasonal flooding and unemployment.",
  },
  {
    slug: "karbala",
    name: "Karbala",
    population: 1300000,
    seats: 13,
    description:
      "Religious tourism hub strengthening social services, digital governance, and emergency response across urban and rural districts.",
  },
];

export function formatPopulation(population: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(population);
}
