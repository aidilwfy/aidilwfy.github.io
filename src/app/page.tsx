import { education, personal, site } from "@/data/personal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop, ScrollProgress } from "@/components/layout/ScrollUi";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const sameAs = [personal.contact.github, personal.contact.linkedin].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    description: personal.description,
    url: site.url,
    alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
    knowsAbout: ["Laravel", "PHP", "MySQL", "HTML", "CSS", "JavaScript", "Flutter", "Web Development"],
    ...(sameAs.length > 0 && { sameAs }),
    image: `${site.url}${personal.profileImage}`, // site.url already includes the base path
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
