"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;

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

  const textColor = overHero ? "text-paper" : "text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="rail flex h-[64px] items-center justify-between px-5 sm:px-7">
          <Link
            href="/"
            aria-label="HR20MEDIA home"
            className={`font-display text-[1.3rem] font-bold leading-none tracking-tight transition-colors ${textColor}`}
          >
            HR20<span className="text-clay">MEDIA</span>
          </Link>

          <nav className={`hidden items-center md:flex ${textColor}`}>
            <AnimatedBackground
              enableHover
              className={overHero ? "rounded-full bg-white/15" : "rounded-full bg-ink/10"}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-id={item.href}
                  className="rounded-full px-4 py-2 text-[0.85rem] font-medium opacity-85 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              ))}
            </AnimatedBackground>

            <div className="ml-4">
              <Magnetic strength={0.3}>
                <Link
                  href="/#contact"
                  className={`rounded-full border px-5 py-2 text-[0.8rem] font-semibold transition-colors duration-300 ${
                    overHero
                      ? "border-paper/60 hover:bg-paper hover:text-ink"
                      : "border-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  Start a project
                </Link>
              </Magnetic>
            </div>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden ${textColor}`}
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
