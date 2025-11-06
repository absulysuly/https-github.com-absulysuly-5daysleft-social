// lib/api.ts
import type { Candidate } from "./types";

// This URL should be in a .env.local file as NEXT_PUBLIC_API_BASE_URL
// For this exercise, it's hardcoded as you've provided.
const API_BASE_URL = "https://hamlet-unified-complete-2027-production.up.railway.app";

type CandidatesResponse = {
  success: boolean;
  data: Candidate[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export async function getCandidates(page = 1, limit = 10): Promise<CandidatesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`${API_BASE_URL}/api/candidates?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch candidates from the backend.");
  }

  return response.json();
}
