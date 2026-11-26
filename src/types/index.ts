import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Personal                                                            */
/* ------------------------------------------------------------------ */

export interface ContactLinks {
  /** e.g. "you@example.com" — leave "" until you want it public */
  email: string;
  /** e.g. "https://github.com/your-username" */
  github: string;
  /** e.g. "https://www.linkedin.com/in/your-profile" */
  linkedin: string;
  /**
   * Optional form backend that accepts a JSON POST (e.g. Formspree:
   * "https://formspree.io/f/xxxxxxx"). When empty, the contact form falls
   * back to opening the visitor's email app (if `email` is set).
   */
  formEndpoint: string;
}

export interface EducationEntry {
  institution: string;
  /** Free text, e.g. "2023 – 2027". */
  period?: string;
  current?: boolean;
  items: { title: string; note?: string }[];
  /** Short paragraph about this period of study. */
  description?: string;
  /** What you learned during this period (shown as "What I learned"). */
  learned?: string[];
  /** Projects built during this period (shown as "Projects"). */
  highlights?: string[];
  /** Photo inside /public, e.g. "/images/education/kvks.webp" */
  image?: { src: string; alt: string; position?: string };
}

export type CertificateCategory = "achievement" | "appreciation" | "participation" | "course";

export interface Certificate {
  title: string;
  /** Event / programme name as written on the certificate */
  event?: string;
  issuer: string;
  category: CertificateCategory;
  /** Short result or role, e.g. "Gold Award", "Naib Johan", "Committee" */
  result?: string;
  /** Date as written on the certificate, e.g. "15 Aug 2024" */
  date?: string;
  /** Path inside /public, e.g. "/images/certificates/gold-ivic.webp" */
  image: string;
  width: number;
  height: number;
}

export interface JourneyMilestone {
  title: string;
  description: string;
  /** Only fill in when the date is confirmed. */
  date?: string;
  kind: "study" | "learning" | "build" | "competition" | "award" | "future";
  award?: "gold" | "bronze";
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type Proficiency = "Learning" | "Familiar" | "Comfortable" | "Proficient";

export interface Skill {
  name: string;
  /** Core skills are featured in the "Core stack" row. */
  core?: boolean;
  /** Short, honest note about how you use this skill. */
  note?: string;
  /** Set your own level. Left undefined = no level is displayed. */
  level?: Proficiency;
  /** Names used in projects.ts `tech` that should map to this skill. */
  aliases?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectFilter = "web" | "mobile" | "innovation";
export type ProjectVisualKind = "dashboard" | "mobile" | "reading" | "game";
export type StatusTone = "complete" | "progress" | "concept" | "award";

export interface Project {
  slug: string;
  title: string;
  fullName?: string;
  category: string;
  filters: ProjectFilter[];
  /** Card description (one or two sentences). */
  summary: string;
  description: string;
  problem?: string;
  solution?: string;
  features: string[];
  /** Heading used for the feature list ("Key features", "Conceptual features"...). */
  featuresLabel?: string;
  roles?: string[];
  tech: string[];
  contribution?: string;
  significance: string;
  status: { label: string; tone: StatusTone };
  award?: { level: "gold" | "silver" | "bronze"; title: string };
  /** Path inside /public, e.g. "/images/projects/spark.png". */
  thumbnail?: string;
  /** Tall promotional poster, shown beside the main project card and in its case study. */
  poster?: { src: string; alt: string; width: number; height: number };
  /** App screens on a transparent background, shown uncropped next to the project title. */
  mockup?: { src: string; alt: string; width: number; height: number };
  visual: ProjectVisualKind;
  links: { github?: string; demo?: string };
  featured?: boolean;
}

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */

export interface Achievement {
  level: "gold" | "silver" | "bronze" | "star";
  award: string;
  competition: string;
  /** Only fill in when confirmed. */
  year?: string;
  project: string;
  projectSlug?: string;
  recognition: string;
  description: string;
  /** Path inside /public, e.g. "/images/achievements/gold.jpg". */
  certificateImage?: string;
}
