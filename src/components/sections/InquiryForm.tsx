"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import clsx from "clsx";
import { inquirySchema, type InquiryInput } from "@/lib/validation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { telHref } from "@/lib/links";

/**
 * Inquiry form — the site's single conversion point (Brief §5.3).
 * Name/Phone/Email required + optional Message. Validates with Zod, then writes
 * directly to the Supabase `inquiries` table (RLS-protected insert). Honeypot +
 * inline validation; plain-language success/error states (no popup modal).
 */
type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const honeypot = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
  });

  async function onSubmit(data: InquiryInput) {
    // Honeypot: bots fill the hidden field; humans never do. Silently "succeed".
    if (honeypot.current?.value) {
      setStatus("success");
      reset();
      return;
    }

    setStatus("submitting");

    // Degrade gracefully if Supabase isn't configured yet.
    if (!isSupabaseConfigured || !supabase) {
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("inquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message?.trim() ? data.message.trim() : null,
      source_page: typeof window !== "undefined" ? window.location.pathname : "/",
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset();
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[320px] flex-col items-center justify-center rounded-card border border-volt/40 bg-volt/5 p-8 text-center"
      >
        <p className="font-display text-heading-md uppercase tracking-wide text-volt">
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Honeypot field — visually hidden, ignored by humans */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          ref={honeypot}
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <Field label="Name" error={errors.name?.message}>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          className={inputClass(!!errors.name)}
          {...register("name")}
        />
      </Field>

      <Field label="Phone" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          className={inputClass(!!errors.phone)}
          {...register("phone")}
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          className={inputClass(!!errors.email)}
          {...register("email")}
        />
      </Field>

      <Field label="Message" optional error={errors.message?.message}>
        <textarea
          id="message"
          rows={3}
          placeholder="Tell us your goals, or just say hi."
          aria-invalid={!!errors.message}
          className={clsx(inputClass(!!errors.message), "resize-none")}
          {...register("message")}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-caption text-ember">
          Something went wrong sending your inquiry. Please try again, or{" "}
          <a href={telHref} className="underline">
            call us directly
          </a>
          .
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
function inputClass(hasError: boolean) {
  return clsx(
    "w-full border-b-2 bg-transparent py-2 text-body-base text-paper placeholder:text-steel/50 focus:outline-none",
    hasError ? "border-ember focus:border-ember" : "border-line focus:border-volt",
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={label.toLowerCase()}
        className="font-mono text-caption uppercase tracking-wide text-steel"
      >
        {label}
        {optional ? (
          <span className="text-steel/60"> (optional)</span>
        ) : (
          <span className="text-volt"> *</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-caption text-ember" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
