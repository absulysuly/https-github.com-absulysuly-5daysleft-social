import { NextResponse } from "next/server";

const FALLBACK_SPOTLIGHT = {
  quote:
    "Community-driven policy debates, AI-assisted briefs, and transparent funding dashboards keep voters engaged every step of the way.",
  creator: "Digital Diwan Outreach Team",
  handle: "@digitaldiwan",
} as const;

type Spotlight = typeof FALLBACK_SPOTLIGHT;

type GeminiCandidatePart = {
  text?: string;
};

type GeminiCandidateContent = {
  parts?: GeminiCandidatePart[];
};

type GeminiResponse = {
  candidates?: Array<{
    content?: GeminiCandidateContent;
  }>;
};

function parseSpotlightFromGemini(payload: GeminiResponse): Spotlight | null {
  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    return null;
  }

  try {
    const parsed = JSON.parse(text) as Partial<Spotlight>;
    if (
      typeof parsed.quote === "string" &&
      typeof parsed.creator === "string" &&
      typeof parsed.handle === "string"
    ) {
      return {
        quote: parsed.quote,
        creator: parsed.creator,
        handle: parsed.handle,
      };
    }
  } catch (error) {
    console.warn("Gemini payload was not valid JSON", error);
  }

  return null;
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ spotlight: FALLBACK_SPOTLIGHT });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { topic = "digital civic innovation" } = body as { topic?: string };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a short JSON object describing a creator spotlight for an Iraqi civic tech initiative about ${topic}. Use the format {"quote": string, "creator": string, "handle": string}.`,
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      console.warn("Gemini request failed", response.statusText);
      return NextResponse.json({ spotlight: FALLBACK_SPOTLIGHT });
    }

    const payload = (await response.json()) as GeminiResponse;
    const maybeSpotlight = parseSpotlightFromGemini(payload);

    if (!maybeSpotlight) {
      return NextResponse.json({ spotlight: FALLBACK_SPOTLIGHT });
    }

    return NextResponse.json({ spotlight: maybeSpotlight });
  } catch (error) {
    console.warn("Gemini request threw", error);
    return NextResponse.json({ spotlight: FALLBACK_SPOTLIGHT });
  }
}

export function GET(): Response {
  return NextResponse.json({ spotlight: FALLBACK_SPOTLIGHT });
}
