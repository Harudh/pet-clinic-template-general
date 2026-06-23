import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

/**
 * ReactBits-style SplitText — animates each character in with a staggered
 * fade + rise + de-blur as it scrolls into view. Words can be highlighted.
 */
export function SplitText({
  text,
  className,
  highlight = [],
  highlightClassName,
  delay = 0,
  stagger = 0.025,
  duration = 0.6,
  as = "span",
  once = true,
}: {
  text: string;
  className?: string;
  highlight?: string[];
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: Tag;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;

  const words = text.split(" ");
  const hl = new Set(highlight.map((w) => w.toLowerCase()));
  let charIndex = 0;

  return (
    <Tag ref={ref as never} className={cn(className)} aria-label={text}>
      {words.map((word, wi) => {
        const isHighlighted = hl.has(word.replace(/[.,!?:;]/g, "").toLowerCase());
        return (
          <Fragment key={wi}>
            <span aria-hidden className="inline-block">
              {Array.from(word).map((char, ci) => {
                const idx = charIndex++;
                return (
                  <motion.span
                    key={ci}
                    className={cn(
                      "inline-block will-change-[transform,opacity]",
                      // Gradient highlights (background-clip: text) must sit on
                      // the element that actually holds the glyph, not the word
                      // wrapper — otherwise there's no text to clip and the word
                      // renders invisible.
                      isHighlighted && highlightClassName
                    )}
                    initial={reduce ? false : { opacity: 0, y: "0.6em", filter: "blur(8px)" }}
                    animate={
                      inView
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : reduce
                          ? { opacity: 1 }
                          : { opacity: 0 }
                    }
                    transition={{ duration, delay: delay + idx * stagger, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
