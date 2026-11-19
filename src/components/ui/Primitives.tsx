"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-14 md:py-16", className)}>
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({ id, title, description }: { id: string; title: ReactNode; description?: ReactNode }) {
  return (
    <div className="mb-10">
      <h2 id={id} className="text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      {description && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{description}</p>}
    </div>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md bg-white/60 px-2 py-0.5 text-xs text-muted", className)}>
      {children}
    </span>
  );
}

/** Development-only configuration hint. Renders nothing in production. */
export function DevHint({ children, className }: { children: ReactNode; className?: string }) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <p
      className={cn(
        "rounded-lg border border-dashed border-gold/40 bg-gold/5 px-3 py-2 font-mono text-[11px] leading-relaxed text-gold",
        className,
      )}
    >
      <span className="font-semibold">Config · </span>
      {children}
    </p>
  );
}
