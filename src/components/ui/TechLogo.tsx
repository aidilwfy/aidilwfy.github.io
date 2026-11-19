import {
  Code,
  Database,
  DatabaseZap,
  Globe,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  MonitorSmartphone,
  Network,
  SquareCode,
  Terminal,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import {
  siAndroid,
  siAndroidstudio,
  siComposer,
  siCss,
  siDart,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siPhp,
  siPhpmyadmin,
  siPython,
  siSupabase,
  siTailwindcss,
  siXampp,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

/** Brand logos (Simple Icons, CC0). Keys are lower-case skill / tech names. */
const brands: Record<string, SimpleIcon> = {
  html5: siHtml5,
  html: siHtml5,
  css3: siCss,
  css: siCss,
  javascript: siJavascript,
  php: siPhp,
  laravel: siLaravel,
  "blade templates": siLaravel,
  "tailwind css": siTailwindcss,
  mysql: siMysql,
  supabase: siSupabase,
  flutter: siFlutter,
  dart: siDart,
  "android studio": siAndroidstudio,
  "android application development": siAndroid,
  "firebase / supabase integration concepts": siFirebase,
  git: siGit,
  github: siGithub,
  figma: siFigma,
  xampp: siXampp,
  composer: siComposer,
  phpmyadmin: siPhpmyadmin,
  python: siPython,
};

/** Icons for concepts and tools without an available brand logo. */
const concepts: Record<string, { icon: LucideIcon; color: string }> = {
  "visual studio code": { icon: SquareCode, color: "#007ACC" },
  "responsive web design": { icon: MonitorSmartphone, color: "#2563EB" },
  "database design": { icon: DatabaseZap, color: "#0E7490" },
  "sql queries": { icon: Terminal, color: "#4479A1" },
  "crud operations": { icon: ListChecks, color: "#0F766E" },
  authentication: { icon: KeyRound, color: "#B45309" },
  "role-based access control": { icon: UserCog, color: "#4F46E5" },
  "relational database management": { icon: Network, color: "#0369A1" },
  "database integration": { icon: Database, color: "#0E7490" },
  "web application": { icon: Globe, color: "#2563EB" },
  "modern saas dashboard ui": { icon: LayoutDashboard, color: "#4F46E5" },
};

export function hasBrandLogo(name: string) {
  return name.toLowerCase() in brands;
}

export function TechLogo({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const key = name.toLowerCase();
  const brand = brands[key];
  if (brand) {
    return (
      <svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={`#${brand.hex}`}
        className={cn("shrink-0", className)}
      >
        <path d={brand.path} />
      </svg>
    );
  }
  const concept = concepts[key];
  const Icon = concept?.icon ?? Code;
  return (
    <Icon
      aria-hidden
      size={size}
      strokeWidth={1.75}
      color={concept?.color ?? "#64748B"}
      className={cn("shrink-0", className)}
    />
  );
}
