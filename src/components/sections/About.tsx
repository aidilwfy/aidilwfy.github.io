"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { education, journey, personal } from "@/data/personal";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "@/components/ui/Primitives";
import { TechLogo } from "@/components/ui/TechLogo";

export function About() {
  const { about } = personal;
  return (
    <Section id="about" labelledBy="about-title" className="border-t-0">
      <SectionHeading id="about-title" title={about.title} />

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-4 leading-relaxed text-muted">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "text-lg text-fg" : undefined}>
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.05} className="glass self-start rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-medium text-fg">What I focus on</h3>
          <ul className="space-y-2.5">
            {about.interests.map((i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-muted">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Education */}
      <Reveal className="mt-14">
        <h3 id="education" className="mb-4 text-sm font-medium text-fg">
          Education
        </h3>
        <div className="grid gap-5 md:grid-cols-2 md:items-start">
          {education.map((e) => (
            <article key={e.institution} className="glass flex flex-col overflow-hidden rounded-2xl">
              {e.image && (
                <div className="relative aspect-[16/8] bg-white/50">
                  <Image
                    src={e.image.src}
                    alt={e.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: e.image.position ?? "center" }}
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-fg shadow-sm">
                    {e.period}
                  </span>
                  {e.current && (
                    <span className="absolute top-3 right-3 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 shadow-sm ring-1 ring-emerald-600/15">
                      Current
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                {!e.image && <p className="text-sm text-subtle">{e.period}</p>}
                <h4 className="text-lg font-semibold tracking-tight">{e.institution}</h4>
                <ul className="mt-2 space-y-1">
                  {e.items.map((it) => (
                    <li key={it.title} className="text-sm text-fg/85">
                      {it.title}
                      {it.note && <span className="ml-1.5 text-xs font-medium text-accent">{it.note}</span>}
                    </li>
                  ))}
                </ul>
                {e.description && <p className="mt-3 text-sm leading-relaxed text-muted">{e.description}</p>}
                {e.learned && e.learned.length > 0 && (
                  <div className="mt-4 border-t border-line pt-4">
                    <p className="mb-2.5 text-xs font-semibold tracking-wide text-subtle uppercase">What I learned</p>
                    <ul className="grid gap-y-2">
                      {e.learned.map((l) => (
                        <li key={l} className="flex gap-2 text-sm leading-snug text-muted">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {e.highlights && e.highlights.length > 0 && (
                  <div className="mt-4 border-t border-line pt-4">
                    <p className="mb-2.5 text-xs font-semibold tracking-wide text-subtle uppercase">Projects</p>
                    <ul className="space-y-1.5">
                      {e.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-fg/85">
                          <TechLogo name={/python/i.test(h) ? "Python" : "web application"} size={16} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <h3 id="journey" className="mb-4 text-sm font-medium text-fg">
          My Development Journey
        </h3>
        <ol className="glass grid gap-x-10 rounded-2xl px-6 py-1 md:grid-cols-2 [&>li:last-child]:border-b-0 md:[&>li:nth-last-child(2)]:border-b-0">
          {journey.map((m) => (
            <li key={m.title} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-3.5">
              <span
                className={cn(
                  "text-sm",
                  m.award === "gold" ? "text-gold" : m.award === "bronze" ? "text-bronze" : "text-subtle",
                )}
              >
                {m.date ?? "—"}
              </span>
              <div>
                <p className="text-sm font-medium">{m.title}</p>
                <p className="mt-0.5 text-sm text-muted">{m.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
