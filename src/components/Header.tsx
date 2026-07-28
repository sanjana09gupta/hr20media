"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnetic from "./Magnetic";
import AnimatedBackground from "./AnimatedBackground";

const nav = [
  { label: "People", href: "/work/people" },
  { label: "Products", href: "/work/products" },
  { label: "Food & Bev", href: "/work/food" },
  { label: "Studio", href: "/#studio" },
];

function ApertureMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M12 4v2.4M12 17.6V20M20 12h-2.4M6.4 12H4M17.3 6.7l-1.7 1.7M8.4 15.6l-1.7 1.7M17.3 17.3l-1.7-1.7M8.4 8.4 6.7 6.7" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="rail flex h-[60px] items-center justify-between gap-4 rounded-full bg-night px-4 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.55)] sm:h-[64px] sm:px-5">
          <Link
            href="/"
            aria-label="HR20MEDIA home"
            className="flex items-center gap-2.5 text-paper"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-clay">
              <ApertureMark />
            </span>
            <span className="font-display text-[1.15rem] font-bold leading-none tracking-tight">
              HR20<span className="text-clay">MEDIA</span>
            </span>
          </Link>

          <nav className="hidden items-center text-paper md:flex">
            <AnimatedBackground
              enableHover
              className="rounded-full bg-paper/15"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  data-id={item.href}
                  className="rounded-full px-4 py-2 text-[0.85rem] font-medium opacity-85 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              ))}
            </AnimatedBackground>

            <div className="ml-3 flex items-center gap-2">
              <Magnetic strength={0.3}>
                <Link
                  href="/#contact"
                  className="rounded-full bg-paper px-5 py-2 text-[0.8rem] font-semibold text-ink transition-colors duration-300 hover:bg-clay hover:text-paper"
                >
                  Start a project
                </Link>
              </Magnetic>
              <Magnetic strength={0.4}>
                <Link
                  href="/#contact"
                  aria-hidden
                  tabIndex={-1}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink"
                >
                  ↗
                </Link>
              </Magnetic>
            </div>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[6px] text-paper md:hidden"
          >
            <span
              className={`h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.75px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3.75px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pt-24 pb-10 md:hidden"
          >
            <nav className="flex flex-col">
              {[...nav, { label: "Contact", href: "/#contact" }].map(
                (item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.08 + i * 0.06,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      prefetch={false}
                      onClick={() => setOpen(false)}
                      className="font-display block border-b border-line py-4 text-4xl font-bold tracking-tight"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
            <div className="mt-auto text-sm text-muted">
              <a href="mailto:info@hr20media.com" className="link-underline">
                info@hr20media.com
              </a>
              <p className="mt-1">Bournemouth, United Kingdom</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
