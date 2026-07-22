import { categories } from "@/lib/gallery";
import Reveal from "./Reveal";
import WorkRow from "./WorkRow";

export default function WorkShowcase() {
  return (
    <section id="work" className="scroll-mt-20">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-7">
        <span className="ui-label">[ 01 ] — Selected Work</span>
        <span className="ui-label">03 Disciplines</span>
      </div>

      <div className="px-5 py-14 sm:px-7 sm:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-3xl text-[clamp(2.2rem,5.5vw,4.25rem)] font-bold leading-[0.98] tracking-tight">
            Three disciplines,
            <br />
            one obsessive <span className="text-clay italic">standard.</span>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            A sharp artistic eye paired with the technical precision commercial
            work demands. Select a portfolio to explore.
          </p>
        </Reveal>
      </div>

      <div className="border-t border-line">
        {categories.map((cat, i) => (
          <WorkRow
            key={cat.slug}
            index={i}
            slug={cat.slug}
            title={cat.title}
            tagline={cat.tagline}
            blurb={cat.blurb}
            cover={cat.cover}
            accent={cat.accent}
            code={cat.code}
          />
        ))}
      </div>
    </section>
  );
}
