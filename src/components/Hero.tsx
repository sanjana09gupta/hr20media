"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

// a few recent shoot subjects, shown as a small preview stack
const recentShots = [
  galleries.people[2],
  galleries.people[8],
  galleries.people[13],
  galleries.people[21],
];

// secondary detail reel for the floating corner tile
const detailReel = [galleries.products[2].src, galleries.food[3].src, galleries.products[9].src];

const quickLinks = [
  { label: "Portraits", href: "/work/people" },
  { label: "Products", href: "/work/products" },
  { label: "Food & Bev", href: "/work/food" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden rounded-[2rem] sm:rounded-[3.5rem] lg:rounded-[4.5rem]">
      {/* cycling background — full photo, no crop */}
      <div className="absolute inset-0 z-0 bg-night">
        <CyclingImage
          images={reel}
          interval={4200}
          priority
          sizes="100vw"
          fit="contain"
          kenBurns={false}
          onIndexChange={setActive}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-night/30" />
      </div>

      {/* floating eyebrow chip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="absolute left-5 top-24 z-10 sm:left-7 sm:top-28"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-paper/85 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          Commercial Photography — Bournemouth, UK
        </span>
      </motion.div>

      {/* corner mark, balancing the eyebrow chip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="absolute right-5 top-24 z-10 flex items-center gap-1.5 rounded-full border border-paper/25 bg-paper/10 px-3 py-2.5 backdrop-blur-md sm:right-7 sm:top-28"
      >
        <span className="h-1 w-1 rounded-full bg-paper/70" />
        <span className="h-1 w-1 rounded-full bg-paper/70" />
        <span className="h-1 w-1 rounded-full bg-paper/70" />
      </motion.div>

      {/* floating detail tile — a second, smaller reel */}
      <motion.div
        initial={{ opacity: 0, x: 24, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
        className="absolute right-6 top-[26%] z-10 hidden w-[13rem] lg:block xl:w-[15rem]"
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-paper/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
          <CyclingImage
            images={detailReel}
            interval={3600}
            fit="contain"
            kenBurns={false}
            sizes="15rem"
            className="aspect-[4/3] w-full bg-night/60"
          />
        </div>
        <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-paper/20 bg-night/30 px-4 py-2 text-[0.72rem] font-medium text-paper/85 backdrop-blur-md">
          Studio &amp; on-location
        </span>
      </motion.div>

      {/* decorative stripe texture, left edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-24 opacity-[0.07] lg:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--paper) 0px, var(--paper) 2px, transparent 2px, transparent 14px)",
        }}
      />

      {/* frame index dots, synced to the cycling reel */}
      <div className="absolute bottom-14 right-5 z-10 hidden items-center gap-1.5 sm:flex sm:right-7">
        {reel.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-6 bg-clay" : "w-1.5 bg-paper/40"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 px-5 pb-14 pt-28 sm:px-7 sm:pb-20">
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
          <div className="flex items-center gap-3">
            <Magnetic strength={0.5}>
              <Link
                href="/#work"
                aria-hidden
                tabIndex={-1}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink"
              >
                ↗
              </Link>
            </Magnetic>
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease }}
          className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-paper/15 pt-6"
        >
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                prefetch={false}
                className="rounded-full border border-paper/20 px-4 py-1.5 text-xs font-medium text-paper/80 transition-colors duration-300 hover:border-paper/50 hover:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link
            href="/work/people"
            prefetch={false}
            className="group flex items-center gap-3"
          >
            <div className="flex -space-x-3">
              {recentShots.map((shot) => (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  width={40}
                  height={40}
                  className="h-9 w-9 rounded-full border-2 border-night/60 object-cover ring-1 ring-paper/30 transition-transform duration-300 group-hover:-translate-y-1 sm:h-10 sm:w-10"
                />
              ))}
            </div>
            <span className="link-underline text-xs text-paper/70 transition-colors duration-300 group-hover:text-paper">
              Recent shoots
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
