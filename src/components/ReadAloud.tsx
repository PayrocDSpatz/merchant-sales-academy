"use client";
import { useEffect, useState } from "react";

export function ReadAloud({ targetId }: { targetId: string }) {
  const [state, setState] = useState<"idle" | "speaking" | "paused">("idle");
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => { if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel(); };
  }, []);

  function start() {
    const el = document.getElementById(targetId);
    const text = el?.innerText?.trim();
    if (!text) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.98;
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
