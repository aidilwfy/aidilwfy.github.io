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
    competition: "International Vocational Innovative Competition (IVIC) 2026",
    year: "2026",
    project: "Road to Khatam",
    projectSlug: "road-to-khatam",
    recognition: "Gold Award for innovation and project development.",
    description:
      "Recognised at an international level for an educational innovation that encourages and supports Quran reading progress through a digital, engaging experience.",
    certificateImage: "/images/certificates/ivic-2026-gold.webp",
  },
  {
    level: "star",
    award: "Four-Star Award",
    competition: "Horizon Baharu KIK — 2nd National MirikiKStart 2026",
    year: "2026",
    project: "M-VELS — Mandarin Vocational e-Learning System",
    recognition: "Anugerah Empat Bintang for the M-VELS team project.",
    description:
      "Team project recognised at a national innovation competition organised by Kolej Vokasional Miri, for an e-learning system that supports Mandarin learning for vocational students.",
    certificateImage: "/images/certificates/mvels-empat-bintang.webp",
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
