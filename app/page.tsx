import { HeroSection } from '@/components/sections/hero';
import { ImpactSection } from '@/components/sections/impact';
import { ProjectsSection } from '@/components/sections/projects';
import { AboutSection } from '@/components/sections/about';
import { PhilosophySection } from '@/components/sections/philosophy';
import { TechStackSection } from '@/components/sections/tech-stack';
import { CertificationsSection } from '@/components/sections/certifications';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { SiteNavbar } from '@/components/site-navbar';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from '@/lib/site-config';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/profile_picture2.jpg`,
  jobTitle: 'Fullstack Software Developer',
  description: SITE_DESCRIPTION,
  address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
  sameAs: SOCIAL_LINKS,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />
      <SiteNavbar />
      <main className="relative min-h-screen overflow-x-clip bg-background">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[min(40vw,18rem)] w-[min(40vw,18rem)] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute top-[28%] -left-12 h-[min(42vw,18rem)] w-[min(42vw,18rem)] rounded-full bg-secondary/70 blur-3xl" />
          <div className="absolute bottom-12 right-0 h-[min(46vw,20rem)] w-[min(46vw,20rem)] rounded-full bg-accent/15 blur-3xl" />
        </div>

        <HeroSection />
        <AboutSection />
        <ImpactSection />
        <ProjectsSection />
        <PhilosophySection />
        <TechStackSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
