"use client";

import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** base animation class applied immediately (default "reveal") */
  variant?: "reveal" | "img-reveal" | "none";
  /** stagger delay in ms */
  delay?: number;
  as?: ElementType;
  once?: boolean;
};

/**
 * Adds `is-in` when the element scrolls into view so the CSS transitions in
 * globals.css can play. Works for text (.reveal), images (.img-reveal) or as a
 * neutral trigger (variant="none") that just toggles `is-in` for children like
 * .line-mask.
 */
export default function Reveal({
  children,
  className = "",
  variant = "reveal",
  delay = 0,
  as = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (delay) {
              const t = window.setTimeout(
                () => el.classList.add("is-in"),
                delay
              );
              if (once) io.unobserve(el);
              return () => window.clearTimeout(t);
            }
            el.classList.add("is-in");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-in");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, once]);

  const base = variant === "none" ? "" : variant;

  return createElement(
    as,
    { ref, className: `${base} ${className}`.trim() },
    children
  );
}
