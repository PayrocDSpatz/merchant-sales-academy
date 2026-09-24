"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";
import { addActiveTime, isComplete, markComplete, markIncomplete, saveJournal, saveQuizResult, type JournalType } from "@/lib/db";

// Time tracking, completion, and saving practice work for the signed-in rep.

const TICK_MS = 5_000;
const IDLE_AFTER_MS = 2 * 60_000; // no input for 2 minutes = not training
const FLUSH_EVERY_S = 60;

// Whether the rep is actively training right now: the tab is visible and
// they've scrolled, typed, clicked or moved the mouse in the last 2 minutes,
// or the read-aloud audio is playing. Call the returned stop() to clean up.
function watchActivity() {
  let lastInput = Date.now();
  const onInput = () => { lastInput = Date.now(); };
  const events = ["mousemove", "keydown", "scroll", "click", "touchstart"] as const;
  events.forEach((e) => window.addEventListener(e, onInput, { passive: true }));
  return {
    isActive: () => document.visibilityState === "visible" && (document.body.dataset.readAloud === "1" || Date.now() - lastInput < IDLE_AFTER_MS),
    stop: () => events.forEach((e) => window.removeEventListener(e, onInput)),
  };
}

// Counts active seconds on a module page and writes them to Firestore about
// once a minute and whenever the tab is hidden or closed.
export function ModuleTimer({ moduleSlug }: { moduleSlug: string }) {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    const activity = watchActivity();
    let pending = 0;
    const flush = () => {
      if (pending <= 0) return;
      const s = pending;
      pending = 0;
      addActiveTime(user.uid, moduleSlug, s).catch(() => { pending += s; });
    };
    const tick = setInterval(() => {
      if (activity.isActive()) pending += TICK_MS / 1000;
      if (pending >= FLUSH_EVERY_S) flush();
    }, TICK_MS);
    const onHide = () => { if (document.visibilityState === "hidden") flush(); };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      clearInterval(tick);
      activity.stop();
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [user, moduleSlug]);
  return null;
}

// "Mark complete" at the bottom of a lesson. The lesson also completes on its
// own once the rep has reached the end (this button scrolled into view) and
// spent real active time on the page: half the lesson's listed minutes, at
// least 45 seconds. Unmarking turns auto-complete off for the rest of the visit.
export function MarkComplete({ moduleSlug, itemId, minutes }: { moduleSlug: string; itemId: string; minutes: number }) {
  const { user } = useAuth();
  const [done, setDone] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [auto, setAuto] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const autoOff = useRef(false);

  useEffect(() => {
    if (user) isComplete(user.uid, moduleSlug, itemId).then(setDone).catch(() => setDone(false));
  }, [user, moduleSlug, itemId]);

  useEffect(() => {
    if (!user || done !== false || autoOff.current || !ref.current) return;
    const needed = Math.max(45, minutes * 30);
    const activity = watchActivity();
    let active = 0;
    let reachedEnd = false;
    const seen = new IntersectionObserver(([e]) => { if (e.isIntersecting) reachedEnd = true; });
    seen.observe(ref.current);
    const tick = setInterval(() => {
      if (activity.isActive()) active += TICK_MS / 1000;
      if (reachedEnd && active >= needed && !autoOff.current) {
        clearInterval(tick);
        markComplete(user.uid, moduleSlug, itemId).then(() => { setDone(true); setAuto(true); }).catch(() => {});
      }
    }, TICK_MS);
    return () => { clearInterval(tick); seen.disconnect(); activity.stop(); };
  }, [user, done, moduleSlug, itemId, minutes]);

  if (!user || done === null) return null;
  const toggle = async () => {
    setBusy(true);
    try {
      if (done) { autoOff.current = true; await markIncomplete(user.uid, moduleSlug, itemId); }
      else await markComplete(user.uid, moduleSlug, itemId);
      setDone(!done);
      setAuto(false);
    } finally { setBusy(false); }
  };
  return <button ref={ref} className={done ? "btn btn-outline" : "btn btn-primary"} disabled={busy} onClick={() => void toggle()} style={{ alignSelf: "center" }} title={done ? "Click to mark this lesson as not complete" : undefined}>{done ? (auto ? "✓ Completed automatically" : "✓ Completed") : "Mark complete"}</button>;
}

// Saves a finished exercise to the rep's journal and marks it complete. Call
// from the exercise's finish screen; runs once per mount.
export function useSaveExercise(entry: { type: JournalType; moduleSlug: string; itemId: string; title: string; data: Record<string, unknown> }) {
  const { user } = useAuth();
  const saved = useRef(false);
  const [status, setStatus] = useState<"saving" | "saved" | "error">("saving");
  useEffect(() => {
    if (!user || saved.current) return;
    saved.current = true;
    const { itemId, ...journal } = entry;
    Promise.all([saveJournal(user.uid, journal), markComplete(user.uid, entry.moduleSlug, itemId)])
      .then(() => setStatus("saved"))
      .catch(() => setStatus("error"));
  }, [user, entry]);
  return status;
}

// Records a knowledge-check attempt; a pass also marks the quiz complete.
export function useSaveQuizResult(result: { moduleSlug: string; score: number; total: number; passed: boolean }) {
  const { user } = useAuth();
  const saved = useRef(false);
  useEffect(() => {
    if (!user || saved.current) return;
    saved.current = true;
    void saveQuizResult(user.uid, result).catch(() => {});
    if (result.passed) void markComplete(user.uid, result.moduleSlug, "knowledge-check").catch(() => {});
  }, [user, result]);
}

export function SavedNote({ status }: { status: "saving" | "saved" | "error" }) {
  const text = status === "saving" ? "Saving to your journal…" : status === "saved" ? "✓ Saved to your journal. Your manager can see it too." : "Couldn’t save to your journal. Download the PDF so you don’t lose it.";
  return <p style={{ fontSize: 13, margin: "12px 0 0", color: status === "error" ? "#a3320b" : "var(--muted)" }}>{text}</p>;
}
