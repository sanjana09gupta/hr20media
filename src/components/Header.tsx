"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnetic from "./Magnetic";
import AnimatedBackground from "./AnimatedBackground";
import TeamBar from "./TeamBar";
import logo from "@/app/icon.jpg";

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

  // dark pill over the dark hero photo, light pill everywhere else — the
  // pill itself is always fully opaque, it just switches which "everywhere
  // else" it needs to sit cleanly on top of
  const overHero = pathname === "/" && !scrolled;

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
      <header className="fixed inset-x-0 top-0 z-50">
        <TeamBar />
        <div className="px-3 sm:px-5">
        <div
          className={`rail flex h-[60px] items-center justify-between gap-4 rounded-b-[1.75rem] border border-t-0 px-4 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-500 sm:h-[64px] sm:rounded-b-[2.25rem] sm:px-5 ${
            overHero
              ? "border-paper/15 bg-night/80 text-paper"
              : "border-line bg-paper/90 text-ink"
          }`}
        >
          <Link href="/" aria-label="HR20MEDIA home" className="flex items-center gap-2.5">
            <Image
              src={logo}
              alt="HR20MEDIA"
              className="h-9 w-9 shrink-0 rounded-xl object-contain"
              priority
            />
            <span className="font-display text-[1.15rem] font-bold leading-none tracking-tight">
              HR20<span className="text-clay">MEDIA</span>
            </span>
          </Link>

          <nav className="hidden items-center md:flex">
            <AnimatedBackground
              enableHover
              className={`rounded-full transition-colors duration-500 ${
                overHero ? "bg-paper/15" : "bg-ink/8"
              }`}
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
                  className={`rounded-full px-5 py-2 text-[0.8rem] font-semibold transition-colors duration-300 hover:bg-clay hover:text-paper ${
                    overHero ? "bg-paper text-ink" : "bg-ink text-paper"
                  }`}
                >
                  Start a project
                </Link>
              </Magnetic>
              <Magnetic strength={0.4}>
                <Link
                  href="/#contact"
                  aria-hidden
                  tabIndex={-1}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 hover:bg-clay hover:text-paper hover:border-clay ${
                    overHero
                      ? "border-paper/40 text-paper"
                      : "border-ink/25 text-ink"
                  }`}
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
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[6px] md:hidden"
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
