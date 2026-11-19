"use client";

import { Download, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { personal } from "@/data/personal";
import { btn, cn, isConfigured, isDev, withBase } from "@/lib/utils";
import { useCvAvailable } from "@/components/layout/Providers";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useToast } from "./Toast";

/* ------------------------------------------------------------------ */
/* Download CV — downloads when the PDF exists, otherwise explains     */
/* ------------------------------------------------------------------ */
export function CvButton({ className, variant = "ghost" }: { className?: string; variant?: "ghost" | "primary" | "accent" }) {
  const notify = useToast();
  const available = useCvAvailable();
  const { path, downloadName } = personal.cv;

  if (available) {
    return (
      <a href={withBase(path)} download={downloadName} className={cn(btn.base, btn[variant], className)}>
        <Download className="size-4" aria-hidden />
        Download Resume
      </a>
    );
  }

  const onClick = () =>
      notify({
        tone: "warning",
        title: "Resume not available yet",
        description: isDev ? (
          <>
            Add your PDF at <code className="font-mono text-fg">public{path}</code> (path set in{" "}
            <code className="font-mono text-fg">src/data/personal.ts → cv.path</code>), then refresh.
          </>
        ) : (
          "The resume is being updated — please check back soon or get in touch via the contact section."
        ),
      });

  return (
    <button type="button" onClick={onClick} className={cn(btn.base, btn[variant], className)}>
      <Download className="size-4" aria-hidden />
      Download Resume
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Social links — configured links render; unconfigured are hidden in  */
/* production and show a setup hint in development.                    */
/* ------------------------------------------------------------------ */
export type SocialKey = "github" | "linkedin" | "email";

export const socialMeta: Record<SocialKey, { label: string; icon: (p: { className?: string }) => ReactNode }> = {
  github: { label: "GitHub", icon: ({ className }) => <GithubIcon className={className} /> },
  linkedin: { label: "LinkedIn", icon: ({ className }) => <LinkedinIcon className={className} /> },
  email: { label: "Email", icon: ({ className }) => <Mail className={className} aria-hidden /> },
};

export function socialHref(key: SocialKey): string | null {
  const v = personal.contact[key];
  if (!isConfigured(v)) return null;
  return key === "email" ? `mailto:${v}` : v;
}

export function useUnconfiguredNotice() {
  const notify = useToast();
  return (key: SocialKey) =>
    notify({
      tone: "warning",
      title: `${socialMeta[key].label} link not configured`,
      description: (
        <>
          Set <code className="font-mono text-fg">contact.{key}</code> in{" "}
          <code className="font-mono text-fg">src/data/personal.ts</code>. (This notice only appears in development —
          in production unconfigured links are hidden.)
        </>
      ),
    });
}

export function SocialIconLinks({ className, keys = ["github", "linkedin", "email"] }: { className?: string; keys?: SocialKey[] }) {
  const notice = useUnconfiguredNotice();
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {keys.map((key) => {
        const href = socialHref(key);
        const { label, icon: Icon } = socialMeta[key];
        const cls = cn(btn.base, btn.icon);
        if (href)
          return (
            <a
              key={key}
              href={href}
              className={cls}
              aria-label={label}
              title={label}
              {...(key !== "email" && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <Icon className="size-[18px]" />
            </a>
          );
        if (!isDev) return null;
        return (
          <button
            key={key}
            type="button"
            className={cn(cls, "border-dashed opacity-60")}
            aria-label={`${label} (not configured)`}
            title={`${label} — not configured`}
            onClick={() => notice(key)}
          >
            <Icon className="size-[18px]" />
          </button>
        );
      })}
    </div>
  );
}
