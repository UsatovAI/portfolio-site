import { SkipLink } from "@/components/ui/SkipLink";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main">
        <Hero />
        <Stack />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
