import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { settings } from "@/content/site";
import { telHref, whatsappHref } from "@/lib/links";

/**
 * Contact — Ink background; closes the page with intent (Brief §4.2).
 * Layout: inquiry form + location/map + hours + instant-contact buttons.
 * Map uses a keyless Google Maps embed built from the address, or an explicit
 * NEXT_PUBLIC_GMAPS_EMBED_URL override.
 */
export function Contact() {
  const mapQuery = encodeURIComponent(
    `${settings.address.line1}, ${settings.address.line2}`,
  );
  const mapSrc =
    process.env.NEXT_PUBLIC_GMAPS_EMBED_URL ||
    `https://maps.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <section id="contact" className="grain relative section-pad bg-ink">
      <div className="container-fit grid gap-12 lg:grid-cols-2">
        {/* Left: form */}
        <div>
          <SectionTitle
            eyebrow="Start Today"
            title="Claim Your 4 Free Sessions"
            lead="Leave your details and we'll be in touch. Prefer to talk now? Call or message us — it's one tap away."
            tone="dark"
          />
          <div className="mt-8">
            <InquiryForm />
          </div>
        </div>

        {/* Right: instant contact + hours + map */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={telHref} data-track="call_click" className="btn-secondary flex-1 text-volt">
              <Phone size={18} strokeWidth={2.5} aria-hidden />
              Call Now
            </a>
            <a
              href={whatsappHref}
              data-track="whatsapp_click"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 text-volt"
            >
              <MessageCircle size={18} strokeWidth={2.5} aria-hidden />
              WhatsApp
            </a>
          </div>

          <div className="rounded-card border border-line p-6">
            <div className="flex items-start gap-3">
              <MapPin size={20} strokeWidth={2} className="mt-1 shrink-0 text-volt" aria-hidden />
              <div>
                <h3 className="font-mono text-caption uppercase tracking-widest text-steel">
                  Location
                </h3>
                <p className="mt-1 text-body-base text-paper">
                  {settings.address.line1}
                  <br />
                  {settings.address.line2}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <Clock size={20} strokeWidth={2} className="mt-1 shrink-0 text-volt" aria-hidden />
              <div className="w-full">
                <h3 className="font-mono text-caption uppercase tracking-widest text-steel">
                  Hours
                </h3>
                <ul className="mt-2 flex flex-col gap-1">
                  {settings.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4 text-body-base text-paper/90">
                      <span>{h.days}</span>
                      <span className="font-mono text-caption text-steel">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-card border border-line">
            <iframe
              title={`Map to ${settings.name} Gym`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[16/10] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
