"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  interval?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** slow ken-burns zoom on each frame */
  kenBurns?: boolean;
};

/**
 * Crossfades through a list of images on a timer so a slot's imagery keeps
 * changing on its own. Pauses when the tab is hidden. Respects reduced motion
 * (shows the first image, no cycling).
 */
export default function CyclingImage({
  images,
  interval = 4000,
  sizes = "100vw",
  priority = false,
  className = "",
  kenBurns = true,
}: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let id: number;
    const tick = () => setI((p) => (p + 1) % images.length);
    const start = () => {
      id = window.setInterval(() => {
        if (!document.hidden) tick();
      }, interval);
    };
    start();
    return () => window.clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: kenBurns ? 1.08 : 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: interval / 1000 + 1.2, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[i]}
            alt=""
            fill
            priority={priority && i === 0}
            sizes={sizes}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
