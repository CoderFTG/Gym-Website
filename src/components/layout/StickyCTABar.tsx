"use client";

import { Phone } from "lucide-react";
import { telHref } from "@/lib/links";

/**
 * Persistent mobile-only CTA bar fixed to the bottom of the screen (Brief §7.1).
 * Exactly two actions: "Call Now" (secondary) and "Join Now" (primary, Volt).
 * 56px tall with safe-area-inset padding for the iPhone home indicator.
 * Hidden at the lg breakpoint and above.
 */
export function StickyCTABar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-3 px-4 py-3">
        <a
          href={telHref}
          data-track="call_click"
          className="flex h-cta-bar flex-1 items-center justify-center gap-2 rounded-btn border-2 border-volt font-sans font-bold uppercase tracking-wide text-volt transition active:bg-volt/10"
        >
          <Phone size={18} strokeWidth={2} aria-hidden />
          Call Now
        </a>
        <a
          href="#contact"
          className="flex h-cta-bar flex-1 items-center justify-center rounded-btn bg-volt font-sans font-bold uppercase tracking-wide text-ink transition active:scale-[0.99]"
        >
          Join Now
        </a>
      </div>
    </div>
  );
}
