"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HandHeart,
  LayoutGrid,
  Maximize2,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { certificateCategories, certificates } from "@/data/certificates";
import type { Certificate, CertificateCategory } from "@/types";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Primitives";

type Filter = "all" | CertificateCategory;

const theme: Record<
  CertificateCategory,
  { icon: typeof Trophy; chip: string; dot: string; tile: string; active: string; glow: string }
> = {
  achievement: {
    icon: Trophy,
    chip: "bg-amber-50 text-amber-800 ring-amber-600/20",
    dot: "bg-amber-500",
    tile: "from-amber-400 to-orange-500 shadow-amber-500/30",
    active: "ring-amber-400/70 bg-amber-50/80",
    glow: "from-amber-100/70",
  },
  appreciation: {
    icon: HandHeart,
    chip: "bg-rose-50 text-rose-700 ring-rose-600/20",
    dot: "bg-rose-500",
    tile: "from-rose-400 to-fuchsia-500 shadow-rose-500/30",
    active: "ring-rose-400/70 bg-rose-50/80",
    glow: "from-rose-100/70",
  },
  participation: {
    icon: Users,
    chip: "bg-sky-50 text-sky-700 ring-sky-600/20",
    dot: "bg-sky-500",
    tile: "from-sky-400 to-blue-600 shadow-sky-500/30",
    active: "ring-sky-400/70 bg-sky-50/80",
    glow: "from-sky-100/70",
  },
  course: {
    icon: GraduationCap,
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dot: "bg-emerald-500",
    tile: "from-emerald-400 to-teal-600 shadow-emerald-500/30",
    active: "ring-emerald-400/70 bg-emerald-50/80",
    glow: "from-emerald-100/70",
  },
};

const order: CertificateCategory[] = ["achievement", "appreciation", "participation", "course"];
const INITIAL = 6;

function CategoryChip({ category }: { category: CertificateCategory }) {
  const t = theme[category];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1", t.chip)}>
      <span className={cn("size-1.5 rounded-full", t.dot)} aria-hidden />
      {certificateCategories[category].malay}
    </span>
  );
}

function CertificateCard({ cert, onOpen }: { cert: Certificate; onOpen: () => void }) {
  const t = theme[cert.category];
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`View certificate: ${cert.title}`}
      className="group glass flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl hover:shadow-blue-900/10"
    >
      <div className={cn("relative aspect-[5/4] bg-gradient-to-b to-white/40", t.glow)}>
        <div className="absolute inset-4 flex items-center justify-center">
          <Image
            src={cert.image}
            alt={`${cert.title} certificate`}
            width={cert.width}
            height={cert.height}
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className="h-auto max-h-full w-auto max-w-full rounded-[3px] shadow-lg ring-1 shadow-slate-900/15 ring-slate-900/5 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-lg bg-white/90 text-fg opacity-0 shadow transition-opacity group-hover:opacity-100">
          <Maximize2 className="size-4" aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-white/70 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <CategoryChip category={cert.category} />
          {cert.result && cert.result !== "Participant" && (
            <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-medium text-fg/80 ring-1 ring-slate-900/10">
              {cert.result}
            </span>
          )}
        </div>
        <p className="font-semibold leading-snug tracking-tight text-balance">{cert.title}</p>
        <p className="text-sm text-muted">{cert.issuer}</p>
        {cert.date && (
          <p className="mt-auto flex items-center gap-1.5 pt-1 text-xs text-subtle">
            <CalendarDays className="size-3.5" aria-hidden />
            {cert.date}
          </p>
        )}
      </div>
    </button>
  );
}

