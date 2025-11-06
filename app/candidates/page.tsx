import Link from "next/link";

import { candidates, governorateSlugs, parties } from "@/data/candidates";

type CandidatesPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

type FilterState = {
  search?: string;
  governorate?: string;
  party?: string;
  gender?: string;
  incumbent?: string;
};

function normalizeFilters(searchParams: CandidatesPageProps["searchParams"]): FilterState {
  if (!searchParams) {
    return {};
  }

  const entries: FilterState = {};

  if (typeof searchParams.search === "string") {
    entries.search = searchParams.search.trim();
  }
  if (typeof searchParams.governorate === "string") {
    entries.governorate = searchParams.governorate;
  }
  if (typeof searchParams.party === "string") {
    entries.party = searchParams.party;
  }
  if (typeof searchParams.gender === "string") {
    entries.gender = searchParams.gender;
  }
  if (typeof searchParams.incumbent === "string") {
    entries.incumbent = searchParams.incumbent;
  }

  return entries;
}

function filterCandidates(filters: FilterState) {
  const searchValue = filters.search?.toLowerCase();

  return candidates.filter((candidate) => {
    if (searchValue) {
      const haystack = `${candidate.name} ${candidate.party} ${candidate.biography}`.toLowerCase();
      if (!haystack.includes(searchValue)) {
        return false;
      }
    }

    if (filters.governorate && candidate.governorate !== filters.governorate) {
      return false;
    }

    if (filters.party && candidate.party !== filters.party) {
      return false;
    }

    if (filters.gender && candidate.gender !== filters.gender) {
      return false;
    }

    if (filters.incumbent) {
      const isIncumbent = filters.incumbent === "true";
      if (candidate.incumbent !== isIncumbent) {
        return false;
      }
    }

    return true;
  });
}

export default function CandidatesPage({ searchParams }: CandidatesPageProps): JSX.Element {
  const filters = normalizeFilters(searchParams);
  const filtered = filterCandidates(filters);

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3 text-balance">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-foreground/70">Candidates</p>
        <h1 className="text-3xl font-semibold text-neutral-50">Explore parliamentary hopefuls</h1>
        <p className="max-w-2xl text-sm text-neutral-400">
          Filter by governorate, party, gender, or incumbency status. Each profile highlights key priorities and civic
          experience as reported by our field researchers.
        </p>
      </header>

      <section className="flex flex-col gap-6 rounded-3xl border border-neutral-800/70 bg-neutral-900/40 p-6">
        <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <label className="flex flex-col gap-2 text-sm text-neutral-300">
            Search
            <input
              key={filters.search ?? "search"}
              defaultValue={filters.search ?? ""}
              type="search"
              name="search"
              className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-brand"
              placeholder="Candidate name or priority"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-neutral-300">
            Governorate
            <select
              name="governorate"
              defaultValue={filters.governorate ?? ""}
              className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-brand"
            >
              <option value="">All governorates</option>
              {governorateSlugs.map((slug) => (
                <option key={slug} value={slug}>
                  {slug.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-neutral-300">
            Party
            <select
              name="party"
              defaultValue={filters.party ?? ""}
              className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-brand"
            >
              <option value="">All parties</option>
              {parties.map((party) => (
                <option key={party} value={party}>
                  {party}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-neutral-300">
            Gender
            <select
              name="gender"
              defaultValue={filters.gender ?? ""}
              className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-brand"
            >
              <option value="">Any</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-neutral-300">
            Incumbency
            <select
              name="incumbent"
              defaultValue={filters.incumbent ?? ""}
              className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-brand"
            >
              <option value="">All</option>
              <option value="true">Incumbents</option>
              <option value="false">Challengers</option>
            </select>
          </label>
          <div className="flex items-end gap-3">
            <button
              type="submit"
              className="h-11 rounded-full bg-brand px-5 text-sm font-medium text-brand-foreground transition hover:bg-brand/90"
            >
              Apply filters
            </button>
            <Link
              href="/candidates"
              className="h-11 rounded-full border border-neutral-700 px-5 text-sm font-medium text-neutral-200 transition hover:border-brand hover:text-brand"
            >
              Reset
            </Link>
          </div>
        </form>
        <p className="text-xs text-neutral-500">Showing {filtered.length} of {candidates.length} profiles.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((candidate) => (
          <article
            key={candidate.id}
            className="flex h-full flex-col gap-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-5"
          >
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="rounded-full border border-brand/60 px-3 py-1 text-brand-foreground/80">
                {candidate.governorate.toUpperCase()}
              </span>
              <span>{candidate.incumbent ? "Incumbent" : "Challenger"}</span>
            </div>
            <h2 className="text-xl font-semibold text-neutral-50">{candidate.name}</h2>
            <p className="text-sm text-neutral-300">{candidate.biography}</p>
            <div className="mt-auto flex flex-wrap gap-2 text-xs text-neutral-300">
              {candidate.priorities.map((priority) => (
                <span key={priority} className="rounded-full bg-neutral-800/70 px-3 py-1">
                  {priority}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-neutral-800/80 bg-neutral-950/80 p-8 text-center text-sm text-neutral-400">
          No candidates match the selected filters yet. Try expanding your search criteria.
        </p>
      ) : null}
    </div>
  );
}
