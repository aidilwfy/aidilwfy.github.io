"use client";

import { ArrowDown, Code, Hammer, MapPin } from "lucide-react";
import Image from "next/image";
import { personal } from "@/data/personal";
import { TechLogo } from "@/components/ui/TechLogo";
import { btn, cn, isConfigured, scrollToId } from "@/lib/utils";
import { CvButton, SocialIconLinks } from "@/components/ui/Actions";
import { DevHint, Reveal } from "@/components/ui/Primitives";

export function Hero() {
  const { hero } = personal;
  const hasPhoto = isConfigured(personal.profileImage);

  return (
    <section id="home" aria-label="Introduction" className="pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
          <div>
            <p className="text-sm text-muted">
              {personal.title} · {personal.location}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance md:text-6xl">{personal.name}</h1>
            <p className="mt-5 text-xl text-fg/90 md:text-2xl">{hero.headline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              IT student at Kolej Vokasional Kuala Selangor, focused on Laravel, PHP and MySQL — building practical
              web and mobile systems for real problems.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => scrollToId("projects")} className={cn(btn.base, btn.primary)}>
                View my work
                <ArrowDown className="size-4" aria-hidden />
              </button>
              <CvButton />
              <SocialIconLinks className="ml-1" />
            </div>
          </div>

          <div className="w-48 justify-self-start md:w-64 md:justify-self-end">
            {hasPhoto ? (
              <div className="glass relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={personal.profileImage}
                  alt={`Portrait of ${personal.name}`}
                  fill
                  priority
                  sizes="(min-width: 768px) 256px, 192px"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <DevHint>Add a photo to public/images/profile/ and set profileImage in src/data/personal.ts</DevHint>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="glass mt-14 grid divide-y divide-line rounded-2xl sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-5 py-4">
              <dt className="flex items-center gap-1.5 text-xs text-subtle">
                <Hammer className="size-3.5" aria-hidden /> Currently building
              </dt>
              <dd className="mt-1 text-sm font-medium">
                <button
                  type="button"
                  onClick={() => scrollToId("projects")}
                  className="cursor-pointer text-left hover:text-accent hover:underline hover:underline-offset-4"
                >
                  SPARK — my final year project
                </button>
              </dd>
            </div>
            <div className="px-5 py-4">
              <dt className="flex items-center gap-1.5 text-xs text-subtle">
                <Code className="size-3.5" aria-hidden /> Main focus
              </dt>
              <dd className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-medium">
                Full-stack web development
                <span className="flex items-center gap-1.5" aria-label="Laravel, PHP and MySQL">
                  {["Laravel", "PHP", "MySQL"].map((t) => (
                    <TechLogo key={t} name={t} size={16} />
                  ))}
                </span>
              </dd>
            </div>
            <div className="px-5 py-4">
              <dt className="flex items-center gap-1.5 text-xs text-subtle">
                <MapPin className="size-3.5" aria-hidden /> Based in
              </dt>
              <dd className="mt-1 text-sm font-medium">{personal.location}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
