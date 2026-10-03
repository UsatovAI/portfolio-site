import type { PortfolioVariant } from "@/content/portfolio-variant";
import type { Locale } from "@/content/locale";
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

export function PortfolioPage({
  variant,
  locale = "ru",
  alternateHref,
}: {
  variant: PortfolioVariant;
  locale?: Locale;
  // The same page in the other language, when a translation exists.
  alternateHref?: string;
}) {
  return (
    <div className="site-shell" data-portfolio-variant={variant}>
      <AmbientBackground />
      <div className="site-content">
        <SkipLink locale={locale} />
        <Nav locale={locale} alternateHref={alternateHref} />
        <main id="main">
          <Hero variant={variant} locale={locale} />
          <Stack variant={variant} locale={locale} />
          <Experience variant={variant} locale={locale} />
          <Projects variant={variant} locale={locale} />
          <EducationalProjects locale={locale} />
          <AdditionalActivities locale={locale} />
        </main>
        <Footer variant={variant} locale={locale} />
      </div>
    </div>
  );
}
