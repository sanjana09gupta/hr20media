import ImageFrame from "./ImageFrame";
import Reveal from "./Reveal";
import ScrollRevealText from "./ScrollRevealText";

const stats = [
  { value: "Concept→Delivery", label: "Full-service production", code: "SVC" },
  { value: "High-Definition", label: "Commercial-grade output", code: "OUT" },
  { value: "Bournemouth", label: "On location & in-studio", code: "LOC" },
];

export default function StudioSection() {
  return (
    <section id="studio" className="scroll-mt-20 bg-oat">
      <div className="flex items-center justify-between border-y border-line px-5 py-3 sm:px-7">
        <span className="ui-label">[ 02 ] — The Studio</span>
        <span className="ui-label">About / Approach</span>
      </div>

      <div className="grid gap-0 md:grid-cols-12">
        <div className="border-line px-5 py-14 sm:px-7 sm:py-20 md:col-span-7 md:border-r">
          <ScrollRevealText
            text="HR20MEDIA oversees every stage of a shoot — from the first mood board to the final, colour-graded frame. The result is imagery with the artistry to move people and the precision to perform commercially."
            className="font-display text-[clamp(1.8rem,3.4vw,2.9rem)] font-medium leading-[1.14] tracking-tight text-ink"
          />

          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="bg-oat p-5">
                <span className="ui-label text-[0.6rem]">{s.code}</span>
                <p className="font-display mt-4 text-lg font-bold tracking-tight text-ink">
                  {s.value}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-7 md:col-span-5">
          <ImageFrame
            src="/images/products/products-05.jpg"
            alt="Behind the craft at HR20MEDIA"
            amount={10}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="aspect-[4/5] h-full w-full"
          />
          <p className="ui-label mt-3">Fig.02 — In the studio</p>
        </div>
      </div>
    </section>
  );
}
