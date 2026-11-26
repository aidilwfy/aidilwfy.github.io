"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 id={id} className="text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <motion.span
        aria-hidden
        className="mt-3 block h-1 w-12 origin-left rounded-full bg-gradient-to-r from-accent to-accent-2"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      />
      {description && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{description}</p>}
    </motion.div>
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

/** Number that counts up from 0 the first time it scrolls into view. */
export function CountUp({ to, duration = 1.2, className }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setValue(to);
    const controls = animate(0, to, { duration, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
