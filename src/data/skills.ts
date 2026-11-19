import { Database, Globe, Smartphone, Wrench } from "lucide-react";
import type { Proficiency, SkillCategory } from "@/types";

/**
 * ============================================================
 *  SKILLS — edit freely
 * ============================================================
 *  `level` is intentionally left unset. Add your own honest level to any
 *  skill and it will appear on the site, e.g.  level: "Comfortable"
 *  Allowed values (lowest → highest):
 */
export const proficiencyScale: Proficiency[] = ["Learning", "Familiar", "Comfortable", "Proficient"];

export const skillCategories: SkillCategory[] = [
  {
    id: "web",
    title: "Web Development",
    description: "Building responsive, functional web applications — my main professional direction.",
    icon: Globe,
    skills: [
      {
        name: "Laravel",
        core: true,
        note: "The framework behind Wafiy's Barbershop — routing, Blade, authentication and relationships.",
        aliases: ["Blade Templates"],
      },
      { name: "PHP", core: true, note: "Server-side logic and application flow for Laravel projects." },
      { name: "HTML5", core: true, note: "Semantic structure for pages and Blade views.", aliases: ["HTML"] },
      { name: "CSS3", core: true, note: "Layouts, styling and responsive interfaces.", aliases: ["CSS"] },
      { name: "JavaScript", core: true, note: "Interactivity and client-side behaviour." },
      { name: "Responsive Web Design" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "backend",
    title: "Database & Backend",
    description: "Designing data, securing access and connecting applications to their backend.",
    icon: Database,
    skills: [
      { name: "MySQL", core: true, note: "Relational schemas, relationships and CRUD for web systems." },
      { name: "Supabase" },
      { name: "Database Design" },
      { name: "SQL Queries" },
      { name: "CRUD Operations" },
      { name: "Authentication" },
      { name: "Role-Based Access Control" },
      { name: "Relational Database Management" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Cross-platform and Android app development for practical, real-world systems.",
    icon: Smartphone,
    skills: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Android Studio" },
      { name: "Android Application Development" },
      { name: "Firebase / Supabase integration concepts" },
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    description: "The everyday toolkit I use to design, build, version and run projects.",
    icon: Wrench,
    skills: [
      { name: "Visual Studio Code" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Android Studio" },
      { name: "Figma" },
      { name: "XAMPP" },
      { name: "phpMyAdmin" },
      { name: "Composer" },
    ],
  },
];
