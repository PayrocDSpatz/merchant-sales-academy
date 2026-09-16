import Link from "next/link";
import { Logo } from "./Logo";

export function PublicNav() {
  return (
    <header style={{ borderBottom: "1px solid var(--line)", background: "rgba(251,250,246,.94)", position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(12px)" }}>
      <div className="container" style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />
        <nav className="desktop-only" style={{ display: "flex", gap: 30, fontSize: 14, fontWeight: 700 }}>
          <Link href="#curriculum">Curriculum</Link><Link href="#how">How it works</Link><Link href="#teams">For teams</Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link className="desktop-only" href="/signin" style={{ fontSize: 14, fontWeight: 800, padding: 12 }}>Sign in</Link>
          <Link className="btn btn-primary" href="/register">Start training <span>→</span></Link>
        </div>
      </div>
    </header>
  );
}
