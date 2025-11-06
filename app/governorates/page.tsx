import Link from "next/link";

import { governorates, formatPopulation } from "@/data/governorates";

export default function GovernoratesPage(): JSX.Element {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3 text-balance">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-foreground/70">Governorates</p>
        <h1 className="text-3xl font-semibold text-neutral-50">Provincial intelligence</h1>
        <p className="max-w-2xl text-sm text-neutral-400">
          Compare demographic indicators, seat allocations, and context briefs across Iraq&apos;s 18 governorates. Each profile links
          to candidate slates and the latest updates from our field network.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {governorates.map((governorate) => (
          <Link
            key={governorate.slug}
            href={`/governorates/${governorate.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-6 transition hover:border-brand/60 hover:bg-neutral-900"
          >
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="rounded-full border border-brand/60 px-3 py-1 text-brand-foreground/80">{governorate.slug.toUpperCase()}</span>
              <span>{governorate.seats} seats</span>
            </div>
            <h2 className="text-xl font-semibold text-neutral-50">{governorate.name}</h2>
            <p className="text-sm text-neutral-300">{governorate.description}</p>
            <p className="mt-auto text-xs text-neutral-500">Population • {formatPopulation(governorate.population)}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
