"use client";

import { Medal, Star, Trophy } from "lucide-react";
import { achievements } from "@/data/achievements";
import type { Achievement } from "@/types";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "@/components/ui/Primitives";

const styles: Record<Achievement["level"], { icon: typeof Trophy; border: string; badge: string; text: string }> = {
  gold: {
    icon: Trophy,
    border: "border-l-gold",
    badge: "bg-amber-50 text-amber-700 ring-amber-600/15",
    text: "text-gold",
  },
  silver: {
    icon: Medal,
    border: "border-l-slate-400",
    badge: "bg-slate-100 text-slate-600 ring-slate-500/20",
    text: "text-slate-600",
  },
  star: {
    icon: Star,
    border: "border-l-indigo-500",
    badge: "bg-indigo-50 text-indigo-600 ring-indigo-600/15",
    text: "text-indigo-600",
  },
  bronze: {
    icon: Medal,
    border: "border-l-bronze",
    badge: "bg-orange-50 text-orange-700 ring-orange-600/15",
    text: "text-bronze",
  },
};

export function Achievements() {
  return (
    <Section id="achievements" labelledBy="achievements-title">
      <SectionHeading
        id="achievements-title"
        title="Awards"
        description="Recognition from innovation competitions for turning ideas into working digital solutions."
      />

      <Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {achievements.map((a) => {
            const s = styles[a.level];
            const Icon = s.icon;
            return (
              <article key={a.competition} className={cn("glass flex gap-4 rounded-2xl border-l-4 p-6", s.border)}>
                <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl ring-1", s.badge)}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className={cn("text-sm font-semibold", s.text)}>
                    {a.award}
                    {a.year && <span className="font-normal text-subtle"> · {a.year}</span>}
                  </p>
                  <h3 className="mt-1 font-semibold tracking-tight text-balance">{a.competition}</h3>
                  <p className="mt-1 text-sm text-muted">Project: {a.project}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{a.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
