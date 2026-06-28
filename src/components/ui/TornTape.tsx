/**
 * The signature element (Brief §4.3): a diagonal "torn tape" divider in Volt,
 * inspired by gym floor marking tape. Used EXACTLY ONCE — between the Hero and
 * About sections — so it stays memorable rather than decorative wallpaper.
 *
 * The container is Ink (matching the Hero above). The SVG paints the Paper
 * region (matching About below) plus a jagged Volt tape band straddling the
 * seam, so the divider reads as torn tape laid across the floor.
 */
export function TornTape() {
  return (
    <div aria-hidden className="bg-ink leading-[0]">
      <svg
        className="block h-12 w-full md:h-20"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        role="presentation"
      >
        {/* Paper region — jagged top edge down to the bottom (becomes About bg) */}
        <polygon
          fill="#F6F5F2"
          points="0,46 120,38 260,52 410,36 560,50 720,34 880,50 1040,36 1200,52 1330,38 1440,48 1440,80 0,80"
        />
        {/* Volt tape band straddling the seam */}
        <polygon
          fill="#F97316"
          points="0,30 120,22 260,36 410,20 560,34 720,18 880,34 1040,20 1200,36 1330,22 1440,32 1440,46 1330,38 1200,52 1040,36 880,50 720,34 560,50 410,36 260,52 120,38 0,46"
        />
      </svg>
    </div>
  );
}
