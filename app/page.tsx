import Link from "next/link";

import CreatorSpotlight from "@/components/CreatorSpotlight";
import { candidates } from "@/data/candidates";
import { governorates } from "@/data/governorates";
import { nationalStatistics, turnoutTrend } from "@/data/statistics";

const featuredCandidate = candidates[0];

export default function HomePage(): JSX.Element {
  return (
    <div className="flex flex-col gap-16">
      <header className="flex flex-col gap-5 text-balance">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-foreground/75">Iraqi Election Platform</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Real-time intelligence for Iraq&apos;s 2025 parliamentary election.
        </h1>
        <p className="max-w-3xl text-lg text-neutral-300">
          Explore every candidate, monitor governorate-level dynamics, and surface key metrics as Iraq prepares for its next
          parliamentary cycle. Digital Diwan brings together verified data, civic storytelling, and AI-assisted insights for voters
          and campaign teams.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/candidates"
            className="rounded-full bg-brand px-6 py-2 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/40 transition hover:bg-brand/90"
          >
            Browse candidates
          </Link>
          <Link
            href="/governorates"
            className="rounded-full border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-200 transition hover:border-brand hover:text-brand"
          >
            Governorate snapshots
          </Link>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-4">
        {nationalStatistics.map((statistic) => (
          <article
            key={statistic.label}
            className="flex flex-col gap-2 rounded-2xl border border-neutral-800/80 bg-neutral-900/60 p-6 shadow-inner shadow-black/10"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-brand-foreground/60">{statistic.label}</span>
            <p className="text-3xl font-semibold text-neutral-50">{statistic.value}</p>
            <p className="text-xs text-neutral-400">{statistic.caption}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-10 rounded-3xl border border-neutral-800/70 bg-neutral-900/40 p-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-foreground/70">Featured Candidate</span>
          <h2 className="text-3xl font-semibold text-neutral-50">{featuredCandidate.name}</h2>
          <p className="text-sm text-neutral-300">{featuredCandidate.biography}</p>
          <dl className="grid gap-4 text-sm text-neutral-300 md:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-neutral-500">Governorate</dt>
              <dd>{featuredCandidate.governorate.toUpperCase()}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-neutral-500">Party</dt>
              <dd>{featuredCandidate.party}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-neutral-500">Priorities</dt>
              <dd>{featuredCandidate.priorities.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-neutral-500">Status</dt>
              <dd>{featuredCandidate.incumbent ? "Incumbent" : "Challenger"}</dd>
            </div>
          </dl>
          <Link
            href={`/candidates?governorate=${featuredCandidate.governorate}`}
            className="w-fit rounded-full border border-brand/70 px-5 py-2 text-sm font-medium text-brand-foreground transition hover:bg-brand hover:text-neutral-950"
          >
            View governorate slate
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <CreatorSpotlight />
          <div className="rounded-2xl border border-brand/30 bg-brand/10 p-6">
            <h3 className="text-lg font-semibold text-brand-foreground">Projected Turnout</h3>
            <div className="mt-4 flex flex-col gap-3">
              {turnoutTrend.map((entry) => (
                <div key={entry.cycle} className="flex items-center justify-between text-sm text-neutral-300">
                  <span>{entry.cycle}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-neutral-800">
                      <div className="h-full bg-brand" style={{ width: `${entry.turnout}%` }} />
                    </div>
                    <span className="min-w-[3ch] text-right text-neutral-100">{entry.turnout}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-neutral-50">Governorate coverage</h2>
          <p className="max-w-3xl text-sm text-neutral-400">
            Our field network covers every province. Rapid situation reports feed into this platform to highlight voter concerns,
            campaign events, and data corrections.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {governorates.map((governorate) => (
            <Link
              key={governorate.slug}
              href={`/governorates/${governorate.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-5 transition hover:border-brand/60 hover:bg-neutral-900"
            >
              <span className="text-xs uppercase tracking-[0.35em] text-brand-foreground/70">{governorate.name}</span>
              <p className="text-sm text-neutral-300">{governorate.description}</p>
              <div className="mt-auto flex items-center justify-between text-xs text-neutral-500">
                <span>{governorate.seats} seats</span>
                <span>Population {new Intl.NumberFormat("en-US").format(governorate.population)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
