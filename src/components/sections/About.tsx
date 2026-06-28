import { SectionTitle } from "@/components/ui/SectionTitle";
import { ImageTile } from "@/components/ui/ImageTile";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/site";

/**
 * About / Why FitZone — Paper background, breathing room + trust copy (Brief §2.2).
 */
export function About() {
  return (
    <section id="about" className="section-pad bg-paper">
      <div className="container-fit grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle
            eyebrow={about.title}
            title={about.lead}
            tone="light"
          />
          <div className="mt-6 flex flex-col gap-4">
            {about.body.map((para) => (
              <p key={para.slice(0, 24)} className="text-body-base text-ink/70 md:text-body-lg-d">
                {para}
              </p>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <ImageTile
            src={about.image}
            alt={about.imageAlt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] w-full rounded-card"
          />
        </Reveal>
      </div>

      {/* Stats strip — mono numerals with a Volt accent bar (graphic, not text) */}
      <div className="container-fit mt-16 grid grid-cols-2 gap-8 border-t border-ink/10 pt-10 md:grid-cols-4">
        {about.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90}>
            <div className="flex flex-col items-center text-center">
              <span className="font-mono text-numeral-lg font-bold tabular-nums text-ink md:text-numeral-lg-d">
                {stat.value}
              </span>
              <span aria-hidden className="my-2 h-1 w-8 bg-volt" />
              <span className="font-mono text-caption uppercase tracking-widest text-ink/60">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
