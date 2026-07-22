"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import ImageFrame from "./ImageFrame";

type Props = {
  index: number;
  slug: string;
  title: string;
  tagline: string;
  blurb: string;
  cover: string;
  accent: string;
  code: string;
};

/**
 * A work row styled as a technical panel: mono index/coordinates, a bordered
 * image cell, and a cursor-following "View" badge tinted with the category's
 * accent colour.
 */
export default function WorkRow({
  index,
  slug,
  title,
  tagline,
  blurb,
  cover,
  accent,
  code,
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
      className="group grid grid-cols-1 items-stretch border-b border-line md:grid-cols-12"
    >
      {/* meta cell */}
      <div
        className={`flex flex-col justify-between gap-8 px-5 py-8 sm:px-7 md:col-span-5 md:py-12 ${
          index % 2 === 1 ? "md:order-2 md:border-l" : "md:border-r"
        } border-line`}
      >
        <div className="flex items-center justify-between">
          <span className="ui-label">
            0{index + 1} / {code}
          </span>
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: accent }}
          />
        </div>

        <div>
          <p className="ui-label mb-3">{tagline}</p>
          <h3
            className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-none tracking-tight transition-colors duration-300"
            style={{ color: hover ? accent : undefined }}
          >
            {title}
          </h3>
          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted">
            {blurb}
          </p>
          <span className="ui-label mt-8 inline-flex items-center gap-2 text-ink">
            View portfolio
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>

      {/* image cell */}
      <div
        ref={areaRef}
        onMouseMove={onMove}
        className={`relative p-5 sm:p-7 md:col-span-7 ${
          index % 2 === 1 ? "md:order-1" : ""
        }`}
      >
        <ImageFrame
          src={cover}
          alt={`${title} photography by HR20MEDIA`}
          amount={8}
          sizes="(max-width: 768px) 100vw, 58vw"
          className="aspect-[16/10] w-full"
        />

        <AnimatePresence>
          {hover && (
            <motion.span
              style={{ left: x, top: y, background: accent }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full px-6 py-6 font-mono text-[0.62rem] uppercase tracking-widest text-paper md:flex"
            >
              View →
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
