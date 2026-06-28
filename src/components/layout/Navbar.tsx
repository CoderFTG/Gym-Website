"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { navLinks, settings } from "@/content/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Transparent over the hero, solid Ink with shadow after scrolling (Brief §5.4)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the full-screen mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen ? "bg-ink shadow-nav-solid" : "bg-transparent",
      )}
    >
      <nav className="container-fit flex h-20 items-center justify-between">
        <a
          href="#top"
          className="font-display text-2xl uppercase tracking-wide text-paper"
          onClick={() => setMenuOpen(false)}
        >
          {settings.name}
          <span className="text-volt">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-body-base font-medium text-paper/80 transition hover:text-volt"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-primary px-6 py-3 text-caption">
              Join Now
            </a>
          </li>
        </ul>

        {/* Mobile hamburger (Volt) */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-volt lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
        </button>
      </nav>

      {/* Full-screen Ink overlay menu (Brief §5.4) */}
      {menuOpen && (
        <div className="fixed inset-0 top-20 z-40 flex flex-col bg-ink lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-cta-bar items-center text-heading-md text-paper transition hover:text-volt"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-10">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full"
            >
              Join Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
