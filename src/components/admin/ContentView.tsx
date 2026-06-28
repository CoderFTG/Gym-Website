"use client";

import { Info } from "lucide-react";
import { plans, trainers, faqs, testimonials, settings } from "@/content/site";

/**
 * Content overview — read-only for V1.
 *
 * Site content (pricing, trainers, FAQ, etc.) is currently stored in code for a
 * fast, fully-static build. This screen gives the owner visibility into what's
 * live. Editable content (moving these into Supabase tables with CRUD) is an
 * opt-in follow-up — see the notice below.
 */
export function ContentView() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-tight">Content</h1>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <Info size={18} className="mt-0.5 shrink-0" aria-hidden />
        <p>
          For this launch, site content is managed in code for maximum speed and
          reliability. This is a read-only view. To let staff edit content here
          directly, we can migrate it into the database — just ask.
        </p>
      </div>

      <Group title="Membership Plans">
        {plans.map((p) => (
          <Row key={p.name} label={p.name} value={`$${p.price} / ${p.period}`} />
        ))}
      </Group>

      <Group title="Trainers">
        {trainers.map((t) => (
          <Row key={t.name} label={t.name} value={t.specialty} />
        ))}
      </Group>

      <Group title="FAQ">
        {faqs.map((f) => (
          <Row key={f.question} label={f.question} value="" />
        ))}
      </Group>

      <Group title="Testimonials">
        {testimonials.map((t) => (
          <Row key={t.name} label={t.name} value={`${t.rating}★ · ${t.role}`} />
        ))}
      </Group>

      <Group title="Settings">
        <Row label="Phone" value={settings.phoneDisplay} />
        <Row label="Email" value={settings.email} />
        <Row label="Address" value={`${settings.address.line1}, ${settings.address.line2}`} />
        <Row label="WhatsApp" value={settings.whatsapp} />
      </Group>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </h2>
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <span className="text-slate-700">{label}</span>
      {value && <span className="shrink-0 text-slate-500">{value}</span>}
    </div>
  );
}
