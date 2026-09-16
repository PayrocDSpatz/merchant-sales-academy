import { Resend } from "resend";

export function getEmailClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

export const emailFrom = process.env.RESEND_FROM_EMAIL ?? "training@example.com";
