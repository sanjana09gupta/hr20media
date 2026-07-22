"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  amount?: number;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
};

/**
 * A bordered image cell that shows an animated skeleton shimmer until the photo
 * has actually loaded, then fades + eases the image in over it — so a frame is
 * never blank. Includes a gentle scroll parallax.
 */
export default function ImageFrame({
  src,
  alt,
  className = "",
  amount = 8,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${amount}%`, `${-amount}%`]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden border border-line ${
        loaded ? "" : "skeleton"
      } ${className}`}
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-[12%] h-[124%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      </motion.div>
      {children}
    </div>
  );
}
