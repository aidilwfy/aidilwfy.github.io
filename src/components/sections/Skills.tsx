"use client";

import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "@/components/ui/Primitives";
import { TechLogo } from "@/components/ui/TechLogo";

const coreOrder = ["Laravel", "PHP", "MySQL", "HTML5", "CSS3", "JavaScript"];

const categoryTint: Record<string, string> = {
  web: "bg-blue-50 text-blue-600 ring-blue-600/10",
  backend: "bg-cyan-50 text-cyan-700 ring-cyan-600/10",
  mobile: "bg-sky-50 text-sky-600 ring-sky-600/10",
  tools: "bg-indigo-50 text-indigo-600 ring-indigo-600/10",
};

export function Skills() {
  const core = skillCategories
    .flatMap((c) => c.skills)
    .filter((s) => s.core)
    .sort((a, b) => coreOrder.indexOf(a.name) - coreOrder.indexOf(b.name));

  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        title="Skills"
        description="Web development is my main focus — Laravel, PHP and MySQL on the back end, with HTML, CSS and JavaScript on the front end — supported by mobile development and a practical toolkit."
      />

      {/* Core stack */}
      <Reveal>
        <div className="glass rounded-2xl p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Core web stack</h3>
            <span className="text-xs text-subtle">What I build with most</span>
          </div>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {core.map((s) => (
              <li
                key={s.name}
                title={s.note}
                className="group flex flex-col items-center gap-2.5 rounded-xl bg-white/70 px-2 py-4 ring-1 ring-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-blue-900/10"
              >
                <TechLogo name={s.name} size={36} className="transition-transform duration-200 group-hover:scale-110" />
                <span className="text-center text-sm font-medium">{s.name}</span>
                {s.level && <span className="text-[11px] text-subtle">{s.level}</span>}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Categories */}
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {skillCategories.map((c, idx) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.id} delay={idx * 0.04}>
              <article className="glass h-full rounded-2xl p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl ring-1", categoryTint[c.id])}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-0.5 text-sm text-muted">{c.description}</p>
                  </div>
                </div>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {c.skills.map((s) => (
                    <li
                      key={s.name}
                      title={s.note}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg bg-white/65 px-3 py-2 text-sm ring-1 transition-colors hover:bg-white",
                        s.core ? "font-medium text-fg ring-accent/25" : "text-fg/80 ring-slate-900/5",
                      )}
                    >
                      <TechLogo name={s.name} size={18} />
                      <span className="leading-snug">{s.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
