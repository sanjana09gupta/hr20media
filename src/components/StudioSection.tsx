import ImageFrame from "./ImageFrame";
import Reveal from "./Reveal";
import ScrollRevealText from "./ScrollRevealText";

const stats = [
  { value: "Concept→Delivery", label: "Full-service production" },
  { value: "High-Definition", label: "Commercial-grade output" },
  { value: "Bournemouth", label: "On location & in-studio" },
];

export default function StudioSection() {
  return (
    <section id="studio" className="scroll-mt-20 border-t border-line bg-oat">
      <div className="grid gap-0 md:grid-cols-12">
        <div className="border-line px-5 py-16 sm:px-7 sm:py-24 md:col-span-7 md:border-r">
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.25em] text-clay">
            The Studio
          </p>
          <ScrollRevealText
            text="HR20MEDIA oversees every stage of a shoot — from the first mood board to the final, colour-graded frame. The result is imagery with the artistry to move people and the precision to perform commercially."
            className="font-display text-[clamp(1.8rem,3.4vw,2.9rem)] font-medium leading-[1.14] tracking-tight text-ink"
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <p className="font-display text-lg font-bold tracking-tight text-ink">
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
        </div>
      </div>
    </section>
  );
}
