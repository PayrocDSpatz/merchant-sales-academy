"use client";
import { useEffect, useState } from "react";
import { loadLearnerData, type LearnerData } from "@/lib/db";
import { bestQuizScores, formatDuration, moduleCompletion, openModules, overallCompletion, quizAverage, streak, totalSeconds } from "@/lib/stats";
import { modules } from "@/data/curriculum";
import { JournalEntryCard } from "./JournalEntryCard";

// Full progress report for one learner: headline numbers, time and completion
// by module, quiz attempts, and saved journal entries. Used on My progress
// (the rep's own) and on the manager's page for a rep.

export function LearnerReport({ uid }: { uid: string }) {
  const [data, setData] = useState<LearnerData | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => { loadLearnerData(uid).then(setData).catch(() => setError(true)); }, [uid]);

  if (error) return <p role="alert" style={{ color: "#a3320b" }}>Couldn’t load progress. Refresh to try again.</p>;
  if (!data) return <p style={{ color: "var(--muted)" }}>Loading…</p>;

  const overall = overallCompletion(data);
  const q = quizAverage(data);
  const best = bestQuizScores(data);
  const st = streak(data);
  const moduleTitle = (slug: string) => modules.find((m) => m.slug === slug)?.title ?? slug;

  return <>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 16 }}>
      {[[`${overall.pct}%`, `Complete (${overall.completed} of ${overall.total} items)`], [formatDuration(totalSeconds(data)), "Active training time"], [String(st), "Day streak"], [q === null ? "–" : `${q}%`, "Knowledge-check average"]].map(([v, l]) =>
        <div className="card" key={l} style={{ padding: 24 }}><b style={{ fontFamily: "Georgia,serif", fontSize: 38 }}>{v}</b><span style={{ display: "block", color: "var(--muted)", marginTop: 7, fontSize: 14 }}>{l}</span></div>)}
    </div>

    <section className="card" style={{ padding: 30, marginTop: 20 }}>
      <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginTop: 0 }}>By module</h2>
      <div style={{ overflowX: "auto" }}><div style={{ minWidth: 620 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 90px 1fr 110px 110px", gap: 18, fontSize: 11, fontWeight: 900, letterSpacing: ".08em", color: "var(--muted)", paddingBottom: 10 }}><span>MODULE</span><span>DONE</span><span>PROGRESS</span><span>TIME</span><span>BEST QUIZ</span></div>
        {openModules().map((m) => {
          const c = moduleCompletion(m, data); const b = best[m.slug];
          return <div key={m.slug} style={{ display: "grid", gridTemplateColumns: "1.6fr 90px 1fr 110px 110px", gap: 18, alignItems: "center", padding: "16px 0", borderTop: "1px solid var(--line)" }}>
            <b>{m.id}. {m.title}</b>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>{c.completed} of {c.total}</span>
            <div className="progress"><span style={{ width: `${c.pct}%` }} /></div>
            <span style={{ fontSize: 14 }}>{formatDuration(data.moduleTime[m.slug] ?? 0)}</span>
            <span style={{ fontSize: 14, color: b ? (b.passed ? "var(--green)" : "#a3320b") : "var(--muted)" }}>{b ? `${b.score}/${b.total}${b.passed ? " ✓" : ""}` : "–"}</span>
          </div>;
        })}
      </div></div>
    </section>

    {data.quizResults.length > 0 && <section className="card" style={{ padding: 30, marginTop: 20 }}>
      <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginTop: 0 }}>Knowledge-check attempts</h2>
      {data.quizResults.map((r) => <div key={r.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 0", borderTop: "1px solid var(--line)", fontSize: 14 }}>
        <span>{moduleTitle(r.moduleSlug)}</span>
        <span><b style={{ color: r.passed ? "var(--green)" : "#a3320b" }}>{r.score}/{r.total} {r.passed ? "passed" : "not passed"}</b><span style={{ color: "var(--muted)" }}> · {r.createdAt?.toLocaleDateString(undefined, { month: "short", day: "numeric" }) ?? ""}</span></span>
      </div>)}
    </section>}

    <section style={{ marginTop: 28 }}>
      <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, margin: "0 0 14px" }}>Journal</h2>
      {data.journal.length === 0 ? <p style={{ color: "var(--muted)" }}>No saved exercises yet. Reflections, call plans and openers show up here once they&apos;re saved.</p>
        : <div style={{ display: "grid", gap: 14 }}>{data.journal.map((e) => <JournalEntryCard key={e.id} entry={e} />)}</div>}
    </section>
  </>;
}
