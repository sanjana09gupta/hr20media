"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * Text that fills in word-by-word as it scrolls through the viewport — each
 * word interpolates its own opacity from a slice of the section's scroll
 * progress. A signature editorial Framer Motion effect.
 */
export default function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const highlight = children === "artistry";
  return (
    <span className="mr-[0.28em] mt-[0.1em] inline-block">
      <motion.span
        style={{ opacity }}
        className={highlight ? "text-accent" : undefined}
      >
        {children}
      </motion.span>
    </span>
  );
}
