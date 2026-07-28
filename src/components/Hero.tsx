"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Magnetic from "./Magnetic";
import CyclingImage from "./CyclingImage";
import { galleries } from "@/lib/gallery";

const ease = [0.16, 1, 0.3, 1] as const;
const lines = ["Inspiration", "into", "Reality"];

// a curated hero reel — new model shots up front, with a little variety
const reel = [
  galleries.people[0].src,
  galleries.people[4].src,
  galleries.food[0].src,
  galleries.people[10].src,
  galleries.products[4].src,
  galleries.people[17].src,
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[64px]">
      {/* masthead dateline — the paper's own front-page strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="flex items-center justify-between border-b-2 border-ink px-5 py-2.5 sm:px-7"
      >
        <p className="ui-label text-ink/70">
          Commercial Photography — Bournemouth, UK
        </p>
        <p className="ui-label hidden text-ink/70 sm:block">Front Page</p>
      </motion.div>

      {/* headline — set on solid paper ground, never over a photograph */}
      <div className="border-b border-line px-5 pb-14 pt-10 sm:px-7 sm:pb-16 sm:pt-14">
        <h1 className="display-xl text-[clamp(3rem,13vw,10.5rem)] text-ink">
          {lines.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.15 + i * 0.1, ease }}
                className={`block ${i === 2 ? "text-clay italic" : ""}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
          className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-[1.05rem] leading-relaxed text-ink-2">
            We manage your vision from concept to completion — pre-production,
            on-location shooting and precision post — for premium,
            high-definition imagery.
          </p>
          <div className="flex items-center gap-6">
            <Magnetic strength={0.4}>
              <Link
                href="/#work"
                className="ui-label border-2 border-ink bg-ink px-6 py-3 text-paper transition-colors duration-300 hover:border-clay hover:bg-clay"
              >
                View work
              </Link>
            </Magnetic>
            <Magnetic strength={0.5}>
              <Link href="/#contact" className="link-underline text-sm font-medium text-ink">
                Start a project
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* the front-page plate — photography boxed and captioned, not floated */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease }}
        className="px-5 py-8 sm:px-7 sm:py-10"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-night sm:aspect-[21/9]">
          <CyclingImage
            images={reel}
            interval={4200}
            priority
            sizes="100vw"
            fit="contain"
            kenBurns={false}
            className="h-full w-full"
          />
        </div>
        <p className="ui-label mt-3 text-muted">
          Plate 01 — Selected work, People · Products · Food &amp; Beverage
        </p>
      </motion.div>
    </section>
  );
}
