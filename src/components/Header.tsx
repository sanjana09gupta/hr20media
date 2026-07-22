"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnetic from "./Magnetic";

const nav = [
  { label: "People", href: "/work/people", code: "PPL" },
  { label: "Products", href: "/work/products", code: "PRD" },
  { label: "Food & Bev", href: "/work/food", code: "F&B" },
  { label: "Studio", href: "/#studio", code: "STD" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-paper/85 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="rail rail-border flex h-[60px] items-center justify-between px-5 sm:px-7">
          <Link
            href="/"
            aria-label="HR20MEDIA home"
            className="font-display text-[1.25rem] font-bold leading-none tracking-tight"
          >
            HR20<span className="text-accent">MEDIA</span>
          </Link>

          <nav className="hidden items-center md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 border-l border-line px-5 py-2 text-ink/85 transition-colors hover:text-ink"
              >
                <span className="ui-label text-[0.6rem] text-muted transition-colors group-hover:text-accent">
                  {item.code}
                </span>
                <span className="text-[0.82rem] font-medium">{item.label}</span>
              </Link>
            ))}
            <div className="border-l border-line pl-5">
              <Magnetic strength={0.3}>
                <Link
                  href="/#contact"
                  className="ui-label border border-ink px-4 py-2 text-[0.62rem] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  Start a project →
                </Link>
              </Magnetic>
            </div>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] border border-line md:hidden"
          >
            <span
              className={`h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[3.75px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
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
            className="blueprint fixed inset-0 z-40 flex flex-col bg-paper px-6 pt-24 pb-10 md:hidden"
          >
            <p className="ui-label mb-4 border-b border-line pb-3">
              Index / Navigation
            </p>
            <nav className="flex flex-col">
              {[...nav, { label: "Contact", href: "/#contact", code: "MSG" }].map(
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
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between border-b border-line py-4"
                    >
                      <span className="font-display text-4xl font-bold tracking-tight">
                        {item.label}
                      </span>
                      <span className="ui-label">{item.code}</span>
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
            <div className="ui-label mt-auto space-y-1 normal-case tracking-normal">
              <a href="mailto:info@hr20media.com" className="link-underline">
                info@hr20media.com
              </a>
              <p>Bournemouth, United Kingdom</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
