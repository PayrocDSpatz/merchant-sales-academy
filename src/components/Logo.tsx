import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 11, color: light ? "white" : "var(--ink)" }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--lime)", display: "grid", placeItems: "center", color: "var(--ink)", fontWeight: 900 }}>M</span>
      <span style={{ fontWeight: 900, lineHeight: .92, letterSpacing: "-.03em" }}>MERCHANT SALES<br/><span style={{ fontSize: 10, letterSpacing: ".18em", color: light ? "#b8cbc4" : "var(--green)" }}>ACADEMY</span></span>
    </Link>
  );
}
