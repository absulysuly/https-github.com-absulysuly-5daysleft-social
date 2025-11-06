export type Statistic = {
  label: string;
  value: string;
  caption: string;
};

export const nationalStatistics: Statistic[] = [
  {
    label: "Registered Voters",
    value: "26.4M",
    caption: "Latest IEC roll updated October 2025",
  },
  {
    label: "Governorates",
    value: "18",
    caption: "Represented across 83 multi-member districts",
  },
  {
    label: "Parties",
    value: "265",
    caption: "Certified alliances & independent lists",
  },
  {
    label: "Women Candidates",
    value: "34%",
    caption: "Exceeding the mandated quota for the third cycle",
  },
];

export const turnoutTrend = [
  { cycle: "2014", turnout: 60 },
  { cycle: "2018", turnout: 44 },
  { cycle: "2021", turnout: 41 },
  { cycle: "2025 (proj)", turnout: 52 },
];
