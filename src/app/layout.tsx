import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import "./globals.css";

// Display — athletic condensed, built for oversized statement headlines
// (Exaggerated Minimalism direction; overrides the Brief's Anton choice).
const display = Barlow_Condensed({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body — clean humanist sans
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// Numerals — tactile "gym timer" feel for pricing/stats
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.fitzonegym.com",
  ),
  title: "FitZone Gym — Get to Work",
  description:
    "A modern fitness center built for results. See membership plans, meet the trainers, tour the facilities, and start your free trial today.",
  keywords: [
    "gym",
    "fitness center",
    "personal training",
    "membership",
    "workout",
    "FitZone",
  ],
  openGraph: {
    title: "FitZone Gym — Get to Work",
    description:
      "A modern fitness center built for results. Start your free trial today.",
    type: "website",
    siteName: "FitZone Gym",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1120",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-volt focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
