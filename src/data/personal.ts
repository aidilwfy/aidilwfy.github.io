import type { ContactLinks, EducationEntry, JourneyMilestone } from "@/types";

/**
 * ============================================================
 *  PERSONAL CONFIGURATION — edit this file to update the site
 * ============================================================
 *  Anything left as "" (empty) is treated as "not configured":
 *  - in development (`npm run dev`) you'll see a hint telling you what to set
 *  - in production it is hidden, so visitors never see a broken link
 */

export const site = {
  /** Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "en_MY",
};

export const personal = {
  name: "Muhammad Aidil Wafiy",
  shortName: "Aidil Wafiy",
  initials: "AW",
  title: "Aspiring Web Developer",
  identity: "Aspiring Web Developer | IT Student | Technology Enthusiast",
  tagline: "Turning Ideas Into Digital Experiences.",
  location: "Selangor, Malaysia",

  /** Photo inside /public, e.g. "/images/profile/aidil.png". "" = initials placeholder */
  profileImage: "/images/profile/aidil.png",

  hero: {
    headline: "Building the Web, One Idea at a Time.",
    supporting:
      "An Aspiring Web Developer passionate about creating modern, functional and meaningful digital experiences.",
    roles: [
      "Aspiring Web Developer",
      "Laravel Developer",
      "Full-Stack Development Enthusiast",
      "Technology & Innovation Enthusiast",
    ],
  },

  description:
    "I'm an aspiring web developer passionate about building modern, functional, and user-friendly digital experiences. With a background in Information Technology and hands-on experience in web and application development, I enjoy transforming creative ideas into meaningful digital solutions.",

  about: {
    title: "Beyond The Code.",
    paragraphs: [
      "Hi, I'm Muhammad Aidil Wafiy, an Information Technology student at Kolej Vokasional Kuala Selangor with a strong interest in web development and digital innovation.",
      "I enjoy designing and developing web applications that combine functionality, usability, and modern design. Through academic projects and innovation competitions, I have gained practical exposure to programming, database management, application development, and problem-solving.",
      "I believe technology is more than just writing code. It is about identifying problems, developing meaningful solutions, and creating experiences that make people's lives easier — and I'm continuously learning so I can contribute, collaborate, and grow as a web developer.",
    ],
    interests: [
      "Full-Stack Web Development",
      "Laravel Development",
      "Frontend Development",
      "Database Management",
      "Application Development",
    ],
  },

  contact: {
    email: "aidilwafiy141@gmail.com",
    github: "",
    linkedin: "",
    formEndpoint: "",
  } satisfies ContactLinks,

  cv: {
    /** File must live at /public/files/Aidil_Wafiy_CV.pdf */
    path: "/files/Aidil_Wafiy_CV.pdf",
    downloadName: "Aidil_Wafiy_Resume.pdf",
  },
};

/* ------------------------------------------------------------------ */
/* Education — newest first                                            */
/* ------------------------------------------------------------------ */
export const education: EducationEntry[] = [
  {
    institution: "Kolej Vokasional Kuala Selangor (KVKS)",
    period: "2023 – 2027",
    current: true,
    items: [
      { title: "Diploma in Computing Technology", note: "Current CGPA: 3.60" },
      { title: "Certificate in Database Management System and Web Application", note: "CGPA: 3.53" },
    ],
    description:
      "A hands-on vocational programme where I learn by building. My studies cover programming, web and mobile application development, database design and management, system analysis and design, user interface design, and application testing and debugging.",
    learned: [
      "Programming fundamentals and structured problem solving",
      "Building web applications with HTML, CSS, JavaScript, PHP and Laravel",
      "Designing relational databases and writing SQL queries in MySQL",
      "Developing mobile apps with Flutter and Dart, backed by Supabase",
      "System analysis and design — turning requirements into features",
      "User interface design and prototyping in Figma",
      "Authentication, CRUD operations and role-based access control",
      "Testing and debugging applications before delivery",
      "Version control with Git and GitHub",
      "Presenting and pitching projects at innovation competitions",
    ],
    image: { src: "/images/education/kvks.webp", alt: "Kolej Vokasional Kuala Selangor entrance sign", position: "center" },
  },
  {
    institution: "SMK Raja Muda Musa, Bestari Jaya",
    period: "2022 – 2023",
    items: [{ title: "Secondary Education" }, { title: "Asas Sains Komputer (Fundamentals of Computer Science)" }],
    description:
      "Where my interest in computing began. Asas Sains Komputer introduced me to how computers solve problems — and to writing my first programs.",
    learned: [
      "Computational thinking: decomposition, pattern recognition, abstraction and algorithms",
      "Planning solutions with pseudocode and flowcharts",
      "Programming basics: variables, data types, conditions and loops",
      "How computers represent data, including the binary number system",
      "Testing a program and fixing errors step by step",
    ],
    highlights: ["Built a calculator project using Python"],
    image: { src: "/images/education/smk-raja-muda-musa.png", alt: "SMK Raja Muda Musa school building", position: "center 30%" },
  },
];

/* ------------------------------------------------------------------ */
/* Development journey — order matters; `date` only when confirmed     */
/* ------------------------------------------------------------------ */
export const journey: JourneyMilestone[] = [
  {
    kind: "study",
    date: "2023",
    title: "Started my IT studies at KVKS",
    description: "Building foundations in programming, databases and systems.",
  },
  {
    kind: "learning",
    title: "Learning web & app development",
    description: "HTML, CSS, JavaScript and PHP for the web; Flutter for mobile.",
  },
  {
    kind: "build",
    title: "Building academic software projects",
    description: "Applying system analysis, database design and UI design to real requirements.",
  },
  {
    kind: "award",
    award: "gold",
    title: "Gold Award — IVIC",
    description: "Road to Khatam won Gold at the International Vocational Innovative Competition.",
  },
  {
    kind: "build",
    date: "2026 – 2027",
    title: "Developing SPARK",
    description: "My final year project — a digital student permission and residence system.",
  },
  {
    kind: "award",
    award: "bronze",
    date: "2026",
    title: "Bronze Award — VISTA 2026",
    description: "SPARK was recognised with a Bronze Award at VISTA 2026.",
  },
  {
    kind: "build",
    title: "Building Laravel web systems",
    description: "Wafiy's Barbershop — authentication, role dashboards and relational data.",
  },
  {
    kind: "learning",
    title: "Exploring gamified web apps",
    description: "CyberQuest — making cybersecurity awareness engaging.",
  },
];
