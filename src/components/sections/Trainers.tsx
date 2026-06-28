import { SectionTitle } from "@/components/ui/SectionTitle";
import { ImageTile } from "@/components/ui/ImageTile";
import { Reveal } from "@/components/ui/Reveal";
import { trainers } from "@/content/site";

/**
 * Trainers — Ink background, photo-forward grid (Brief §4.2, §5.2).
 * Each card: photo fills the top; name + specialty below; a one-line bio that
 * reveals on hover (desktop) and stays visible on touch devices for access.
 */
export function Trainers() {
  return (
    <section id="trainers" className="grain relative section-pad bg-ink">
      <div className="container-fit">
        <SectionTitle
          eyebrow="The Coaches"
          title="Meet Your Trainers"
          lead="Real expertise, not just enthusiasm. Every coach is certified and competes or has competed in their discipline."
          tone="dark"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer, i) => (
            <Reveal key={trainer.name} delay={i * 90}>
              <article className="group overflow-hidden rounded-card border border-line bg-surface transition duration-300 hover:border-volt/40">
                <ImageTile
                  src={trainer.photo}
                  alt={trainer.photoAlt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="aspect-[3/4] w-full"
                />
                <div className="p-5">
                  <h3 className="text-heading-md uppercase tracking-wide text-paper">
                    {trainer.name}
                  </h3>
                  <p className="mt-1 font-mono text-caption uppercase tracking-wide text-volt">
                    {trainer.specialty}
                  </p>
                  <p className="mt-3 max-h-24 overflow-hidden text-body-base text-steel opacity-100 transition-all duration-300 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100">
                    {trainer.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
