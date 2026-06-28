import { settings } from "@/content/site";

/** Build a tel: href from the dial number. */
export const telHref = `tel:${settings.phoneDial}`;

/** Build a wa.me click-to-chat link with a prefilled message. */
export const whatsappHref = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
  "Hi FitZone! I'd like to know more about joining.",
)}`;
