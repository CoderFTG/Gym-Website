import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Consistent section header: a Volt eyebrow with a leading rule, an oversized
 * display title, and an optional lead paragraph. `tone` adapts colors to the
 * Ink/Paper section rhythm (Brief §2.2).
 */
export function SectionTitle({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={clsx(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow && (
        <span
          className={clsx(
            "inline-flex items-center gap-2 font-mono text-eyebrow uppercase",
            tone === "dark" ? "text-volt" : "text-ink/55",
          )}
        >
          <span aria-hidden className="inline-block h-px w-8 bg-volt" />
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          "text-display-lg uppercase md:text-display-lg-d",
          tone === "dark" ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={clsx(
            "max-w-2xl text-body-lg md:text-body-lg-d",
            tone === "dark" ? "text-steel" : "text-ink/65",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
