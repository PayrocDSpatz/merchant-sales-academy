"use client";
import { useEffect, useRef, useState } from "react";

// Ranked by how natural they tend to sound. Network voices (Google, Microsoft
// Online/Natural) use neural synthesis and sound far less robotic than the
// default local SAPI voices (Microsoft David/Zira/Mark) most browsers pick first.
const PREFERRED_VOICE_NAMES = [
  "Google US English",
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Jenny Online (Natural) - English (United States)",
  "Microsoft Guy Online (Natural) - English (United States)",
  "Google UK English Female",
];

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  for (const name of PREFERRED_VOICE_NAMES) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }
  // Next best: any non-local (network/neural) English voice.
  const anyNetworkEnglish = voices.find((v) => !v.localService && v.lang.startsWith("en"));
  if (anyNetworkEnglish) return anyNetworkEnglish;
  // Fall back to whatever English voice the browser offers.
  return voices.find((v) => v.lang.startsWith("en")) ?? voices[0] ?? null;
}

export function ReadAloud({ targetId }: { targetId: string }) {
  const [state, setState] = useState<"idle" | "speaking" | "paused">("idle");
  const [supported, setSupported] = useState(true);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const ok = typeof window !== "undefined" && "speechSynthesis" in window;
    setSupported(ok);
    if (!ok) return;

    function loadVoice() {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) voiceRef.current = pickBestVoice(voices);
    }
    loadVoice();
    window.speechSynthesis.onvoiceschanged = loadVoice;

    return () => { window.speechSynthesis.cancel(); };
  }, []);

  function start() {
    const el = document.getElementById(targetId);
    const text = el?.innerText?.trim();
    if (!text) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) utter.voice = voiceRef.current;
    utter.rate = 1.02;
    utter.pitch = 1;
    utter.onend = () => setState("idle");
    utter.onerror = () => setState("idle");
    window.speechSynthesis.speak(utter);
    setState("speaking");
  }

  function togglePause() {
    if (state === "speaking") { window.speechSynthesis.pause(); setState("paused"); }
    else if (state === "paused") { window.speechSynthesis.resume(); setState("speaking"); }
  }

  function stop() {
    window.speechSynthesis.cancel();
    setState("idle");
  }

  if (!supported) return null;

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 28 }}>
      {state === "idle"
        ? <button type="button" className="btn btn-outline" onClick={start}>🔊 Read this lesson aloud</button>
        : <>
            <button type="button" className="btn btn-outline" onClick={togglePause}>{state === "speaking" ? "⏸ Pause" : "▶ Resume"}</button>
            <button type="button" className="btn btn-outline" onClick={stop}>⏹ Stop</button>
          </>
      }
    </div>
  );
}
