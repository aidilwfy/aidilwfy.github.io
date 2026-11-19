"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { personal } from "@/data/personal";
import { btn, cn, navItems, scrollToId } from "@/lib/utils";

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/55 shadow-[0_1px_0_rgba(30,58,110,0.06)] backdrop-blur-xl backdrop-saturate-150">
      <nav aria-label="Primary" className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 md:px-8">
        <a href="#home" onClick={go("home")} className="text-sm font-semibold tracking-tight">
          {personal.shortName}
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "text-sm transition-colors",
                    active === item.id ? "text-fg underline decoration-accent decoration-2 underline-offset-[6px]" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(btn.base, btn.icon, "md:hidden")}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <ul id="mobile-nav" className="border-t border-line px-5 py-2 md:hidden">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn("block py-2.5 text-sm", active === item.id ? "text-fg" : "text-muted")}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
