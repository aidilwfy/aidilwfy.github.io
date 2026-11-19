"use client";

import { ArrowRight, ArrowUpRight, BookOpen, Check, ExternalLink, Images, Medal, ShieldCheck, Scissors, Smartphone, Trophy } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { projectFilters, projects } from "@/data/projects";
import type { Project, ProjectVisualKind, StatusTone } from "@/types";
import { btn, cn, isConfigured } from "@/lib/utils";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Modal } from "@/components/ui/Modal";
import { Reveal, Section } from "@/components/ui/Primitives";
import { TechLogo } from "@/components/ui/TechLogo";

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

const coverTheme: Record<ProjectVisualKind, { icon: typeof Scissors; bg: string; fg: string }> = {
  dashboard: { icon: Scissors, bg: "from-blue-100 via-sky-50 to-white", fg: "text-blue-600" },
  mobile: { icon: Smartphone, bg: "from-sky-100 via-blue-50 to-white", fg: "text-sky-600" },
  reading: { icon: BookOpen, bg: "from-amber-100 via-orange-50 to-white", fg: "text-amber-700" },
  game: { icon: ShieldCheck, bg: "from-indigo-100 via-cyan-50 to-white", fg: "text-indigo-600" },
};

const statusTone: Record<StatusTone, string> = {
  complete: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  progress: "bg-sky-50 text-sky-700 ring-sky-600/15",
  concept: "bg-slate-50 text-slate-600 ring-slate-600/15",
  award: "bg-amber-50 text-amber-700 ring-amber-600/15",
};

function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1", statusTone[status.tone])}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {status.label}
    </span>
  );
}

function AwardBadge({ award, className }: { award: NonNullable<Project["award"]>; className?: string }) {
  const gold = award.level === "gold";
  const Icon = gold ? Trophy : Medal;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ring-1",
        gold ? "bg-amber-50 text-amber-800 ring-amber-500/25" : "bg-orange-50 text-orange-800 ring-orange-500/25",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {award.title}
    </span>
  );
}

function TechList({ tech, limit }: { tech: string[]; limit?: number }) {
  if (!tech.length) return null;
  const list = limit ? tech.slice(0, limit) : tech;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {list.map((t) => (
        <li
          key={t}
          className="inline-flex items-center gap-1.5 rounded-md bg-white/80 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-900/5"
        >
          <TechLogo name={t} size={13} />
          {t}
        </li>
      ))}
      {limit && tech.length > limit && (
        <li className="rounded-md px-1.5 py-0.5 text-xs text-subtle">+{tech.length - limit}</li>
      )}
    </ul>
  );
}

function ProjectLinks({ project, compact }: { project: Project; compact?: boolean }) {
  const { github, demo } = project.links;
  const hasGithub = isConfigured(github);
  const hasDemo = isConfigured(demo);
  if (!hasGithub && !hasDemo) {
    return compact ? null : <p className="text-sm text-subtle">Not published yet</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {hasGithub && (
        <a href={github} target="_blank" rel="noopener noreferrer" className={cn(btn.base, btn.ghost, "h-9 px-3")}>
          <GithubIcon size={15} /> Source
        </a>
      )}
      {hasDemo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className={cn(btn.base, btn.ghost, "h-9 px-3")}>
          <ExternalLink className="size-3.5" aria-hidden /> Live demo
        </a>
      )}
    </div>
  );
}

