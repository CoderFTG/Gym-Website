import { Check } from "lucide-react";
import clsx from "clsx";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { plans } from "@/content/site";

/**
 * Membership Plans — Ink background; pricing feels premium on dark (Brief §2.2, §5.2).
 * Featured tier gets a Volt top accent, glow, elevation, and the only primary
 * CTA; other tiers use the secondary outline CTA so one action stays dominant.
 */
export function Plans() {
  return (
    <section id="plans" className="grain relative section-pad bg-ink-soft">
      <div className="container-fit">
        <SectionTitle
          eyebrow="Membership"
          title="Pick Your Plan"
          lead="Month-to-month. No long-term contracts. Every plan starts with 4 free sessions."
          tone="dark"
          align="center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100} className="h-full">
              <div
                className={clsx(
                  "relative flex h-full flex-col rounded-card border p-7 transition duration-300",
                  plan.featured
                    ? "border-volt/40 bg-surface shadow-volt md:-translate-y-3"
                    : "border-line bg-surface/60 hover:border-line/80 hover:bg-surface",
                )}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-7 rounded-btn bg-volt px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-heading-md uppercase tracking-wide text-paper md:text-heading-md-d">
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-mono text-numeral-lg font-bold text-paper md:text-numeral-lg-d">
                    ${plan.price}
                  </span>
                  <span className="text-caption text-steel">/ {plan.period}</span>
                </div>

                <ul className="mt-7 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-body-base text-paper/80">
                      <Check size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-volt" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={clsx(
                    "mt-8 w-full",
                    plan.featured ? "btn-primary" : "btn-secondary text-volt",
                  )}
                >
                  {plan.featured ? "Join Now" : "Get Started"}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