export function Certificates() {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const counts = useMemo(
    () => Object.fromEntries(order.map((c) => [c, certificates.filter((x) => x.category === c).length])),
    [],
  ) as Record<CertificateCategory, number>;

  const list = useMemo(
    () =>
      filter === "all"
        ? order.flatMap((c) => certificates.filter((x) => x.category === c))
        : certificates.filter((x) => x.category === filter),
    [filter],
  );
  const visible = expanded ? list : list.slice(0, INITIAL);
  const open = openIndex !== null ? list[openIndex] : null;

  const step = useCallback(
    (d: number) => setOpenIndex((i) => (i === null ? i : (i + d + list.length) % list.length)),
    [list.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, step]);

  const choose = (f: Filter) => {
    setFilter(f);
    setExpanded(false);
  };

  const filters: { id: Filter; label: string; malay: string; count: number; icon: typeof Trophy }[] = [
    { id: "all", label: "All", malay: "Semua", count: certificates.length, icon: LayoutGrid },
    ...order
      .filter((c) => counts[c] > 0)
      .map((c) => ({
        id: c as Filter,
        label: certificateCategories[c].label,
        malay: certificateCategories[c].malay,
        count: counts[c],
        icon: theme[c].icon,
      })),
  ];

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-title"
      className="border-y border-white/70 bg-gradient-to-b from-white/45 to-blue-50/40 py-14 backdrop-blur-sm md:py-16"
    >
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <div className="mb-8">
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Award className="size-3.5" aria-hidden />
            {certificates.length} certificates
          </p>
          <h2 id="certificates-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Certificates
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Achievements, appreciation and participation from my years at Kolej Vokasional Kuala Selangor and beyond.
            Pick a category, then click any certificate to view it in full.
          </p>
        </div>

        {/* Category tiles double as filters */}
        <Reveal>
          <div role="tablist" aria-label="Certificate categories" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {filters.map((f) => {
              const Icon = f.icon;
              const selected = filter === f.id;
              const t = f.id === "all" ? null : theme[f.id];
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="certificate-grid"
                  onClick={() => choose(f.id)}
                  className={cn(
                    "glass flex cursor-pointer items-center gap-3 rounded-2xl p-3 text-left ring-2 ring-transparent transition-all hover:bg-white/80",
                    f.id === "all" && "col-span-2 sm:col-span-1",
                    selected && (t ? t.active : "bg-white/85 ring-accent/50"),
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md",
                      t ? t.tile : "from-slate-700 to-slate-900 shadow-slate-900/25",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg leading-none font-semibold tabular-nums">{f.count}</span>
                    <span className="mt-1 block truncate text-xs font-medium text-muted">{f.malay}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {filter !== "all" && (
          <p className="mt-5 text-sm text-muted">
            <span className="font-semibold text-fg">{certificateCategories[filter].label}</span> —{" "}
            {certificateCategories[filter].description}
          </p>
        )}

        <ul id="certificate-grid" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((c, i) => (
              <motion.li
                key={c.image}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, delay: Math.min(i, 8) * 0.03 }}
              >
                <CertificateCard cert={c} onOpen={() => setOpenIndex(i)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {list.length > INITIAL && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => {
                if (expanded) document.getElementById("certificates")?.scrollIntoView({ behavior: "smooth" });
                setExpanded((v) => !v);
              }}
              aria-expanded={expanded}
              aria-controls="certificate-grid"
              className="glass inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors hover:bg-white/85"
            >
              {expanded ? "Show fewer" : `Show all ${list.length} certificates`}
              <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} aria-hidden />
            </button>
          </div>
        )}
      </div>

      <Modal open={!!open} onClose={() => setOpenIndex(null)} labelledBy="certificate-title" wide>
        {open && (
          <div className="flex flex-col">
            <div className="relative flex items-center justify-center bg-slate-100/70 p-3 sm:p-5">
              <Image
                key={open.image}
                src={open.image}
                alt={`${open.title} certificate`}
                width={open.width}
                height={open.height}
                sizes="(min-width: 896px) 860px, 95vw"
                className="h-auto max-h-[68vh] w-auto max-w-full rounded shadow-xl ring-1 ring-slate-900/10"
              />
              {list.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous certificate"
                    className="absolute top-1/2 left-2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-fg shadow-md hover:bg-white"
                  >
                    <ChevronLeft className="size-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next certificate"
                    className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-fg shadow-md hover:bg-white"
                  >
                    <ChevronRight className="size-5" aria-hidden />
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-wrap items-start justify-between gap-3 p-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <CategoryChip category={open.category} />
                  {open.result && (
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-slate-900/10">
                      {open.result}
                    </span>
                  )}
                </div>
                <h3 id="certificate-title" className="mt-2 text-lg font-semibold tracking-tight">
                  {open.title}
                </h3>
                {open.event && <p className="mt-0.5 text-sm text-fg/80">{open.event}</p>}
                <p className="mt-0.5 text-sm text-muted">
                  {open.issuer}
                  {open.date && ` · ${open.date}`}
                </p>
              </div>
              <p className="text-xs text-subtle tabular-nums">
                {(openIndex ?? 0) + 1} / {list.length}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
