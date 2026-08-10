import { SkipLink } from "@/components/ui/SkipLink";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
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
          <Projects />
          <Experience />
        </main>
        <Footer />
      </div>
    </div>
  );
}
