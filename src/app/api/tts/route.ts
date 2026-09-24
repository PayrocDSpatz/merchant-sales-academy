import { NextRequest, NextResponse } from "next/server";
import { guardPaidRoute } from "@/lib/apiGuard";

// Google's newest, most natural-sounding voice line. Falls back to a widely
// available Neural2 voice if Chirp3-HD isn't enabled for this project/key.
const PRIMARY_VOICE = "en-US-Chirp3-HD-Charon";
const FALLBACK_VOICE = "en-US-Neural2-D";

async function synthesize(text: string, voiceName: string, apiKey: string) {
  return fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: "en-US", name: voiceName },
      audioConfig: { audioEncoding: "MP3", speakingRate: 1.0 },
    }),
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Text-to-speech is not configured." }, { status: 500 });
  }

  const { text } = await req.json();
  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Missing text." }, { status: 400 });
  }
  // Google's synthesize endpoint caps input at 5000 bytes.
  const blocked = await guardPaidRoute(req, "tts");
  if (blocked) return blocked;

  const trimmed = text.slice(0, 4800);

  let res = await synthesize(trimmed, PRIMARY_VOICE, apiKey);
  if (!res.ok) {
    // Chirp3-HD may not be enabled on every project yet - retry with a
    // broadly available voice instead of failing the whole request.
    res = await synthesize(trimmed, FALLBACK_VOICE, apiKey);
  }

  if (!res.ok) {
    const errText = await res.text();
    return NextResponse.json({ error: "Text-to-speech request failed.", detail: errText }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json({ audioContent: data.audioContent as string });
}
