"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import CyclingImage from "./CyclingImage";

type Props = {
  index: number;
  slug: string;
  title: string;
  tagline: string;
  blurb: string;
  images: string[];
  accent: string;
};

/**
 * A work row whose image slot auto-cycles through that category's photos, with
 * a cursor-following "View" badge tinted in the category's accent.
 */
export default function WorkRow({
  index,
  slug,
  title,
  tagline,
  blurb,
  images,
  accent,
}: Props) {
  const [hover, setHover] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 250, damping: 22, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const r = areaRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <Link
      href={`/work/${slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group grid grid-cols-1 items-center gap-6 border-b border-line px-5 py-12 sm:px-7 md:grid-cols-12 md:gap-12"
    >
      <div className={`md:col-span-5 ${index % 2 === 1 ? "md:order-2" : ""}`}>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
          {String(index + 1).padStart(2, "0")} — {tagline}
        </p>
        <h3
          className="font-display mt-3 text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-none tracking-tight transition-colors duration-300"
          style={{ color: hover ? accent : undefined }}
        >
          {title}
        </h3>
        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
          {blurb}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          <span className="link-underline">View portfolio</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>

      <div
        ref={areaRef}
        onMouseMove={onMove}
        className={`relative md:col-span-7 ${index % 2 === 1 ? "md:order-1" : ""}`}
      >
        <CyclingImage
          images={images}
          interval={3200 + index * 400}
          eager
          sizes="(max-width: 768px) 100vw, 58vw"
          className="aspect-[16/10] w-full rounded-sm"
        />

        <AnimatePresence>
          {hover && (
            <motion.span
              style={{ left: x, top: y, background: accent }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full px-6 py-6 text-[0.62rem] font-semibold uppercase tracking-widest text-paper md:flex"
            >
              View →
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
