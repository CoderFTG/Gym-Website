/**
 * GA4 helper. `track` is a no-op until the gtag script has loaded (which only
 * happens after cookie consent + a configured measurement ID), so it is always
 * safe to call from anywhere.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export const CONSENT_KEY = "fitzone-cookie-consent";

type GtagArgs = [string, string, Record<string, unknown>?];

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params ?? {});
}
