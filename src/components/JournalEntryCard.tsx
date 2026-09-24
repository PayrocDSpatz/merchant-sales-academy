import type { JournalEntry } from "@/lib/db";
import { modules } from "@/data/curriculum";

// One saved exercise (reflection, call plan or opener), shown on My progress
// and in the manager's view of a rep.

const s = (v: unknown) => (typeof v === "string" ? v : "");
type Block = { label: string; start: string; end: string; plan: string };

export function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  const d = entry.data;
  const module = modules.find((m) => m.slug === entry.moduleSlug);
  const when = entry.createdAt?.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) ?? "";
  const row = (label: string, text: string, quote = false) => text.trim() ? <div style={{ padding: "12px 0", borderTop: "1px solid var(--line)" }}><small style={{ fontWeight: 900, letterSpacing: ".1em", color: "var(--muted)" }}>{label}</small><p style={{ margin: "6px 0 0", lineHeight: 1.55, whiteSpace: "pre-line", ...(quote ? { fontFamily: "Georgia,serif", fontSize: 17 } : {}) }}>{quote ? `“${text}”` : text}</p></div> : null;

  return <article className="card" style={{ padding: "22px 26px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
      <div><b style={{ fontSize: 16 }}>{entry.title}</b><small style={{ display: "block", color: "var(--muted)", marginTop: 3 }}>Module {module?.id ?? "?"} · {when}</small></div>
      {s(d.verdictLabel) && <span style={{ fontSize: 12, fontWeight: 900, padding: "4px 10px", borderRadius: 20, background: "#edf0e9" }}>Coach: {s(d.verdictLabel)}</span>}
    </div>
    <div style={{ marginTop: 10 }}>
      {entry.type === "reflection" && <>
        {row("THE THOUGHT", s(d.thought))}
        {row("FACTS-ONLY REWRITE", s(d.rewrite))}
        {row("COACH'S TIGHTER VERSION", s(d.tighterVersion))}
        {row("ACTION FOR THE NEXT CALL", s(d.action))}
      </>}
      {entry.type === "call-plan" && <>
        {row("DAILY TARGET", `${s(d.dailyTarget)} dials from ${s(d.leadCount)} leads. ${s(d.targetReason)}`)}
        {Array.isArray(d.blocks) && row("CALL BLOCKS", (d.blocks as Block[]).map((b) => `${b.label} ${b.start}–${b.end}: ${b.plan}`).join("\n"))}
        {row("PRE-CALL ROUTINE", s(d.routine))}
        {row("LOGGING", s(d.logging))}
        {row("COACH: ONE CHANGE", s(d.oneChange))}
      </>}
      {entry.type === "opener" && <>
        {row("WHAT THEY NOTICED", s(d.observation))}
        {row("THEIR OPENER", s(d.opener), true)}
        {row("COACH'S TIGHTER VERSION", s(d.tighterOpener), true)}
        {row("COACH: ONE CHANGE", s(d.oneChange))}
      </>}
    </div>
  </article>;
}
