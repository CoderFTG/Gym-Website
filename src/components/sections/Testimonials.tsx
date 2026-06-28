"use client";

import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import clsx from "clsx";
import { testimonials } from "@/content/site";

/**
 * Testimonials — Ink background, one quote at a time (Brief §4.2, §7.1).
 * Manual navigation (buttons + dots) and touch swipe. No auto-advance, to
 * respect accessibility guidance against motion the user didn't trigger.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = testimonials.length;

  const go = (next: number) => setIndex((next + count) % count);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) go(index - 1);
    else if (delta < -50) go(index + 1);
    touchStartX.current = null;
  };

  return (
    <section id="testimonials" className="grain relative section-pad bg-ink">
      <div className="container-fit">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Member Stories</span>
          <h2 className="mt-4 text-display-lg uppercase text-paper md:text-display-lg-d">
            Don&apos;t Take Our Word For It
          </h2>
        </div>

        <div
          className="relative mx-auto mt-12 max-w-3xl overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
            aria-live="polite"
          >
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="w-full shrink-0 px-2 text-center"
              >
                <Quote size={36} strokeWidth={2} className="mx-auto text-volt" aria-hidden />
                <div className="mt-4 flex justify-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-volt text-volt" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-6 text-body-lg text-paper md:text-body-lg-d">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <span className="block font-display text-heading-md uppercase text-paper">
                    {t.name}
                  </span>
                  <span className="block font-mono text-caption uppercase tracking-wide text-steel">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-paper transition hover:border-volt hover:text-volt"
          >
            <ChevronLeft size={22} aria-hidden />
          </button>

          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={clsx(
                  "h-2.5 rounded-full transition-all",
                  i === index ? "w-6 bg-volt" : "w-2.5 bg-line hover:bg-steel",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-paper transition hover:border-volt hover:text-volt"
          >
            <ChevronRight size={22} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
