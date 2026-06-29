"use client";

import { useCallback, useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_KEY, GA_MEASUREMENT_ID, track } from "@/lib/analytics";

/**
 * Privacy-aware analytics (TRD §9.4):
 *  - GA4 loads ONLY after the visitor accepts cookies and a measurement ID is set.
 *  - A lightweight consent banner records the choice in localStorage.
 *  - Click tracking uses event delegation on [data-track] elements, so server
 *    components (call/WhatsApp links) need no client wrappers.
 *
 * Tracked events: form submit (generate_lead), call_click, whatsapp_click.
 */
type Consent = "granted" | "denied" | "unset";

export function Analytics() {
  const [consent, setConsent] = useState<Consent>("unset");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "granted" || stored === "denied") setConsent(stored);
    setMounted(true);
  }, []);

  // Delegate clicks on [data-track="event_name"] to GA (no-op until gtag loads).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("[data-track]");
      const name = el?.getAttribute("data-track");
      if (name) track(name);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const decide = useCallback((choice: Consent) => {
    setConsent(choice);
    localStorage.setItem(CONSENT_KEY, choice);
  }, []);

  const loadGa = consent === "granted" && Boolean(GA_MEASUREMENT_ID);

  return (
    <>
      {loadGa && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {mounted && consent === "unset" && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-md rounded-card border border-line bg-surface/95 p-5 shadow-card backdrop-blur lg:bottom-6 lg:left-auto lg:right-6 lg:mx-0"
        >
          <p className="text-body-base text-paper">
            We use cookies to measure traffic and improve the site. No tracking
            until you accept.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="btn-primary flex-1 px-4 py-2.5 text-caption"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="btn-secondary flex-1 px-4 py-2.5 text-caption text-volt"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
