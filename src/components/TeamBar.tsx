"use client";

import { useState } from "react";

const team = [
  { name: "Sahil Kalash", role: "MD", phone: "+44 7917 364333", tel: "+447917364333" },
  { name: "Mohit Prasad", role: "Partnerships", phone: "077380866528", tel: "077380866528" },
];

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 shrink-0"
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1z" />
    </svg>
  );
}

export default function TeamBar() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-ink px-3 py-1.5 text-paper sm:px-5">
      <div className="rail flex flex-wrap items-center justify-center gap-x-5 gap-y-1 sm:justify-end">
        {team.map((person, i) => (
          <button
            key={person.name}
            type="button"
            onClick={() => setOpen((v) => (v === i ? null : i))}
            className="inline-flex items-center gap-1.5 text-[0.68rem] font-medium opacity-85 transition-opacity hover:opacity-100"
          >
            <PhoneIcon />
            <span>
              {person.name} <span className="text-paper/55">({person.role})</span>
            </span>
            {open === i && (
              <a
                href={`tel:${person.tel}`}
                onClick={(e) => e.stopPropagation()}
                className="ml-1 font-semibold text-clay underline underline-offset-2"
              >
                {person.phone}
              </a>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
