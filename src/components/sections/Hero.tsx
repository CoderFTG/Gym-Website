import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Hero — Exaggerated Minimalism: an oversized statement headline over a darkened
 * gym photograph, with film grain, a Volt glow, and generous negative space.
 * One primary Volt CTA; a secondary ghost CTA scrolls to the tour.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink pt-20"
    >
      {/* Background photo + darkening overlays so the headline dominates */}
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/40" />
      {/* diagonal floor-tape texture */}
      <div aria-hidden className="tape-texture absolute inset-0 opacity-[0.05]" />
      {/* Volt glow anchoring the headline */}
      <div
        aria-hidden
        className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-volt/15 blur-[120px]"
      />

      <div className="container-fit relative z-10 py-20 md:py-28">
        <Reveal>
          <span className="eyebrow">{hero.eyebrow}</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 text-balance text-display-xl uppercase text-paper md:text-display-xl-d">
            Get
            <span className="text-volt">.</span> To
            <span className="text-volt">.</span> Work
            <span className="text-volt">.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-xl text-body-lg text-paper/80 md:text-body-lg-d">
            {hero.subhead}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-primary">
              {hero.primaryCta}
              <ArrowRight size={20} strokeWidth={2.5} aria-hidden />
            </a>
            <a href="#gallery" className="btn-secondary text-volt">
              {hero.secondaryCta}
            </a>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-px animate-pulse bg-gradient-to-b from-transparent via-steel to-transparent md:block"
        style={{ height: "56px" }}
      />
    </section>
  );
}
