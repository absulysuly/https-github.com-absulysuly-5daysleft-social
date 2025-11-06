"use client";

import { useEffect, useMemo, useState } from "react";

type Spotlight = {
  quote: string;
  creator: string;
  handle: string;
};

type SpotlightResponse = {
  text?: string;
  spotlight?: Spotlight;
};

const FALLBACK_SPOTLIGHT: Spotlight = {
  quote:
    "I’ve never felt more supported leading up to a launch. The countdown keeps the hype alive, and the community keeps me accountable.",
  creator: "Futurewave",
  handle: "@futurewave",
};

function isSpotlight(value: unknown): value is Spotlight {
  if (!value || typeof value !== "object") {
    return false;
  }

  const maybeSpotlight = value as Partial<Spotlight>;

  return (
    typeof maybeSpotlight.quote === "string" &&
    typeof maybeSpotlight.creator === "string" &&
    typeof maybeSpotlight.handle === "string"
  );
}

function parseSpotlight(response: SpotlightResponse): Spotlight {
  if (response.spotlight && isSpotlight(response.spotlight)) {
    return response.spotlight;
  }

  if (typeof response.text === "string") {
    const jsonString = response.text.trim();

    if (jsonString) {
      try {
        const parsed = JSON.parse(jsonString);

        if (isSpotlight(parsed)) {
          return parsed;
        }
      } catch (error) {
        console.error("Failed to parse spotlight payload", error);
      }
    }
  }

  throw new Error("Spotlight payload was not in a recognized format");
}

async function fetchCreatorSpotlight(signal: AbortSignal): Promise<Spotlight> {
  try {
    const response = await fetch("/api/creator-spotlight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as SpotlightResponse;

    return parseSpotlight(payload);
  } catch (error) {
    if ((error as Error).name !== "AbortError") {
      console.warn("Falling back to static spotlight", error);
    }

    return FALLBACK_SPOTLIGHT;
  }
}

export default function CreatorSpotlight(): JSX.Element {
  const [spotlight, setSpotlight] = useState<Spotlight>(FALLBACK_SPOTLIGHT);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    void fetchCreatorSpotlight(controller.signal)
      .then((value) => {
        setSpotlight(value);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const title = useMemo(
    () => (isLoading ? "Generating creator spotlight" : "Creator spotlight"),
    [isLoading],
  );

  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-dashed border-brand/40 bg-brand/5 p-8 text-neutral-200">
      <h2 className="text-2xl font-semibold text-brand-foreground">{title}</h2>
      <p className="max-w-2xl text-sm text-neutral-300">{spotlight.quote}</p>
      <span className="text-xs uppercase tracking-[0.35em] text-brand-foreground/70">
        — {spotlight.handle}
      </span>
      <span className="text-xs text-neutral-400">{spotlight.creator}</span>
    </section>
  );
}
