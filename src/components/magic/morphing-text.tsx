import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI-style MorphingText — each character blurs and fades individually
 * as words cycle. No SVG filter needed; the staggered per-character blur is
 * what creates the "liquid morph" look.
 */

const charIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 4 },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const charOut: Variants = {
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  hidden: (i: number) => ({
    opacity: 0,
    filter: "blur(10px)",
    y: -4,
    transition: { delay: i * 0.025, duration: 0.3, ease: "easeIn" },
  }),
};

export function MorphingText({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const word = words[index];

  return (
    <span className={cn("relative inline-flex items-baseline overflow-visible py-0.5", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="inline-flex whitespace-nowrap"
          aria-label={word}
        >
          {Array.from(word).map((char, i) =>
            char === " " ? (
              <span key={i} className="inline-block w-[0.28em]" aria-hidden />
            ) : (
              <motion.span
                key={i}
                custom={i}
                variants={reduce ? {} : charIn}
                className="inline-block"
                aria-hidden
              >
                {char}
              </motion.span>
            )
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