/** Card cover: real screenshot if provided, otherwise a clean themed cover. */
function ProjectCover({ project, className }: { project: Project; className?: string }) {
  const theme = coverTheme[project.visual];
  const Icon = theme.icon;
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", theme.bg, className)}>
      {project.thumbnail ? (
        <Image src={project.thumbnail} alt={`${project.title} screenshot`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      ) : (
        <>
          <Icon aria-hidden className={cn("absolute -right-6 -bottom-8 size-44 opacity-[0.08]", theme.fg)} strokeWidth={1.25} />
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-white/80 shadow-lg ring-1 shadow-slate-900/5 ring-white backdrop-blur">
              <Icon className={cn("size-7", theme.fg)} strokeWidth={1.75} aria-hidden />
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Featured (main) project                                             */
/* ------------------------------------------------------------------ */

function FeaturedProject({
  project,
  onOpen,
  onPoster,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  onPoster: () => void;
}) {
  const highlights = [
    project.roles && { value: String(project.roles.length), label: "user roles" },
    project.features.length > 0 && { value: String(project.features.length), label: "core features" },
    { value: project.tech[0] ?? "—", label: "built with" },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <article className="glass overflow-hidden rounded-3xl lg:grid lg:grid-cols-[1.1fr_1fr]">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">Main project</span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h3>
        {project.fullName && <p className="mt-1.5 text-lg text-muted">{project.fullName}</p>}
        <p className="mt-1 text-sm text-subtle">{project.category}</p>

        <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-xl bg-white/60 ring-1 ring-slate-900/5">
          {highlights.map((h) => (
            <div key={h.label} className="px-4 py-3">
              <dt className="sr-only">{h.label}</dt>
              <dd className="text-lg font-semibold tracking-tight text-fg">{h.value}</dd>
              <dd className="text-xs text-subtle">{h.label}</dd>
            </div>
          ))}
        </dl>

        {project.features.length > 0 && (
          <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {project.features.slice(0, 6).map((f) => (
              <li key={f} className="flex gap-2 text-sm text-fg/80">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <TechList tech={project.tech} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => onOpen(project)} aria-haspopup="dialog" className={cn(btn.base, btn.primary, "group")}>
            Read case study
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </button>
          {project.poster && (
            <button type="button" onClick={onPoster} aria-haspopup="dialog" className={cn(btn.base, btn.ghost)}>
              <Images className="size-4" aria-hidden />
              View poster
            </button>
          )}
          <ProjectLinks project={project} compact />
        </div>
      </div>

      {/* Visual */}
      <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 p-8">
        <div aria-hidden className="absolute -top-20 -right-20 size-72 rounded-full bg-white/50 blur-3xl" />
        {project.award && <AwardBadge award={project.award} className="absolute top-5 left-5 z-10" />}
        {project.mockup ? (
          <Image
            src={project.mockup.src}
            alt={project.mockup.alt}
            width={project.mockup.width}
            height={project.mockup.height}
            priority
            sizes="(min-width: 1024px) 420px, 90vw"
            className="relative h-auto w-full max-w-md drop-shadow-2xl"
          />
        ) : (
          <ProjectCover project={project} className="absolute inset-0" />
        )}
        {project.poster && (
          <button
            type="button"
            onClick={onPoster}
            aria-label={`View ${project.title} poster`}
            className="absolute right-5 bottom-5 hidden w-20 rotate-3 cursor-zoom-in overflow-hidden rounded-lg bg-white p-1 shadow-xl ring-1 ring-slate-900/10 transition-transform hover:rotate-0 sm:block"
          >
            <Image
              src={project.poster.src}
              alt=""
              width={project.poster.width}
              height={project.poster.height}
              sizes="80px"
              className="h-auto w-full rounded"
            />
          </button>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Other projects                                                      */
/* ------------------------------------------------------------------ */

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="glass group flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
      <div className="relative">
        <ProjectCover project={project} className="aspect-[16/9]" />
        <div className="absolute top-3 left-3">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-subtle">{project.category}</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight">{project.title}</h3>
        {project.award && <AwardBadge award={project.award} className="mt-2 self-start" />}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-4">
          <TechList tech={project.tech} limit={4} />
        </div>
        <div className="flex-1" />
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-accent hover:underline hover:underline-offset-4"
          >
            View case study
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </button>
          <div className="relative z-10">
            <ProjectLinks project={project} compact />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Case study                                                          */
/* ------------------------------------------------------------------ */

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="mb-2 text-sm font-semibold">{title}</h4>
      {children}
    </section>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="mt-0.5 text-sm text-fg/90">{children}</dd>
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div>
      {/* Header visual */}
      <div className="relative">
        {project.mockup ? (
          <div className="flex justify-center bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 px-6 pt-10 pb-6">
            <Image
              src={project.mockup.src}
              alt={project.mockup.alt}
              width={project.mockup.width}
              height={project.mockup.height}
              sizes="360px"
              className="h-auto w-full max-w-xs drop-shadow-2xl"
            />
          </div>
        ) : (
          <ProjectCover project={project} className="aspect-[16/6]" />
        )}
      </div>

      <div className="p-6 md:p-8">
        <header>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={project.status} />
            {project.award && <AwardBadge award={project.award} />}
          </div>
          <h3 id={`project-title-${project.slug}`} className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            {project.title}
          </h3>
          {project.fullName && <p className="mt-1 text-muted">{project.fullName}</p>}
        </header>

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_13rem]">
          <div className="space-y-7">
            <p className="leading-relaxed text-muted">{project.description}</p>

            {(project.problem || project.solution) && (
              <div className="grid gap-4 sm:grid-cols-2">
                {project.problem && (
                  <div className="rounded-xl bg-white/70 p-4 ring-1 ring-slate-900/5">
                    <Block title="The problem">
                      <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
                    </Block>
                  </div>
                )}
                {project.solution && (
                  <div className="rounded-xl bg-blue-50/80 p-4 ring-1 ring-blue-600/10">
                    <Block title="The solution">
                      <p className="text-sm leading-relaxed text-muted">{project.solution}</p>
                    </Block>
                  </div>
                )}
              </div>
            )}

            {project.features.length > 0 && (
              <Block title={project.featuresLabel ?? "Key features"}>
                <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {project.contribution && (
              <Block title="My contribution">
                <p className="text-sm leading-relaxed text-muted">{project.contribution}</p>
              </Block>
            )}

            <Block title="Why it matters">
              <p className="text-sm leading-relaxed text-muted">{project.significance}</p>
            </Block>

            {project.poster && (
              <figure>
                <Image
                  src={project.poster.src}
                  alt={project.poster.alt}
                  width={project.poster.width}
                  height={project.poster.height}
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="h-auto w-full rounded-xl ring-1 ring-slate-900/10"
                />
                <figcaption className="mt-2 text-center text-xs text-muted">{project.title} project poster</figcaption>
              </figure>
            )}
          </div>

          <aside>
            <dl className="space-y-4 rounded-xl bg-white/70 p-5 ring-1 ring-slate-900/5 md:sticky md:top-4">
              <Fact label="Category">{project.category}</Fact>
              <Fact label="Status">{project.status.label}</Fact>
              {project.award && <Fact label="Recognition">{project.award.title}</Fact>}
              {project.roles && <Fact label="User roles">{project.roles.join(", ")}</Fact>}
              <Fact label="Built with">
                {project.tech.length ? (
                  <ul className="mt-1 space-y-1.5">
                    {project.tech.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <TechLogo name={t} size={15} />
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-subtle">To be added</span>
                )}
              </Fact>
              <Fact label="Links">
                <ProjectLinks project={project} />
              </Fact>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]["id"]>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [poster, setPoster] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const closePoster = useCallback(() => setPoster(null), []);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.filters.includes(filter))),
    [filter],
  );
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => p !== featured);

  return (
    <Section id="projects" labelledBy="projects-title">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="projects-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Projects
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            Systems and innovations I&apos;ve built through academic work and competitions — each starting from a real
            problem.
          </p>
        </div>
        <div role="group" aria-label="Filter projects" className="glass inline-flex self-start rounded-xl p-1 md:self-auto">
          {projectFilters.map((f) => {
            const on = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "h-8 cursor-pointer rounded-lg px-3.5 text-sm font-medium transition-colors",
                  on ? "bg-fg text-white shadow-sm" : "text-muted hover:text-fg",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <Reveal key={filter} className="space-y-6">
        {featured && <FeaturedProject project={featured} onOpen={setSelected} onPoster={() => setPoster(featured)} />}
        {rest.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} onOpen={setSelected} />
            ))}
          </div>
        )}
      </Reveal>

      <Modal open={!!selected} onClose={close} labelledBy={selected ? `project-title-${selected.slug}` : ""} wide>
        {selected && <ProjectDetails project={selected} />}
      </Modal>

      <Modal open={!!poster} onClose={closePoster} labelledBy="poster-title">
        {poster?.poster && (
          <div className="p-3">
            <h3 id="poster-title" className="sr-only">
              {poster.title} poster
            </h3>
            <Image
              src={poster.poster.src}
              alt={poster.poster.alt}
              width={poster.poster.width}
              height={poster.poster.height}
              sizes="768px"
              className="h-auto w-full rounded-xl"
            />
          </div>
        )}
      </Modal>
    </Section>
  );
}
