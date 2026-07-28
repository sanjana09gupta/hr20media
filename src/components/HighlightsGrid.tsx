import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/gallery";
import Reveal from "./Reveal";

const [big, ...rest] = categories;

export default function HighlightsGrid() {
  return (
    <section className="px-5 py-16 sm:px-7 sm:py-24">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-clay">
            What we shoot
          </p>
          <h2 className="font-display mt-4 max-w-2xl text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[0.98] tracking-tight">
            Three disciplines, one frame at a time.
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          A quick look across the studio — tap any frame for the full
          portfolio.
        </p>
      </Reveal>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:grid-rows-2 md:h-[640px]">
        <Tile cat={big} delay={0} className="aspect-[4/5] md:row-span-2 md:aspect-auto" />
        {rest.map((cat, i) => (
          <Tile
            key={cat.slug}
            cat={cat}
            delay={(i + 1) * 100}
            className="aspect-[16/10] md:aspect-auto"
          />
        ))}
      </div>
    </section>
  );
}

function Tile({
  cat,
  delay,
  className = "",
}: {
  cat: (typeof categories)[number];
  delay: number;
  className?: string;
}) {
  return (
    <Reveal variant="img-reveal" delay={delay} className={`h-full ${className}`}>
      <Link
        href={`/work/${cat.slug}`}
        prefetch={false}
        className="group relative block h-full w-full overflow-hidden rounded-[1.75rem] bg-oat sm:rounded-[2.25rem]"
      >
        <Image
          src={cat.cover}
          alt={`${cat.title} photography`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />

        <span
          className="font-display absolute right-5 top-5 rounded-lg px-3 py-1.5 text-[0.78rem] font-bold tracking-tight text-paper shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)] sm:right-6 sm:top-6"
          style={{ background: cat.accent }}
        >
          {cat.code}
        </span>

        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6">
          <div>
            <h3 className="font-display text-2xl font-bold leading-none tracking-tight text-paper sm:text-3xl">
              {cat.title}
            </h3>
            <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-paper/75">
              {cat.tagline}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
