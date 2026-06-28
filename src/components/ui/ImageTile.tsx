import Image from "next/image";
import clsx from "clsx";

/**
 * Responsive image tile for demo photography. Sits on a dark gradient so the
 * frame still reads as intentional if a remote image is slow or unavailable.
 * Uses next/image `fill` (unoptimized in static export) for correct sizing.
 */
export function ImageTile({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden bg-gradient-to-br from-surface-2 to-ink",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
