// Shared by the call simulator page and its two API routes: the transcript
// shape, the call times a rep can pick, and validation of what the browser
// sends, so a doctored transcript can't run a call past its limits.

export type Turn = { role: "merchant" | "rep"; speaker?: string; text: string };

export const CALL_TIMES = ["7:15 a.m.", "9:30 a.m.", "11:45 a.m.", "2:45 p.m.", "5:15 p.m."] as const;

export const MAX_REP_CHARS = 600;
export const MAX_TURNS = 40; // both sides together, about 20 lines from the rep

// Returns the cleaned transcript, or an error message to send back.
export function parseTranscript(value: unknown): { turns: Turn[] } | { error: string } {
  if (!Array.isArray(value)) return { error: "Missing transcript." };
  if (value.length > MAX_TURNS) return { error: "This call has gone on long enough. Hang up and get your feedback." };
  const turns: Turn[] = [];
  for (const [i, t] of value.entries()) {
    const role = t?.role;
    const text = typeof t?.text === "string" ? t.text.trim() : "";
    // The merchant answers the phone, then the two sides alternate.
    if (role !== (i % 2 === 0 ? "merchant" : "rep")) return { error: "Transcript is out of order." };
    if (!text) return { error: "Empty line in transcript." };
    if (role === "rep" && text.length > MAX_REP_CHARS) return { error: `Keep each line under ${MAX_REP_CHARS} characters.` };
    if (role === "merchant" && text.length > 2000) return { error: "Transcript is too long." };
    turns.push({ role, speaker: typeof t?.speaker === "string" ? t.speaker.slice(0, 80) : undefined, text });
  }
  return { turns };
}

export function formatTranscript(turns: Turn[]) {
  return turns.map((t) => `${t.role === "rep" ? "REP" : (t.speaker || "MERCHANT").toUpperCase()}: ${t.text}`).join("\n");
}
