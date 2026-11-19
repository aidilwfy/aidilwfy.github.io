import type { Project, ProjectFilter } from "@/types";

/**
 * ============================================================
 *  PROJECTS — edit freely
 * ============================================================
 *  - Order here = order on the site. `featured: true` gets the large card.
 *  - links.github / links.demo: paste a URL to show the button. Leave ""
 *    and the site says the link hasn't been published yet.
 *  - thumbnail: path in /public (e.g. "/images/projects/barbershop.png").
 *    Without one, a designed illustration is shown.
 */

export const projectFilters: { id: "all" | ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "innovation", label: "Innovation" },
];

export const projects: Project[] = [
  {
    slug: "spark",
    title: "SPARK",
    fullName: "Student Permission And Residence Keeping",
    category: "Mobile Application · Digital Management System",
    filters: ["mobile", "innovation"],
    featured: true,
    visual: "mobile",
    summary:
      "A digital student movement and permission management system designed to modernize the traditional paper-based process of requesting permission to leave and return to a residential college.",
    description:
      "SPARK is a digital student movement and permission management system designed to modernize the traditional paper-based process of requesting permission to leave and return to a residential college. It brings students, wardens, parents or guardians, and security personnel into one organised digital workflow.",
    problem:
      "Residential colleges commonly rely on paper permission cards to manage students leaving and returning. Paper cards are easy to lose, slow to approve, and difficult to track or verify at the gate.",
    solution:
      "A mobile application that replaces paper cards with digital permission requests, a warden approval workflow, QR-based verification for security personnel, and searchable movement records.",
    features: [
      "Student account management",
      "Digital permission requests",
      "Warden approval workflow",
      "QR-based student verification",
      "Student movement records",
      "Exit and return management",
      "Role-based access control",
      "Digital information management",
    ],
    roles: ["Student", "Warden", "Administrator", "Parent / Guardian", "Security"],
    tech: ["Flutter", "Dart", "Supabase", "Database integration"],
    contribution:
      "Final year project (2026 – 2027). Contributing to the development of the system — designing functions for students, wardens, administrators and security personnel, planning the database structures and relationships behind permission requests and movement records, and building the permission approval and QR code verification workflow.",
    significance:
      "Demonstrates my interest in solving real-world institutional management problems through technology and digital transformation.",
    status: { label: "Final Year Project · 2026 – 2027", tone: "progress" },
    award: { level: "bronze", title: "Bronze Award · VISTA 2026" },
    mockup: {
      src: "/images/projects/spark-app.png",
      alt: "SPARK mobile app on two phones: the Google sign-in screen and the student home screen with weekly return slots",
      width: 534,
      height: 478,
    },
    poster: {
      src: "/images/projects/spark-poster.webp",
      alt: "SPARK project poster: main features, users (students, wardens, security), how it works, and the mobile app screens",
      width: 1333,
      height: 1999,
    },
    links: { github: "", demo: "" },
  },
  {
    slug: "wafiys-barbershop",
    title: "Wafiy's Barbershop Management System",
    category: "Web Development · Full-Stack Web Application",
    filters: ["web"],
    visual: "dashboard",
    summary:
      "A web-based barbershop management platform designed to streamline appointment scheduling, customer management, barber administration, and service management.",
    description:
      "A full-stack Laravel application that brings a barbershop's day-to-day operations into one place. Customers book appointments, barbers manage their schedules, and administrators manage services, barbers and customer records — each through a dashboard tailored to their role.",
    problem:
      "Running a barbershop manually — through walk-ins, phone calls and paper records — makes appointments hard to track, leads to scheduling conflicts and scatters customer information.",
    solution:
      "A centralised web platform with separate Admin, Barber and Customer roles, online appointment booking with status tracking, and a relational database that keeps services, appointments and customers connected.",
    features: [
      "User registration and authentication",
      "Admin dashboard",
      "Customer dashboard",
      "Barber dashboard",
      "Role-based access control",
      "Service management",
      "Appointment booking",
      "Appointment status management",
      "Customer records",
      "Database relationships",
      "Responsive user interface",
    ],
    roles: ["Admin", "Barber", "Customer"],
    tech: ["Laravel", "PHP", "MySQL", "Blade Templates", "HTML", "CSS", "JavaScript"],
    contribution:
      "Designed and developed the system — database schema and relationships, authentication and role-based access, the three role dashboards, booking logic and the responsive Blade interface.",
    significance:
      "Demonstrates practical experience in Laravel development, relational databases, authentication, CRUD operations, backend logic and responsive web application design.",
    status: { label: "Academic Project", tone: "complete" },
    links: { github: "", demo: "" },
  },
  {
    slug: "road-to-khatam",
    title: "Road to Khatam",
    category: "Innovation · Educational Technology",
    filters: ["innovation"],
    visual: "reading",
    summary:
      "An educational innovation project designed to encourage and support Quran reading progress through a digital and engaging learning experience.",
    description:
      "Road to Khatam is an educational innovation project designed to encourage and support Quran reading progress through a digital and engaging learning experience.",
    problem:
      "Staying consistent and motivated on the journey towards completing (khatam) the Quran can be challenging without a clear sense of progress.",
    solution:
      "A digital, engaging learning experience that encourages readers and supports their progress along the road to khatam.",
    features: [],
    tech: [],
    significance:
      "Demonstrates my interest in using technology and innovation to create meaningful educational solutions.",
    status: { label: "Award-Winning Innovation", tone: "award" },
    award: { level: "gold", title: "Gold Award · International Vocational Innovative Competition" },
    links: { github: "", demo: "" },
  },
  {
    slug: "cyberquest",
    title: "CyberQuest",
    category: "Web Application · Gamified Cybersecurity Education",
    filters: ["web"],
    visual: "game",
    summary:
      "A gamified cybersecurity awareness platform designed to help the general public understand digital security through interactive learning experiences.",
    description:
      "CyberQuest is a gamified cybersecurity awareness platform designed to help the general public understand digital security through interactive learning experiences. It is designed in the style of a modern SaaS dashboard. The project is currently a prototype in progress — the features below describe the planned experience.",
    problem:
      "Many people are unaware of everyday digital threats such as phishing, scams and weak account security — and traditional awareness material is often dry and easy to ignore.",
    solution:
      "Turn cybersecurity awareness into a game: learning missions, XP, levels, achievements and a leaderboard that reward people for building safer digital habits.",
    featuresLabel: "Conceptual features",
    features: [
      "Interactive dashboard",
      "Demo login",
      "XP and level progression",
      "Learning missions",
      "Achievements",
      "Leaderboard",
      "Gamified learning activities",
      "Cybersecurity awareness",
      "Phishing awareness",
      "Scam detection",
      "Account protection",
    ],
    tech: ["Web application", "Modern SaaS dashboard UI"],
    contribution: "Concept, user experience and interface design, and development of the prototype.",
    significance:
      "Demonstrates my interest in combining web development, gamification, user experience design and cybersecurity education.",
    status: { label: "Prototype · In Progress", tone: "progress" },
    links: { github: "", demo: "" },
  },
];
