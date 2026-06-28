import type { Metadata } from "next";
import { settings } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy — FitZone Gym",
  description:
    "How FitZone Gym collects, uses, and protects the information you submit through our website.",
  robots: { index: true, follow: true },
};

const updated = "May 2026";

export default function PrivacyPage() {
  return (
    <main className="bg-ink">
      <div className="container-fit min-h-screen max-w-3xl py-20 md:py-28">
        <a href="/" className="text-caption uppercase tracking-wide text-volt">
          ← Back to home
        </a>
        <h1 className="mt-6 text-balance text-display-lg uppercase text-paper md:text-display-lg-d">
          Privacy Policy
        </h1>
        <p className="mt-3 font-mono text-caption uppercase tracking-widest text-steel">
          Last updated: {updated}
        </p>

        <div className="mt-10 flex flex-col gap-8 text-body-base text-paper/80">
          <Section title="What we collect">
            When you submit our inquiry form, we collect the information you
            provide: your <strong className="text-paper">name</strong>,{" "}
            <strong className="text-paper">phone number</strong>,{" "}
            <strong className="text-paper">email address</strong>, and any{" "}
            <strong className="text-paper">message</strong> you choose to send.
            We also record which page the inquiry came from. This is the only
            personal information the site collects.
          </Section>

          <Section title="How we use it">
            We use your details for a single purpose: to respond to your
            inquiry about membership and to arrange your free sessions. We do
            not sell, rent, or share your information with third parties for
            marketing.
          </Section>

          <Section title="Analytics & cookies">
            With your consent, we use Google Analytics to understand how
            visitors use the site (for example, which pages are viewed and which
            buttons are clicked) so we can improve it. No analytics cookies are
            set unless you choose “Accept” on the cookie banner. You can decline
            without affecting your ability to use the site.
          </Section>

          <Section title="Where your data lives">
            Inquiries are stored securely in our database provider (Supabase)
            and transmitted over encrypted connections. Access is restricted to
            authorized FitZone staff.
          </Section>

          <Section title="How long we keep it">
            We review inquiry records periodically and remove or archive them
            after 12 months of inactivity, unless you have become a member and
            we need the information to provide our services.
          </Section>

          <Section title="Your choices">
            You can ask us to access, correct, or delete the information you
            submitted at any time. Just contact us and we&apos;ll take care of
            it.
          </Section>

          <Section title="Contact">
            Questions about this policy? Email us at{" "}
            <a href={`mailto:${settings.email}`} className="text-volt underline">
              {settings.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${settings.phoneDial}`} className="text-volt underline">
              {settings.phoneDisplay}
            </a>
            .
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-heading-md uppercase tracking-wide text-paper">
        {title}
      </h2>
      <p className="leading-relaxed">{children}</p>
    </section>
  );
}
