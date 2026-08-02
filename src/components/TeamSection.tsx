import Reveal from "./Reveal";

const team = [
  {
    name: "Sahil Kalash",
    role: "Managing Director",
    phone: "+44 7917 364333",
    tel: "+447917364333",
  },
  {
    name: "Mohit Prasad",
    role: "Head of Partnerships",
    phone: "077380866528",
    tel: "077380866528",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

export default function TeamSection() {
  return (
    <section className="border-t border-line px-5 py-16 sm:px-7 sm:py-24">
      <Reveal className="mb-10 sm:mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-clay">
          Our team
        </p>
        <h2 className="font-display mt-4 max-w-xl text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[0.98] tracking-tight">
          The people behind the frame.
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {team.map((person, i) => (
          <Reveal key={person.name} delay={i * 100}>
            <a
              href={`tel:${person.tel}`}
              className="group flex items-center gap-5 rounded-[1.75rem] border border-line bg-oat p-6 transition-colors duration-300 hover:border-clay sm:rounded-[2.25rem]"
            >
              <span className="font-display flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-night text-lg font-bold text-paper">
                {initials(person.name)}
              </span>
              <div>
                <p className="font-display text-lg font-bold tracking-tight text-ink">
                  {person.name}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-clay">
                  {person.role}
                </p>
                <p className="mt-2 text-sm text-muted">{person.phone}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
