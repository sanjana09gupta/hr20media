"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "motion/react";

const items = [
  "Product Photography",
  "Portraits",
  "Food & Beverage",
  "E-commerce",
  "Campaigns",
  "Editorial",
  "Packaging",
  "Brand Stories",
];

/**
 * A marquee whose base speed is constant, but scroll velocity/direction warps
 * it — scroll down and it races forward, scroll up and it reverses. Pure
 * Framer Motion (useVelocity + useAnimationFrame).
 */
export default function Marquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const row = [...items, ...items, ...items, ...items];
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * 2.4 * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-line bg-oat py-5"
    >
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-display mx-6 inline-flex items-center gap-6 text-2xl font-medium tracking-tight text-ink/75 sm:text-3xl"
          >
            {item}
            <span className="font-mono text-base text-clay">/</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
