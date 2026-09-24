"use client";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/components/AuthProvider";
import { LearnerReport } from "@/components/LearnerReport";

export default function Progress() {
  const { user } = useAuth();
  return <AppShell active="My progress"><div style={{ padding: "46px 4vw", maxWidth: 1100, margin: "auto" }}>
    <div className="eyebrow">My progress</div>
    <h1 className="display" style={{ fontSize: 38, margin: "14px 0 8px" }}>Consistency, made visible.</h1>
    <p style={{ color: "var(--muted)", margin: "0 0 28px" }}>Your manager sees the same numbers and journal entries.</p>
    {user && <LearnerReport uid={user.uid} />}
  </div></AppShell>;
}
