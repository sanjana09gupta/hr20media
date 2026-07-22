import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    code: "PRE",
    title: "Pre-production",
    body: "Concepting, mood-boarding, shot lists, styling and logistics. We plan every frame before the shutter ever clicks so the shoot day runs clean.",
  },
  {
    n: "02",
    code: "SHOOT",
    title: "On-site execution",
    body: "Studio or on location, we direct lighting, composition and talent with a sharp artistic eye — capturing commercial-grade frames with room to art-direct live.",
  },
  {
    n: "03",
    code: "POST",
    title: "Technical post",
    body: "Selects, retouching, colour grading and delivery in every format you need — premium, high-definition imagery ready for web, print and campaign.",
  },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-7">
        <span className="ui-label">[ 03 ] — How we work</span>
        <span className="ui-label">Concept → Completion</span>
      </div>

      <div className="px-5 py-14 sm:px-7 sm:py-16">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
            A managed process, from concept to completion.
          </h2>
        </Reveal>
      </div>

      <div className="grid border-t border-line md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal
            key={s.n}
            delay={i * 110}
            className={`group flex flex-col border-line p-6 transition-colors duration-500 hover:bg-oat sm:p-8 ${
              i < 2 ? "border-b md:border-b-0 md:border-r" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-5xl font-bold text-line transition-colors duration-500 group-hover:text-clay">
                {s.n}
              </span>
              <span className="ui-label">{s.code}</span>
            </div>
            <h3 className="font-display mt-8 text-2xl font-bold tracking-tight">
              {s.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{s.body}</p>
            <span className="mt-8 h-px w-10 bg-ink/30 transition-all duration-500 group-hover:w-full group-hover:bg-clay" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
