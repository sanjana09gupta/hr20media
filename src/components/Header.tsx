"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnetic from "./Magnetic";

const nav = [
  { label: "People", href: "/work/people" },
  { label: "Products", href: "/work/products" },
  { label: "Food & Bev", href: "/work/food" },
  { label: "Studio", href: "/#studio" },
];

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
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper">
        <div className="rail flex h-[64px] items-center justify-between px-5 sm:px-7">
          <Link
            href="/"
            aria-label="HR20MEDIA home"
            className="font-display text-2xl leading-none tracking-tight text-ink"
          >
            HR20<span className="text-clay">MEDIA</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="link-underline ui-label text-ink/80"
              >
                {item.label}
              </Link>
            ))}

            <Magnetic strength={0.3}>
              <Link
                href="/#contact"
                className="ui-label border-2 border-ink px-5 py-2.5 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                Start a project
              </Link>
            </Magnetic>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] text-ink md:hidden"
          >
            <span
              className={`h-[1.5px] w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.75px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-current transition-transform duration-300 ${
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
            className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-10 pt-24 md:hidden"
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
                      className="font-display block border-b border-line py-4 text-4xl tracking-tight"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
            <div className="ui-label mt-auto text-muted">
              <a href="mailto:info@hr20media.com" className="link-underline">
                info@hr20media.com
              </a>
              <p className="mt-2 normal-case tracking-normal">
                Bournemouth, United Kingdom
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
