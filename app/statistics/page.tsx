import { nationalStatistics, turnoutTrend } from "@/data/statistics";

const policyHighlights = [
  {
    title: "Election logistics",
    description: "New biometric voter cards are live across 92% of polling centers with backup paper registries for remote districts.",
  },
  {
    title: "Transparency",
    description: "Public finance observatories now publish weekly dashboards on campaign spending and donation disclosures.",
  },
  {
    title: "Inclusion",
    description: "Women-led coalitions increased by 12% compared to 2021, with targeted support for youth and displaced voters.",
  },
];

export default function StatisticsPage(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3 text-balance">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-foreground/70">Statistics</p>
        <h1 className="text-3xl font-semibold text-neutral-50">National metrics & trendlines</h1>
        <p className="max-w-3xl text-sm text-neutral-400">
          Digital Diwan aggregates trusted sources into a single dashboard. Monitor voter turnout projections, demographic shifts,
          and policy priorities shaping Iraq&apos;s parliamentary race.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        {nationalStatistics.map((statistic) => (
          <article
            key={statistic.label}
            className="flex flex-col gap-2 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-6 shadow-inner shadow-black/10"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-brand-foreground/60">{statistic.label}</span>
            <p className="text-3xl font-semibold text-neutral-50">{statistic.value}</p>
            <p className="text-xs text-neutral-400">{statistic.caption}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-8">
        <h2 className="text-2xl font-semibold text-neutral-50">Turnout recovery outlook</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Field surveys and IEC simulations suggest turnout could rebound to above 50% with credible reforms, transparent results
          publishing, and expanded early voting pilots.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {turnoutTrend.map((entry) => (
            <div key={entry.cycle} className="flex items-center gap-4 text-sm text-neutral-300">
              <span className="w-24 text-neutral-400">{entry.cycle}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-800">
                <div className="h-full rounded-full bg-brand" style={{ width: `${entry.turnout}%` }} />
              </div>
              <span className="min-w-[4ch] text-right text-neutral-100">{entry.turnout}%</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {policyHighlights.map((highlight) => (
          <article key={highlight.title} className="flex flex-col gap-3 rounded-2xl border border-brand/20 bg-brand/5 p-6">
            <h3 className="text-lg font-semibold text-brand-foreground">{highlight.title}</h3>
            <p className="text-sm text-neutral-200">{highlight.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
