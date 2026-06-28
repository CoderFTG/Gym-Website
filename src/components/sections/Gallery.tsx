import { SectionTitle } from "@/components/ui/SectionTitle";
import { ImageTile } from "@/components/ui/ImageTile";
import { Reveal } from "@/components/ui/Reveal";
import { gallery } from "@/content/site";
import clsx from "clsx";

/**
 * Gallery — Paper background, photo wall (Brief §4.2). The first tile spans a
 * larger area for a masonry-style rhythm; remaining tiles fill the grid.
 */
export function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-paper">
      <div className="container-fit">
        <SectionTitle
          eyebrow="Facilities"
          title="Take a Look Around"
          lead="12,000 square feet of premium equipment, open platforms, and recovery space."
          tone="light"
        />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[200px] md:grid-cols-3">
          {gallery.map((item, i) => (
            <Reveal
              key={item.caption}
              delay={i * 70}
              className={clsx(i === 0 && "col-span-2 row-span-2")}
            >
              <figure className="group relative h-full overflow-hidden rounded-card">
                <ImageTile
                  src={item.photo}
                  alt={item.photoAlt}
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4">
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-volt">
                    {item.category}
                  </span>
                  <span className="block text-body-base font-medium text-paper">
                    {item.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
