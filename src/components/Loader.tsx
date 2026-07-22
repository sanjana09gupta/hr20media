"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";

const ease = [0.76, 0, 0.24, 1] as const;

export default function Loader() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    // Only play once per browser session, and respect reduced motion.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || sessionStorage.getItem("hr20-intro")) return;

    sessionStorage.setItem("hr20-intro", "1");
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const controls = animate(count, 100, { duration: 1.6, ease: "easeInOut" });
    const t = window.setTimeout(() => setDone(true), 2000);
    const t2 = window.setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 2900);

    return () => {
      controls.stop();
      window.clearTimeout(t);
      window.clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, [count]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night text-paper"
          initial={{ y: 0 }}
          animate={done ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,10vw,7rem)] font-bold tracking-tight"
            >
              HR20<span className="text-clay">MEDIA</span>
            </motion.h1>
          </div>

          <span className="ui-label absolute left-6 top-24 text-sand/50 sm:left-10">
            Loading studio…
          </span>

          <div className="absolute bottom-8 right-6 flex items-baseline gap-1 sm:right-10">
            <motion.span className="font-mono text-5xl font-bold tabular-nums sm:text-7xl">
              {rounded}
            </motion.span>
            <span className="text-lg text-clay">%</span>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
