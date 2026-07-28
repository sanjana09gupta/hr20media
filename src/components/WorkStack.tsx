"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type MotionValue,
} from "motion/react";
import CyclingImage from "./CyclingImage";
import { categories, galleries, type CategorySlug } from "@/lib/gallery";

const ease = [0.16, 1, 0.3, 1] as const;
const N = categories.length;

/** clamp v to [0, 1) so the floor never lands outside 0..N-1 */
function indexFromProgress(v: number) {
  return Math.min(N - 1, Math.max(0, Math.floor(v * N)));
}

/**
 * A pinned scroll section — the viewport holds still while the three work
 * categories jump in one after another as the user scrolls. Only one panel
 * is ever active at a time (a single index drives every panel + dot), so
 * there's no way for two categories to render on top of each other.
 */
export default function WorkStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(indexFromProgress(v));
  });

  return (
    <div
      ref={ref}
      className="relative border-t border-line"
      style={{ height: `${N * 130}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {categories.map((cat, i) => (
          <Panel key={cat.slug} index={i} cat={cat} active={active} />
        ))}

        {/* progress rail */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-1/2 sm:left-auto sm:right-7 sm:translate-x-0 sm:translate-y-1/2 sm:flex-col">
          {categories.map((cat, i) => (
            <Dot key={cat.slug} isActive={active === i} accent={cat.accent} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Panel({
  index,
  cat,
  active,
}: {
  index: number;
  cat: (typeof categories)[number];
  active: number;
}) {
  const isActive = active === index;
  const passed = active > index;

  const [hover, setHover] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bx = useSpring(mx, { stiffness: 250, damping: 22, mass: 0.4 });
  const by = useSpring(my, { stiffness: 250, damping: 22, mass: 0.4 });
  const onMove = (e: React.MouseEvent) => {
    const r = areaRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : passed ? -48 : 48,
        scale: isActive ? 1 : 0.94,
      }}
      transition={{ duration: 0.55, ease }}
      className={`absolute inset-0 flex items-center px-5 sm:px-7 ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <Link
        href={`/work/${cat.slug}`}
        prefetch={false}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 mx-auto md:grid-cols-12 md:gap-12"
      >
        <div className="md:col-span-5">
          <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            <span
              className="font-display rounded-lg px-2.5 py-1 text-[0.75rem] font-bold text-paper"
              style={{ background: cat.accent }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {cat.tagline}
          </span>
          <h3 className="font-display mt-4 text-[clamp(2.4rem,5.5vw,4.75rem)] font-extrabold leading-[0.95] tracking-tight">
            {cat.title}
          </h3>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
            {cat.blurb}
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
          className="relative md:col-span-7"
        >
          <CyclingImage
            images={galleries[cat.slug as CategorySlug].map((s) => s.src)}
            interval={3200 + index * 400}
            eager
            fit="contain"
            kenBurns={false}
            sizes="(max-width: 768px) 100vw, 58vw"
            className="aspect-[4/3] w-full rounded-[2rem] bg-oat sm:rounded-[2.5rem]"
          />

          <AnimatePresence>
            {hover && (
              <motion.span
                style={{ left: bx, top: by, background: cat.accent }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.3, ease }}
                className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full px-6 py-6 text-[0.62rem] font-semibold uppercase tracking-widest text-paper md:flex"
              >
                View →
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
}

function Dot({ isActive, accent }: { isActive: boolean; accent: string }) {
  return (
    <span
      style={{ background: isActive ? accent : "var(--line)" }}
      className={`rounded-full transition-all duration-500 ${
        isActive ? "h-1.5 w-6 sm:h-6 sm:w-1.5" : "h-1.5 w-1.5"
      }`}
    />
  );
}
