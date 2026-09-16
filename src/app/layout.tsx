import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merchant Sales Academy | Make the Call",
  description: "Cold-calling training built for merchant-services sales professionals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
