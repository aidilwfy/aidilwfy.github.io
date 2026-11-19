import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { personal, site } from "@/data/personal";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const title = `${personal.name} — ${personal.title}`;
const description = personal.description;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${personal.name}` },
  description,
  applicationName: `${personal.name} Portfolio`,
  authors: [{ name: personal.name }],
  creator: personal.name,
  keywords: [
    personal.name,
    "Aidil Wafiy",
    "Web Developer",
    "Laravel Developer",
    "PHP",
    "MySQL",
    "Full-Stack",
    "Portfolio",
    "Kolej Vokasional Kuala Selangor",
    "Malaysia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: site.locale,
    url: "/",
    siteName: `${personal.name} Portfolio`,
    title,
    description: `${personal.tagline} ${personal.hero.supporting}`,
  },
  twitter: { card: "summary_large_image", title, description: personal.hero.supporting },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#eef4fb",
  colorScheme: "light",
};


export default function RootLayout({ children }: { children: ReactNode }) {
  const cvAvailable = existsSync(join(process.cwd(), "public", personal.cv.path));
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Providers cvAvailable={cvAvailable}>{children}</Providers>
      </body>
    </html>
  );
}
