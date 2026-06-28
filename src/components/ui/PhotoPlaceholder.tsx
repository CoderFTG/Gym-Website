import { ImageIcon } from "lucide-react";
import clsx from "clsx";

/**
 * Branded stand-in for client photography (trainers, gallery, facilities).
 *
 * Intentionally self-contained (no external image requests) so the build is
 * deterministic and offline-friendly. The `alt`-style label documents exactly
 * which real photo should replace it before launch.
 */
export function PhotoPlaceholder({
  label,
  className,
  tone = "dark",
}: {
  label: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={clsx(
        "relative flex items-center justify-center overflow-hidden",
        tone === "dark"
          ? "bg-gradient-to-br from-surface-2 to-ink"
          : "bg-gradient-to-br from-paper to-[#e4e2db]",
        className,
      )}
    >
      {/* subtle diagonal stripe texture — gym floor tape motif */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0 2px, transparent 2px 14px)",
          color: tone === "dark" ? "#F97316" : "#0B1120",
        }}
      />
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon
          aria-hidden
          className={tone === "dark" ? "text-volt/70" : "text-ink/40"}
          size={28}
          strokeWidth={2}
        />
        <span
          className={clsx(
            "font-mono text-[11px] uppercase tracking-widest",
            tone === "dark" ? "text-steel" : "text-ink/50",
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
