"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Magnetic from "./Magnetic";
import ImageFrame from "./ImageFrame";

const ease = [0.16, 1, 0.3, 1] as const;
const lines = ["Inspiration", "into", "Reality"];

export default function Hero() {
  return (
    <section className="blueprint relative flex min-h-[100svh] flex-col pt-[60px]">
      {/* technical meta strip */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-7">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="ui-label flex items-center gap-2"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-clay" />
          Available for commissions
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="ui-label"
        >
          Bournemouth, UK — Est. 2026
        </motion.span>
      </div>

      {/* headline */}
      <div className="px-5 pt-10 sm:px-7 sm:pt-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="ui-label max-w-md"
        >
          [ 00 ] — Commercial Photography Studio · People / Products / Food
        </motion.p>

        <h1 className="display-xl mt-5 text-[clamp(3rem,13vw,12rem)]">
          {lines.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.25 + i * 0.11, ease }}
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
          <p className="max-w-md text-[0.95rem] leading-relaxed text-ink-2">
            We manage your vision from concept to completion — pre-production,
            on-location shooting and precision post — for premium,
            high-definition imagery.
          </p>
          <div className="flex items-center gap-5">
            <Magnetic strength={0.4}>
              <Link
                href="/#work"
                className="ui-label border border-ink bg-ink px-6 py-3 text-[0.66rem] text-paper transition-colors duration-300 hover:bg-clay hover:border-clay"
              >
                View work →
              </Link>
            </Magnetic>
            <Magnetic strength={0.5}>
              <Link
                href="/#contact"
                className="link-underline text-sm font-medium text-ink"
              >
                Start a project
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* framed hero image panel */}
      <div className="mt-10 flex-1 border-t border-line px-5 pb-5 pt-5 sm:px-7 sm:pb-7">
        <ImageFrame
          src="/images/people/people-09.jpg"
          alt="HR20MEDIA commercial photography"
          amount={6}
          priority
          sizes="100vw"
          className="h-[46vh] min-h-[280px] w-full sm:h-[52vh]"
        >
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between bg-paper/85 px-4 py-2 backdrop-blur-sm">
            <span className="ui-label">Fig.01 — Selected frame</span>
            <span className="ui-label">Scroll ↓</span>
          </div>
        </ImageFrame>
      </div>
    </section>
  );
}
