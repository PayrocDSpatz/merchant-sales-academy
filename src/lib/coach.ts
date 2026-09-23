import Anthropic from "@anthropic-ai/sdk";
import type { AutoParseableBetaOutputFormat } from "@anthropic-ai/sdk/lib/beta-parser";
import { NextResponse } from "next/server";

// Shared Claude call for the practice exercises' coach feedback: structured
// JSON output, server-side fallbacks, and error responses the practice pages
// can show as-is. Each API route supplies its own system prompt and schema.

type CoachRequest<T> = {
  system: string;
  content: string;
  format: AutoParseableBetaOutputFormat<T>;
};

export async function runCoach<T>({ system, content, format }: CoachRequest<T>) {
  // Trimmed because a key pasted into the Vercel dashboard can pick up
  // stray whitespace, which the API rejects as an invalid key.
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "AI feedback is not configured." }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });
  try {
    const response = await client.beta.messages.parse({
      model: "claude-opus-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium", format },
      system,
      messages: [{ role: "user", content }],
    });

    if (response.stop_reason === "refusal" || !response.parsed_output) {
      return NextResponse.json({ error: "Couldn't generate feedback for that response. Try rewording it." }, { status: 422 });
    }
    return NextResponse.json({ feedback: unescapeLiterals(response.parsed_output) });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "The coach is busy right now. Try again in a minute." }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error("coach API error", err.status, err.message);
      // Upstream status only (no message body) so a misconfigured key is
      // diagnosable from the browser without exposing anything sensitive.
      return NextResponse.json({ error: "AI feedback failed. Try again.", upstreamStatus: err.status ?? null }, { status: 502 });
    }
    throw err;
  }
}

// The model occasionally writes a character as a literal escape sequence
// (e.g. "\\u2014" instead of an em dash), which would show up on screen as-is.
function unescapeLiterals<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))) as T;
  }
  if (Array.isArray(value)) return value.map(unescapeLiterals) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, unescapeLiterals(v)])) as T;
  }
  return value;
}
