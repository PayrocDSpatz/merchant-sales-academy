"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";
import { addActiveTime, isComplete, markComplete, markIncomplete, saveJournal, saveQuizResult, type JournalType } from "@/lib/db";

// Time tracking, completion, and saving practice work for the signed-in rep.

const TICK_MS = 5_000;
const IDLE_AFTER_MS = 2 * 60_000; // no input for 2 minutes = not training
const FLUSH_EVERY_S = 60;

// Counts active seconds on a module page: the tab must be visible and the rep
// must have scrolled, typed, clicked or moved the mouse in the last 2 minutes
// (or be listening to the read-aloud audio). Written to Firestore about once
// a minute and whenever the tab is hidden or closed.
export function ModuleTimer({ moduleSlug }: { moduleSlug: string }) {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    let lastInput = Date.now();
    let pending = 0;
    const onInput = () => { lastInput = Date.now(); };
    const flush = () => {
      if (pending <= 0) return;
      const s = pending;
      pending = 0;
      addActiveTime(user.uid, moduleSlug, s).catch(() => { pending += s; });
    };
    const tick = setInterval(() => {
      const listening = document.body.dataset.readAloud === "1";
      if (document.visibilityState === "visible" && (listening || Date.now() - lastInput < IDLE_AFTER_MS)) pending += TICK_MS / 1000;
      if (pending >= FLUSH_EVERY_S) flush();
    }, TICK_MS);
    const onHide = () => { if (document.visibilityState === "hidden") flush(); };
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, onInput, { passive: true }));
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      clearInterval(tick);
      events.forEach((e) => window.removeEventListener(e, onInput));
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [user, moduleSlug]);
  return null;
}

// "Mark complete" toggle at the bottom of a lesson.
export function MarkComplete({ moduleSlug, itemId }: { moduleSlug: string; itemId: string }) {
  const { user } = useAuth();
  const [done, setDone] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (user) isComplete(user.uid, moduleSlug, itemId).then(setDone).catch(() => setDone(false));
  }, [user, moduleSlug, itemId]);
  if (!user || done === null) return null;
  const toggle = async () => {
    setBusy(true);
    try {
      if (done) await markIncomplete(user.uid, moduleSlug, itemId);
      else await markComplete(user.uid, moduleSlug, itemId);
      setDone(!done);
    } finally { setBusy(false); }
  };
  return <button className={done ? "btn btn-outline" : "btn btn-primary"} disabled={busy} onClick={() => void toggle()} style={{ alignSelf: "center" }}>{done ? "✓ Completed" : "Mark complete"}</button>;
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
