"use client";

import { useState } from "react";
import { Send } from "lucide-react";

/**
 * Inquiry form — the site's single conversion point (Brief §5.3).
 * Fields: Name, Phone, Email (required) + Message (optional) → 3 required + 1
 * optional, balancing the brief's 4 fields with the skill's "fewer is better".
 *
 * PHASE 2: visual + interaction shell with inline success/error states and a
 * honeypot. Submission is currently local-only (no network call).
 * PHASE 3 replaces `handleSubmit` with Zod validation + a Supabase insert.
 */
type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot: real users never fill this hidden field; bots often do.
    const honeypot = (form.elements.namedItem("company") as HTMLInputElement)?.value;
    if (honeypot) return; // silently drop

    setStatus("submitting");
    // TODO (Phase 3): validate with Zod and POST to Supabase `inquiries`.
    // Local-only preview of the success state for now.
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[320px] flex-col items-center justify-center rounded-card border border-volt/40 bg-volt/5 p-8 text-center"
      >
        <p className="font-display text-heading-md uppercase text-volt">
          Got it.
        </p>
        <p className="mt-2 max-w-sm text-body-base text-paper">
          Thanks for reaching out — we&apos;ll call you within 2 hours during
          business hours to set up your free sessions.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-caption uppercase tracking-wide text-steel underline transition hover:text-volt"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot field — visually hidden, ignored by humans */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" autoComplete="off" tabIndex={-1} />
      </div>

      <Field label="Name" name="name" type="text" autoComplete="name" required />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
      <Field label="Email" name="email" type="email" autoComplete="email" required />

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-caption uppercase tracking-wide text-steel">
          Message <span className="text-steel/60">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Tell us your goals, or just say hi."
          className="resize-none border-b-2 border-line bg-transparent py-2 text-body-base text-paper placeholder:text-steel/50 focus:border-volt focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-caption text-ember">
          Something went wrong. Please try again, or call us directly.
        </p>
      )}

      <button type="submit" className="btn-primary w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          "Sending..."
        ) : (
          <>
            Request Free Sessions
            <Send size={18} strokeWidth={2.5} aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}

/** Bottom-border input on dark sections (Brief §5.3). */
function Field({
  label,
  name,
  type,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-mono text-caption uppercase tracking-wide text-steel">
        {label}
        {required && <span className="text-volt"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="border-b-2 border-line bg-transparent py-2 text-body-base text-paper placeholder:text-steel/50 focus:border-volt focus:outline-none"
      />
    </div>
  );
}
