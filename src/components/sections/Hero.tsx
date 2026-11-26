"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowDown, Code, Hammer, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { personal } from "@/data/personal";
import { TechLogo } from "@/components/ui/TechLogo";
import { btn, cn, isConfigured, scrollToId } from "@/lib/utils";
import { CvButton, SocialIconLinks } from "@/components/ui/Actions";
import { DevHint } from "@/components/ui/Primitives";

/** Words that cycle in the hero line "I build …" */
const building = ["web applications", "mobile apps", "database systems", "innovation projects"];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % building.length), 2400);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span className="relative grid overflow-hidden">
      {/* Reserve width for the longest word so the line doesn't jump */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        innovation projects
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={building[i]}
          initial={{ opacity: 0, y: "60%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-60%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="col-start-1 row-start-1 bg-gradient-to-r from-accent to-accent-2 bg-clip-text font-semibold text-transparent"
        >
          {building[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">web applications, mobile apps, database systems and innovation projects</span>
    </span>
  );
}

export function Hero() {
  const { hero } = personal;
  const hasPhoto = isConfigured(personal.profileImage);

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-x-clip pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14"
        >
          <div>
            <motion.p variants={item} className="inline-flex items-center gap-2 text-sm text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {personal.title} · {personal.location}
            </motion.p>
            <motion.h1 variants={item} className="mt-3 text-4xl font-semibold tracking-tight text-balance md:text-6xl">
              {personal.name}
            </motion.h1>
            <motion.p variants={item} className="mt-5 text-xl text-fg/90 md:text-2xl">
              {hero.headline}
            </motion.p>
            <motion.p variants={item} className="mt-3 flex flex-wrap items-baseline gap-x-2 text-lg text-muted md:text-xl">
              <span>I build</span>
              <RotatingWord />
            </motion.p>
            <motion.p variants={item} className="mt-4 max-w-xl leading-relaxed text-muted">
              IT student at Kolej Vokasional Kuala Selangor, focused on Laravel, PHP and MySQL — building practical
              web and mobile systems for real problems.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToId("projects")}
                className={cn(btn.base, btn.primary, "group")}
              >
                View my work
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </button>
              <CvButton />
              <SocialIconLinks className="ml-1" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative w-48 justify-self-start md:w-64 md:justify-self-end"
          >
            {hasPhoto ? (
              <div className="hero-float relative">
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
              </div>
            ) : (
              <DevHint>Add a photo to public/images/profile/ and set profileImage in src/data/personal.ts</DevHint>
            )}
          </motion.div>
        </motion.div>

        <motion.dl
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } } }}
          className="glass mt-14 grid divide-y divide-line rounded-2xl sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          <motion.div variants={item} className="px-5 py-4">
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
          </motion.div>
          <motion.div variants={item} className="px-5 py-4">
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
          </motion.div>
          <motion.div variants={item} className="px-5 py-4">
            <dt className="flex items-center gap-1.5 text-xs text-subtle">
              <MapPin className="size-3.5" aria-hidden /> Based in
            </dt>
            <dd className="mt-1 text-sm font-medium">{personal.location}</dd>
          </motion.div>
        </motion.dl>
      </div>
    </section>
  );
}
