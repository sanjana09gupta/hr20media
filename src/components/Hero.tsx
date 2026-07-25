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
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* cycling background */}
      <div className="absolute inset-0 z-0">
        <CyclingImage
          images={reel}
          interval={4200}
          priority
          sizes="100vw"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/35 to-night/45" />
      </div>

      <div className="relative z-10 px-5 pb-14 pt-28 sm:px-7 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="text-xs font-medium uppercase tracking-[0.25em] text-paper/75"
        >
          Commercial Photography — Bournemouth, UK
        </motion.p>

        <h1 className="display-xl mt-5 text-[clamp(3rem,13vw,12rem)] text-paper">
          {lines.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.25 + i * 0.1, ease }}
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
          transition={{ duration: 1, delay: 0.7, ease }}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-[0.95rem] leading-relaxed text-paper/85">
            We manage your vision from concept to completion — pre-production,
            on-location shooting and precision post — for premium,
            high-definition imagery.
          </p>
          <div className="flex items-center gap-5">
            <Magnetic strength={0.4}>
              <Link
                href="/#work"
                className="rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-clay hover:text-paper"
              >
                View work
              </Link>
            </Magnetic>
            <Magnetic strength={0.5}>
              <Link
                href="/#contact"
                className="link-underline text-sm font-medium text-paper/90"
              >
                Start a project
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
