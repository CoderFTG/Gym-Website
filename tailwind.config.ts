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
        // Palette v2 — "energetic orange on deep slate" (ui-ux skill, fitness set).
        // `volt` is the signature accent token name, repointed to orange.
        ink: "#0B1120", // Base dark — deep navy-slate
        "ink-soft": "#0F172A", // section variation
        surface: "#151D2E", // raised card surface on dark
        "surface-2": "#1E283D", // hover / nested surface
        paper: "#F6F5F2", // warm off-white — content-heavy sections
        volt: "#F97316", // Signature accent — primary CTAs, highlights
        "volt-soft": "#FB923C", // lighter accent for gradients
        ember: "#F43F5E", // Urgency / errors only, distinct from accent
        steel: "#98A2B5", // Muted text on dark
        line: "#232C40", // Hairline dividers/borders on dark
        // Admin panel theme (Brief §6.1)
        admin: {
          bg: "#FAFAFA",
          accent: "#C2410C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-body)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      fontSize: {
        // Exaggerated-minimalism scale: fluid clamp() so type stays huge and
        // responsive without per-breakpoint juggling.
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.22em", fontWeight: "600" }],
        // Hero statement
        "display-xl": ["clamp(3rem, 12vw, 5rem)", { lineHeight: "0.9", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-xl-d": ["clamp(4.5rem, 11vw, 9.5rem)", { lineHeight: "0.88", letterSpacing: "-0.035em", fontWeight: "700" }],
        // Section titles
        "display-lg": ["clamp(2.25rem, 8vw, 3rem)", { lineHeight: "0.95", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg-d": ["clamp(3rem, 6vw, 5rem)", { lineHeight: "0.92", letterSpacing: "-0.025em", fontWeight: "700" }],
        "heading-md": ["1.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-md-d": ["2rem", { lineHeight: "1.05", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-lg-d": ["1.3125rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-base": ["1.0625rem", { lineHeight: "1.65", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        "numeral-lg": ["clamp(2.5rem, 9vw, 3.25rem)", { lineHeight: "1", fontWeight: "700" }],
        "numeral-lg-d": ["clamp(3rem, 5vw, 4rem)", { lineHeight: "1", fontWeight: "700" }],
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
        card: "0 10px 40px -12px rgba(0, 0, 0, 0.5)",
        "nav-solid": "0 1px 0 0 rgba(255,255,255,0.04), 0 8px 30px rgba(0, 0, 0, 0.4)",
        volt: "0 0 0 1px rgba(249,115,22,0.4), 0 12px 40px -8px rgba(249,115,22,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
