import { experience } from "@/content/experience";
import { experienceEn } from "@/content/en/experience";
import { ui, type Locale } from "@/content/locale";
import type { PortfolioVariant } from "@/content/portfolio-variant";
import { ExperienceItem } from "@/components/ui/ExperienceItem";

export function Experience({ variant, locale }: { variant: PortfolioVariant; locale: Locale }) {
  const entries = locale === "en" ? experienceEn : experience;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-16 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="experience-heading" className="text-h2 text-text-primary">
          {ui[locale].experience.heading}
        </h2>

        <ol className="mt-10 space-y-10">
          {entries.map((entry) => (
            <ExperienceItem key={entry.slug} entry={entry} variant={variant} locale={locale} />
          ))}
        </ol>
      </div>
    </section>
  );
}
