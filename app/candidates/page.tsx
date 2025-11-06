"use client";

import { useState, useEffect, type FC } from "react";
import { getCandidates } from "@/lib/api";
import type { Candidate } from "@/lib/types";

// FIX: Explicitly type CandidateCard as a React.FC to resolve incorrect 'key' prop error.
const CandidateCard: FC<{ candidate: Candidate }> = ({ candidate }) => (
  <article className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-inner shadow-black/10 transition hover:border-brand/50">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 text-xl font-bold text-white">
        {candidate.fullNameArabic.charAt(0)}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-neutral-50">{candidate.fullNameArabic}</h2>
        <p className="text-sm text-neutral-400">{candidate.partyNameArabic}</p>
      </div>
    </div>
    <div className="mt-2 flex justify-between text-xs font-medium uppercase tracking-widest text-neutral-500">
      <span>{candidate.governorate}</span>
      <span>Ballot #: {candidate.ballotNumber}</span>
    </div>
  </article>
);


export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getCandidates(page);
        setCandidates(response.data);
        setTotalPages(response.pagination.pages);
      } catch (e) {
        setError("Failed to load candidates. The backend might be offline.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [page]);

  const handlePrevPage = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header>
        <h1 className="text-4xl font-semibold sm:text-5xl">Election Candidates</h1>
        <p className="mt-2 max-w-2xl text-lg text-neutral-400">
          Browse the official list of candidates from our live database.
        </p>
      </header>

      {isLoading && <p className="text-center text-neutral-400">Loading candidates...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      
      {!isLoading && !error && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {candidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="rounded-full border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-200 transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-neutral-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="rounded-full border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-200 transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}