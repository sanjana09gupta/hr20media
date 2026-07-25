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
 * Adds `is-in` when the element enters the viewport so the CSS transitions in
 * globals.css can play. Driven by a scroll/resize listener (plus an immediate
 * on-mount check) rather than IntersectionObserver, so content can never get
 * stuck hidden if the observer is paused. Works for text (.reveal), images
 * (.img-reveal) or as a neutral trigger (variant="none").
 */
export default function Reveal({
  children,
  className = "",
  variant = "reveal",
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let revealed = false;
    let raf = 0;

    const doReveal = () => {
      if (revealed) return;
      revealed = true;
      cleanup();
      if (delay) window.setTimeout(() => el.classList.add("is-in"), delay);
      else el.classList.add("is-in");
    };

    const check = () => {
      if (revealed) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.9 && r.bottom > 0) doReveal();
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };

    // reveal above-the-fold content right away, watch the rest on scroll
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // safety net in case no scroll/resize ever fires
    const failSafe = window.setTimeout(doReveal, 3000);

    return () => {
      cleanup();
      window.clearTimeout(failSafe);
    };
  }, [delay]);

  const base = variant === "none" ? "" : variant;

  return createElement(
    as,
    { ref, className: `${base} ${className}`.trim() },
    children
  );
}
