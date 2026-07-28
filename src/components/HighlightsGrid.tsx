import Image from "next/image";
import Link from "next/link";
import { categories, galleries } from "@/lib/gallery";
import Reveal from "./Reveal";

const [big, ...rest] = categories; // People (tall), then Products, Food & Bev
const totalFrames = Object.values(galleries).reduce((n, g) => n + g.length, 0);

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

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:grid-rows-2 md:h-[600px]">
        <StatTile
          value={`${totalFrames}+`}
          label="Frames delivered"
          arrow="↗"
          delay={0}
          className="md:col-start-1 md:row-start-1"
        />
        <Tile
          cat={rest[0]}
          delay={80}
          className="aspect-[16/10] md:col-start-1 md:row-start-2 md:aspect-auto"
        />
        <Tile
          cat={big}
          delay={140}
          className="aspect-[4/5] md:col-start-2 md:row-span-2 md:aspect-auto"
        />
        <Tile
          cat={rest[1]}
          delay={200}
          className="aspect-[16/10] md:col-start-3 md:row-start-1 md:aspect-auto"
        />
        <StatTile
          value={String(categories.length)}
          label="Disciplines shot"
          arrow="↙"
          delay={260}
          className="md:col-start-3 md:row-start-2"
        />
      </div>
    </section>
  );
}

function StatTile({
  value,
  label,
  arrow,
  delay,
  className = "",
}: {
  value: string;
  label: string;
  arrow: string;
  delay: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} className={`h-full min-h-[140px] ${className}`}>
      <div className="flex h-full w-full flex-col justify-between rounded-[1.75rem] border border-line bg-night px-6 py-6 text-paper sm:rounded-[2.25rem]">
        <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {value}
        </span>
        <div className="flex items-end justify-between gap-3">
          <span className="text-xs text-paper/70">{label}</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper/10 text-paper">
            {arrow}
          </span>
        </div>
      </div>
    </Reveal>
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
          sizes="(max-width: 768px) 100vw, 34vw"
          className="object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night/85 via-night/25 to-transparent" />

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
