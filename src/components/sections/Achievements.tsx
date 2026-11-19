"use client";

import { Medal, Trophy } from "lucide-react";
import { achievements } from "@/data/achievements";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "@/components/ui/Primitives";

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
            const gold = a.level === "gold";
            const Icon = gold ? Trophy : Medal;
            return (
              <article
                key={a.competition}
                className={cn("glass flex gap-4 rounded-2xl border-l-4 p-6", gold ? "border-l-gold" : "border-l-bronze")}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl ring-1",
                    gold ? "bg-amber-50 text-amber-700 ring-amber-600/15" : "bg-orange-50 text-orange-700 ring-orange-600/15",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className={cn("text-sm font-semibold", gold ? "text-gold" : "text-bronze")}>
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
