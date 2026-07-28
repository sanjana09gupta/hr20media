"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Shot } from "@/lib/gallery";

export default function Gallery({
  shots,
  accent = "var(--clay)",
}: {
  shots: Shot[];
  accent?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + shots.length) % shots.length)),
    [shots.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % shots.length)),
    [shots.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [index, close, prev, next]);

  const active = index === null ? null : shots[index];

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {shots.map((shot, i) => (
          <Tile
            key={shot.src}
            shot={shot}
            i={i}
            accent={accent}
            onOpen={() => setIndex(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-night/95 p-4 sm:p-8"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 text-sm tracking-wide text-paper/80 hover:text-paper"
            >
              Close ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 px-4 py-6 text-2xl text-paper/70 hover:text-paper sm:left-6"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 px-4 py-6 text-2xl text-paper/70 hover:text-paper sm:right-6"
            >
              ›
            </button>

            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[86vh] max-w-[92vw] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={active.w}
                height={active.h}
                sizes="92vw"
                className="max-h-[86vh] w-auto rounded-2xl object-contain"
                priority
              />
            </motion.div>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-paper/50">
              {(index ?? 0) + 1} / {shots.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Tile({
  shot,
  i,
  accent,
  onOpen,
}: {
  shot: Shot;
  i: number;
  accent: string;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-line ${
        loaded ? "" : "skeleton"
      }`}
      aria-label={`Open ${shot.alt}`}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <span className="absolute left-2 top-2 font-mono text-[0.6rem] uppercase tracking-widest text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-15"
        style={{ background: accent }}
      />
    </motion.button>
  );
}
