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

export default function Home() {
  return (
    <div className="site-shell">
      <AmbientBackground />
      <div className="site-content">
        <SkipLink />
        <Nav />
        <main id="main">
          <Hero />
          <Stack />
          <Experience />
          <Projects />
          <EducationalProjects />
          <AdditionalActivities />
        </main>
        <Footer />
      </div>
    </div>
  );
}
