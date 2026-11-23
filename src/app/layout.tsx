import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Growth Studio — Marketing Intelligence",
  description: "One workspace for campaign strategy, brand identity, sales intelligence and SEO/AEO insights.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
