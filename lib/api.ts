// lib/api.ts
import type { Candidate, Post } from "./types";

// Use the environment variable for the API base URL.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// == Candidate Endpoints ==

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
    // In a real app, you might want to parse the error response body
    throw new Error("Failed to fetch candidates from the backend.");
  }

  return response.json();
}

// == Post Endpoints ==

type PostsResponse = {
  success: boolean;
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export async function getPosts(page = 1, limit = 10): Promise<PostsResponse> {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured.");
  }
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  const response = await fetch(`${API_BASE_URL}/api/posts?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts from the backend.");
  }
  return response.json();
}

export async function createPost(content: string): Promise<{ success: boolean; data: Post }> {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured.");
  }
  const response = await fetch(`${API_BASE_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    throw new Error("Failed to create post.");
  }
  return response.json();
}

export async function likePost(postId: string): Promise<{ success: boolean; data: { likesCount: number } }> {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured.");
  }
  const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to like post.");
  }
  return response.json();
}
