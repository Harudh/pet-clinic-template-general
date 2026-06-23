import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI-style AuroraText — paints its text with a slowly drifting,
 * multi-stop "aurora" gradient (see `.text-aurora` in index.css). The gradient
 * stops are theme tokens, so it re-skins with the rest of the site, and it
 * stills itself for `prefers-reduced-motion`.
 *
 * The text stays real (just transparent-filled), so it remains selectable and
 * available to screen readers.
 */
export function AuroraText({
  children,
  className,
  speed = 6,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <span
      className={cn("text-aurora", className)}
      style={{ animationDuration: `${speed}s` } as CSSProperties}
    >
      {children}
    </span>
  );
}
