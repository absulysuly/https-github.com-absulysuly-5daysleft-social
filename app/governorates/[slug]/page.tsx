import Link from "next/link";
import { notFound } from "next/navigation";

import { candidates } from "@/data/candidates";
import { governorates, formatPopulation } from "@/data/governorates";

type GovernoratePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams(): GovernoratePageProps["params"][] {
  return governorates.map((governorate) => ({ slug: governorate.slug }));
}

export default function GovernoratePage({ params }: GovernoratePageProps): JSX.Element {
  const governorate = governorates.find((entry) => entry.slug === params.slug) ?? notFound();
  const localCandidates = candidates.filter((candidate) => candidate.governorate === governorate.slug);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3 text-balance">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-foreground/70">Governorate</p>
        <h1 className="text-3xl font-semibold text-neutral-50">{governorate.name}</h1>
        <p className="max-w-2xl text-sm text-neutral-400">{governorate.description}</p>
        <dl className="grid gap-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 text-sm text-neutral-300 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.35em] text-neutral-500">Population</dt>
            <dd>{formatPopulation(governorate.population)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.35em] text-neutral-500">Seats</dt>
            <dd>{governorate.seats}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.35em] text-neutral-500">Campaign focus</dt>
            <dd>Infrastructure, service delivery, and community resilience</dd>
          </div>
        </dl>
      </header>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-neutral-50">Candidates</h2>
          <p className="text-sm text-neutral-400">{localCandidates.length} candidates registered with Digital Diwan coverage.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {localCandidates.map((candidate) => (
            <article key={candidate.id} className="flex flex-col gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-5">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="rounded-full border border-brand/60 px-3 py-1 text-brand-foreground/80">{candidate.party}</span>
                <span>{candidate.incumbent ? "Incumbent" : "Challenger"}</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-50">{candidate.name}</h3>
              <p className="text-sm text-neutral-300">{candidate.biography}</p>
              <ul className="mt-auto flex flex-wrap gap-2 text-xs text-neutral-300">
                {candidate.priorities.map((priority) => (
                  <li key={priority} className="rounded-full bg-neutral-800/70 px-3 py-1">
                    {priority}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <Link href="/governorates" className="w-fit rounded-full border border-neutral-700 px-5 py-2 text-sm text-neutral-200 transition hover:border-brand hover:text-brand">
        Back to all governorates
      </Link>
    </div>
  );
}
