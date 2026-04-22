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

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main className="relative min-h-screen overflow-x-clip bg-background">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute top-[28%] -left-16 h-72 w-72 rounded-full bg-secondary/70 blur-3xl" />
          <div className="absolute bottom-12 right-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <HeroSection />
        <ImpactSection />
        <ProjectsSection />
        <AboutSection />
        <PhilosophySection />
        <TechStackSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
