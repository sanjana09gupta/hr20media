"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

const projectTypes = [
  { label: "People / Portraits", code: "PPL" },
  { label: "Products / E-comm", code: "PRD" },
  { label: "Food & Beverages", code: "F&B" },
  { label: "Something else", code: "ETC" },
];

const field =
  "w-full border border-line bg-paper/60 px-4 py-3 text-ink placeholder:text-muted focus:border-clay focus:outline-none transition-colors";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = `${get("firstName")} ${get("lastName")}`.trim();
    const subject = `New project enquiry — ${get("projectType") || "General"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Project type: ${get("projectType")}`,
      "",
      "Project details:",
      get("details"),
    ].join("\n");
    window.location.href = `mailto:info@hr20media.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line bg-oat">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-line px-5 py-16 sm:px-7 sm:py-24 md:border-r">
          <Reveal>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-clay">
              Start a project
            </p>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold leading-[0.98] tracking-tight">
              Let&apos;s make
              <br />
              something worth
              <br />
              <span className="text-clay italic">looking at.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
            <div className="bg-oat p-5">
              <p className="ui-label">Email</p>
              <a
                href="mailto:info@hr20media.com"
                className="link-underline mt-2 inline-block font-medium"
              >
                info@hr20media.com
              </a>
            </div>
            <div className="bg-oat p-5">
              <p className="ui-label">Studio</p>
              <p className="mt-2 font-medium text-ink">
                Bournemouth, United Kingdom
              </p>
            </div>
          </Reveal>
        </div>

        <div className="px-5 py-14 sm:px-7 sm:py-20">
          <Reveal delay={80}>
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-start justify-center">
                <span className="ui-label text-clay">Transmitted ✓</span>
                <p className="font-display mt-4 text-3xl font-bold tracking-tight">
                  Thank you.
                </p>
                <p className="mt-4 max-w-sm text-muted">
                  Your email draft is ready in your mail app — hit send and
                  we&apos;ll be in touch shortly. Prefer to write directly?{" "}
                  <a
                    href="mailto:info@hr20media.com"
                    className="link-underline text-ink"
                  >
                    info@hr20media.com
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="firstName" required placeholder="First name" className={field} />
                  <input name="lastName" required placeholder="Last name" className={field} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="email" type="email" required placeholder="Email" className={field} />
                  <input name="phone" type="tel" placeholder="Phone (optional)" className={field} />
                </div>

                <div className="mt-2">
                  <p className="ui-label mb-3">Project type</p>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((t) => (
                      <label
                        key={t.label}
                        className="ui-label cursor-pointer border border-line px-3 py-2 text-ink/80 transition-colors has-[:checked]:border-clay has-[:checked]:bg-clay has-[:checked]:text-paper"
                      >
                        <input type="radio" name="projectType" value={t.label} className="sr-only" />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  name="details"
                  required
                  rows={4}
                  placeholder="Tell us about your project…"
                  className={`${field} resize-none`}
                />

                <Magnetic strength={0.4} className="mt-2 self-start">
                  <button
                    type="submit"
                    className="ui-label border border-ink bg-ink px-8 py-3.5 text-[0.66rem] text-paper transition-colors duration-300 hover:bg-clay hover:border-clay"
                  >
                    Send enquiry →
                  </button>
                </Magnetic>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
