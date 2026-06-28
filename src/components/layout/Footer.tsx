import { MapPin, Phone, Mail } from "lucide-react";
import { settings, navLinks } from "@/content/site";
import { telHref } from "@/lib/links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink pb-24 pt-16 lg:pb-16">
      <div className="container-fit grid gap-10 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl uppercase tracking-wide text-paper">
            {settings.name}
            <span className="text-volt">.</span>
          </span>
          <p className="max-w-xs text-body-base text-steel">
            {settings.tagline} A serious training floor in the heart of the
            Downtown District.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 font-mono text-caption uppercase tracking-widest text-steel">
            Explore
          </h2>
          <ul className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body-base text-paper/80 transition hover:text-volt"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-mono text-caption uppercase tracking-widest text-steel">
            Visit
          </h2>
          <ul className="flex flex-col gap-3 text-body-base text-paper/80">
            <li className="flex items-start gap-3">
              <MapPin size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-volt" aria-hidden />
              <span>
                {settings.address.line1}
                <br />
                {settings.address.line2}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} strokeWidth={2} className="shrink-0 text-volt" aria-hidden />
              <a href={telHref} className="transition hover:text-volt">
                {settings.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} strokeWidth={2} className="shrink-0 text-volt" aria-hidden />
              <a href={`mailto:${settings.email}`} className="transition hover:text-volt">
                {settings.email}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-4">
            {settings.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption uppercase tracking-wide text-steel transition hover:text-volt"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-fit mt-12 flex flex-col gap-2 border-t border-line pt-6 text-caption text-steel md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {settings.name} Gym. All rights reserved.
        </p>
        <a href="/privacy/" className="transition hover:text-volt">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
