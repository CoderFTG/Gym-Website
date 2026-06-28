"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { faqs } from "@/content/site";

/**
 * FAQ — Paper background, accordion list (Brief §4.2, §7.1).
 * Default collapsed; one item open at a time to reduce scroll fatigue.
 * Built on native buttons with aria-expanded/controls for screen readers.
 */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad bg-paper">
      <div className="container-fit max-w-3xl">
        <SectionTitle
          eyebrow="Questions"
          title="Frequently Asked"
          tone="light"
          align="center"
        />

        <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-button-${i}`;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-heading-md text-ink md:text-heading-md-d">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={22}
                      strokeWidth={2.5}
                      aria-hidden
                      className={clsx(
                        "shrink-0 text-ink transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className="pb-6"
                >
                  <p className="text-body-base text-ink/70 md:text-body-lg-d">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
