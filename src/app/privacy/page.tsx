import type { Metadata } from "next";
import { settings } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy — FitZone Gym",
  robots: { index: true, follow: true },
};

/**
 * Privacy Policy stub. The full policy (inquiry data collection disclosure per
 * TRD §9.4) is finalized in the polish phase. This placeholder keeps the footer
 * link valid in the static export.
 */
export default function PrivacyPage() {
  return (
    <main className="bg-ink">
      <div className="container-fit min-h-screen py-section md:py-section-d">
        <a href="/" className="text-caption uppercase tracking-wide text-volt">
          ← Back to home
        </a>
        <h1 className="mt-6 text-display-lg uppercase text-paper md:text-display-lg-d">
          Privacy Policy
        </h1>
        <p className="mt-6 max-w-2xl text-body-base text-steel">
          {settings.name} collects only the information you provide through our
          inquiry form — your name, phone number, email, and message — solely to
          respond to your request about membership. We do not sell or share this
          information. The complete policy will be published here before launch.
        </p>
      </div>
    </main>
  );
}
