// lib/api.ts
import type { Candidate } from "./types";

// Use the environment variable for the API base URL.
// This is a more robust and secure approach than hardcoding.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured. Please check your environment variables.");
  }

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
