"use client";

import { personal } from "@/data/personal";
import { SocialIconLinks } from "@/components/ui/Actions";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/70 bg-white/50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>
          © {year} {personal.name}
        </p>
        <SocialIconLinks />
      </div>
    </footer>
  );
}
