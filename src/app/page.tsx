import Link from "next/link";
import { PublicNav } from "@/components/PublicNav";
import { modules } from "@/data/curriculum";

export default function Home() {
  return <>
    <PublicNav />
    <section style={{ overflow: "hidden", borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1.08fr .92fr", minHeight: 670, alignItems: "center", gap: 50 }}>
        <div style={{ padding: "72px 0" }}>
          <div className="eyebrow">Cold-calling confidence for merchant services</div>
          <h1 className="display" style={{ fontSize: "clamp(58px, 7vw, 100px)", margin: "24px 0 28px", maxWidth: 800 }}>Make the call.<br/><em style={{ color: "var(--green)", fontWeight: 400 }}>Own the room.</em></h1>
          <p style={{ fontSize: 20, lineHeight: 1.55, color: "var(--muted)", maxWidth: 620, margin: "0 0 32px" }}>Practical training that helps merchant-services salespeople overcome call reluctance, handle real objections, and consistently book qualified appointments.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><Link className="btn btn-primary" href="/register">Start your training →</Link><Link className="btn btn-outline" href="#curriculum">Explore curriculum</Link></div>
          <div style={{ display: "flex", gap: 30, marginTop: 38, fontSize: 13, fontWeight: 750, color: "var(--muted)", flexWrap: "wrap" }}><span>✓ Built for merchant services</span><span>✓ Practical call exercises</span><span>✓ Manager visibility</span></div>
        </div>
        <div className="desktop-only" style={{ position: "relative", height: 590 }}>
          <div className="dot-grid" style={{ position: "absolute", inset: "45px 0 20px 30px", borderRadius: 32, backgroundColor: "var(--green)" }} />
          <div className="card" style={{ position: "absolute", width: "78%", left: 0, top: 105, padding: 28, transform: "rotate(-3deg)" }}>
            <div className="eyebrow">Today&apos;s call block</div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 32, margin: "12px 0 24px" }}>Your confidence is built<br/>one dial at a time.</h3>
            <div style={{ display: "grid", gap: 14 }}>{[["Calls made","18 / 25"],["Conversations","6"],["Appointments","2"]].map(x=><div key={x[0]} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 13, borderBottom: "1px solid var(--line)", fontWeight: 800 }}><span style={{ color: "var(--muted)", fontWeight: 600 }}>{x[0]}</span>{x[1]}</div>)}</div>
          </div>
          <div style={{ position: "absolute", right: -20, bottom: 65, width: 225, background: "var(--lime)", borderRadius: 18, padding: 22, transform: "rotate(4deg)", boxShadow: "0 18px 50px rgba(0,0,0,.18)" }}><div style={{ fontSize: 34 }}>↗</div><b style={{ display: "block", fontSize: 18, marginTop: 18 }}>Rejection is data.</b><span style={{ fontSize: 13, lineHeight: 1.45, display: "block", marginTop: 7 }}>It is not a verdict on your ability.</span></div>
        </div>
      </div>
    </section>
    <section id="how" style={{ background: "var(--ink)", color: "white", padding: "82px 0" }}><div className="container"><div className="eyebrow" style={{ color: "var(--lime)" }}>A better way to get call-ready</div><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, marginTop: 30 }}>{[["01","Learn","Short lessons explain the psychology and mechanics behind effective outbound calls."],["02","Practice","Apply each skill through realistic prompts, objection drills, and guided call planning."],["03","Perform","Track activity, build consistency, and turn conversations into qualified appointments."]].map(x=><div key={x[0]} style={{ borderTop: "1px solid #44605a", paddingTop: 24 }}><span style={{ color: "var(--lime)", fontWeight: 900 }}>{x[0]}</span><h3 style={{ fontFamily: "Georgia,serif", fontSize: 32, margin: "30px 0 14px" }}>{x[1]}</h3><p style={{ color: "#b8c7c3", lineHeight: 1.65 }}>{x[2]}</p></div>)}</div></div></section>
    <section id="curriculum" style={{ padding: "100px 0" }}><div className="container"><div style={{ maxWidth: 680 }}><div className="eyebrow">The curriculum</div><h2 className="display" style={{ fontSize: 62, margin: "18px 0" }}>From hesitation to consistency.</h2><p style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.6 }}>Twelve focused modules built around the real moments that determine whether a merchant-services call moves forward.</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14, marginTop: 45 }}>{modules.slice(0,6).map(m=><div className="card" key={m.id} style={{ padding: 24, display: "flex", gap: 18 }}><span style={{ width: 42, height: 42, flex: "0 0 auto", borderRadius: 12, background: m.id===1?"var(--lime)":"#edf0e9", display: "grid", placeItems: "center", fontWeight: 900 }}>{String(m.id).padStart(2,"0")}</span><div><h3 style={{ margin: "2px 0 9px", fontSize: 18 }}>{m.title}</h3><p style={{ margin: 0, color: "var(--muted)", fontSize: 14, lineHeight: 1.5 }}>{m.description}</p></div></div>)}</div></div></section>
    <section id="teams" style={{ padding: "0 0 100px" }}><div className="container" style={{ background: "var(--green)", color: "white", padding: "65px", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30 }}><div><div className="eyebrow" style={{ color: "var(--lime)" }}>For sales leaders</div><h2 className="display" style={{ fontSize: 52, margin: "15px 0" }}>Build a team that makes the call.</h2><p style={{ color: "#cfe0db", maxWidth: 620, lineHeight: 1.6 }}>Give every rep a clear training path while managers see progress, knowledge-check results, and practice activity.</p></div><Link className="btn btn-lime" href="/manager">View manager dashboard →</Link></div></section>
    <footer style={{ padding: "30px 0", borderTop: "1px solid var(--line)" }}><div className="container" style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted)" }}><b>Merchant Sales Academy</b><span>Built for the people who make the call.</span></div></footer>
  </>;
}
