import type { Config } from "tailwindcss";

/**
 * FitZone Gym design tokens — encoded directly from UI/UX Brief v1.0.
 * "Training floor, not lobby." Bold, direct, fast.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette (Brief §2)
        ink: "#14151A", // Base dark — hero/high-impact sections (never pure black)
        paper: "#F2F1ED", // Base light — content-heavy sections
        volt: "#D4FF3D", // Signature accent — ALL primary CTAs, on dark only
        ember: "#FF5A36", // Secondary accent — urgency/errors only, max 1 per screen
        steel: "#8A8F98", // Muted text on dark backgrounds
        line: "#2A2C33", // Hairline dividers/borders on dark
        // Admin panel theme (Brief §6.1) — deliberately different, calm back-office
        admin: {
          bg: "#FAFAFA",
          accent: "#9AA84A", // desaturated Volt for active states only
        },
      },
      fontFamily: {
        // Display (headlines) — condensed, heavy, scoreboard presence
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
        // Body (paragraphs, UI)
        sans: ["var(--font-body)", "Helvetica Neue", "Arial", "sans-serif"],
        // Numerals (pricing, stats) — tactile "gym timer" feel
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      fontSize: {
        // Type scale (Brief §3.1) — [mobile, desktop handled via responsive classes]
        "display-xl": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "900" }],
        "display-lg": ["1.875rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "900" }],
        "heading-md": ["1.25rem", { lineHeight: "1.25", fontWeight: "700" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-base": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        "numeral-lg": ["2rem", { lineHeight: "1.1", fontWeight: "700" }],
        // Desktop sizes (used with md: prefix)
        "display-xl-d": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "900" }],
        "display-lg-d": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "900" }],
        "heading-md-d": ["1.75rem", { lineHeight: "1.25", fontWeight: "700" }],
        "body-lg-d": ["1.25rem", { lineHeight: "1.6", fontWeight: "400" }],
        "numeral-lg-d": ["3rem", { lineHeight: "1.1", fontWeight: "700" }],
      },
      spacing: {
        // 8px base system (Brief §4.1): multiples of 8
        section: "4rem", // 64px — mobile section vertical padding
        "section-d": "7.5rem", // 120px — desktop section vertical padding
        "cta-bar": "3.5rem", // 56px — sticky mobile CTA bar / nav item height
      },
      maxWidth: {
        content: "1280px", // max content container width (Brief §7)
      },
      borderRadius: {
        card: "12px", // card corner radius (Brief §5.2)
        btn: "8px", // button corner radius (Brief §5.1)
      },
      transitionDuration: {
        DEFAULT: "200ms", // micro-interactions 200-300ms (Brief §7.2)
      },
      boxShadow: {
        card: "0 4px 16px rgba(20, 21, 26, 0.06)", // soft, low-opacity card shadow
        "nav-solid": "0 2px 12px rgba(20, 21, 26, 0.25)", // nav on scroll
      },
    },
  },
  plugins: [],
};

export default config;
