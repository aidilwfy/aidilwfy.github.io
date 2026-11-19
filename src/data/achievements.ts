import type { Achievement } from "@/types";

/**
 * ============================================================
 *  ACHIEVEMENTS — edit freely
 * ============================================================
 *  - `year`: only fill in when confirmed.
 *  - `certificateImage`: put a scan in /public/images/achievements and set the path.
 */
export const achievements: Achievement[] = [
  {
    level: "gold",
    award: "Gold Award",
    competition: "International Vocational Innovative Competition",
    // year: "20XX",
    project: "Road to Khatam",
    projectSlug: "road-to-khatam",
    recognition: "Gold Award for innovation and project development.",
    description:
      "Recognised at an international level for an educational innovation that encourages and supports Quran reading progress through a digital, engaging experience.",
    certificateImage: "",
  },
  {
    level: "bronze",
    award: "Bronze Award",
    competition: "Vocational, Innovation, Sustainability, Technology & Arts (VISTA)",
    year: "2026",
    project: "SPARK — Student Permission And Residence Keeping",
    projectSlug: "spark",
    recognition: "Bronze Award for the SPARK innovation project.",
    description:
      "Recognised for digitalising the student permission and residence process — replacing paper permission cards with an organised, verifiable workflow.",
    certificateImage: "",
  },
];
