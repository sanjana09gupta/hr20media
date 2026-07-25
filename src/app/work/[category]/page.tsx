import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, galleries, type CategorySlug } from "@/lib/gallery";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Work" };
  return { title: `${cat.title} Photography`, description: cat.blurb };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const shots = galleries[cat.slug as CategorySlug];
  const idx = categories.findIndex((c) => c.slug === cat.slug);
  const nextCat = categories[(idx + 1) % categories.length];

  return (
    <>
      <div className="flex items-center justify-between border-b border-line px-5 py-4 pt-[80px] text-xs uppercase tracking-[0.2em] text-muted sm:px-7">
        <Link href="/#work" className="transition-colors hover:text-ink">
          ← All work
        </Link>
        <span>{shots.length} frames</span>
      </div>

      <header className="px-5 py-16 sm:px-7 sm:py-24">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: cat.accent }}
              />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                {cat.tagline}
              </span>
            </div>
            <h1
              className="font-display text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.9] tracking-tight"
              style={{ color: cat.accent }}
            >
              {cat.title}
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {cat.blurb}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="border-t border-line px-5 py-10 sm:px-7">
        <Gallery shots={shots} accent={cat.accent} />
      </section>

      <section className="border-t border-line">
        <Link
          href={`/work/${nextCat.slug}`}
          className="group flex items-center justify-between px-5 py-16 sm:px-7 sm:py-24"
        >
          <div>
            <p className="ui-label">Next portfolio →</p>
            <p
              className="font-display mt-3 text-[clamp(2rem,6vw,4.5rem)] font-bold leading-none tracking-tight transition-colors duration-300"
              style={{ color: undefined }}
            >
              <span className="transition-colors duration-300 group-hover:text-[color:var(--clay)]">
                {nextCat.title}
              </span>
            </p>
          </div>
          <span className="font-display text-4xl transition-transform duration-300 group-hover:translate-x-2 sm:text-6xl">
            →
          </span>
        </Link>
      </section>
    </>
  );
}
