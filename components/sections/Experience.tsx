import { experience } from "@/content/experience";
import type { PortfolioVariant } from "@/content/portfolio-variant";
import { ExperienceItem } from "@/components/ui/ExperienceItem";

export function Experience({ variant }: { variant: PortfolioVariant }) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-16 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="experience-heading" className="text-h2 text-text-primary">
          Опыт
        </h2>

        <ol className="mt-10 space-y-10">
          {experience.map((entry) => (
            <ExperienceItem key={entry.slug} entry={entry} variant={variant} />
          ))}
        </ol>
      </div>
    </section>
  );
}
