export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** True when a config value has been filled in. */
export function isConfigured(value?: string | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export const isDev = process.env.NODE_ENV === "development";

/** Prefix a /public path with the base path (needed for plain <a href> links on GitHub Pages). */
export function withBase(path: string) {
  return path.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}` : path;
}

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Awards" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
}

/* Shared button styles */
export const btn = {
  base: "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
  primary: "h-10 px-4 bg-fg text-white shadow-sm hover:bg-fg/85",
  accent: "h-10 px-4 bg-accent text-white hover:bg-accent/90",
  ghost: "glass h-10 px-4 text-fg hover:bg-white/80",
  icon: "glass size-9 rounded-lg text-muted hover:text-fg hover:bg-white/80",
};
