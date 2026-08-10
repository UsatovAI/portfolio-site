import type { PortfolioVariant } from "@/content/portfolio-variant";
import { SkipLink } from "@/components/ui/SkipLink";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { EducationalProjects } from "@/components/sections/EducationalProjects";
import { AdditionalActivities } from "@/components/sections/AdditionalActivities";
import { Footer } from "@/components/footer/Footer";
import { AmbientBackground } from "@/components/background/AmbientBackground";

export function PortfolioPage({ variant }: { variant: PortfolioVariant }) {
  return (
    <div className="site-shell" data-portfolio-variant={variant}>
      <AmbientBackground />
      <div className="site-content">
        <SkipLink />
        <Nav />
        <main id="main">
          <Hero />
          <Stack variant={variant} />
          <Experience variant={variant} />
          <Projects variant={variant} />
          <EducationalProjects />
          <AdditionalActivities />
        </main>
        <Footer />
      </div>
    </div>
  );
}
