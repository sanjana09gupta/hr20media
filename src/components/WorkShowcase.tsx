"use client";

import { useReducedMotion } from "motion/react";
import { categories, galleries, type CategorySlug } from "@/lib/gallery";
import Reveal from "./Reveal";
import WorkRow from "./WorkRow";
import WorkStack from "./WorkStack";

export default function WorkShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="scroll-mt-20">
      <div className="px-5 pb-10 pt-16 sm:px-7 sm:pt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-clay">
              Selected Work
            </p>
            <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,4.25rem)] font-bold leading-[0.98] tracking-tight">
              Three disciplines,
              <br />
              one obsessive <span className="text-clay italic">standard.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            A sharp artistic eye paired with the technical precision commercial
            work demands. Select a portfolio to explore.
          </p>
        </Reveal>
      </div>

      {reduceMotion ? (
        <div className="border-t border-line">
          {categories.map((cat, i) => (
            <WorkRow
              key={cat.slug}
              index={i}
              slug={cat.slug}
              title={cat.title}
              tagline={cat.tagline}
              blurb={cat.blurb}
              images={galleries[cat.slug as CategorySlug].map((s) => s.src)}
              accent={cat.accent}
            />
          ))}
        </div>
      ) : (
        <WorkStack />
      )}
    </section>
  );
}
