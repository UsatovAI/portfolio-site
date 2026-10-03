"use client";

import { useState } from "react";
import { projects, type ProjectCategory } from "@/content/projects";
import { projectsEn } from "@/content/en/projects";
import { ui, type Locale } from "@/content/locale";
import type { PortfolioVariant } from "@/content/portfolio-variant";
import { ProjectEntry } from "@/components/ui/ProjectEntry";

type ProjectFilter = ProjectCategory | "all";

export function Projects({ variant, locale }: { variant: PortfolioVariant; locale: Locale }) {
  const t = ui[locale].projects;
  const [activeCategory, setActiveCategory] = useState<ProjectFilter>("all");
  // The English edition is written for the JVM page and already carries its wording.
  const shapedProjects = (locale === "en" ? projectsEn : projects).map((project) => {
    if (variant !== "jvm" || locale === "en") return project;

    if (project.slug === "population-forecast") {
      return {
        ...project,
        description:
          "Прогнозирование населения на 10-летнем горизонте: сравнение ARIMA, Prophet, XGBoost и Random Forest.",
      };
    }

    return project;
  });

  const projectPriority: Partial<Record<PortfolioVariant, string[]>> = {
    backend: ["prassign", "timetamer", "scanovich-webui", "voevoda", "population-forecast"],
    ml: ["population-forecast", "scanovich-webui", "timetamer", "prassign", "voevoda"],
  };
  const prioritizedProjects = projectPriority[variant]
    ? [...shapedProjects].sort(
        (a, b) =>
          projectPriority[variant]!.indexOf(a.slug) - projectPriority[variant]!.indexOf(b.slug)
      )
    : shapedProjects;
  const renderedProjects = prioritizedProjects.filter(
    (project) => activeCategory === "all" || project.categories.includes(activeCategory)
  );
  const filters: ProjectFilter[] = ["all", "Backend", "DevOps", "ML", "Android"];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-16 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="projects-heading" className="text-h2 text-text-primary">
          {t.heading}
        </h2>

        <p className="mt-2 max-w-2xl text-body text-text-secondary">
          {t.intro}
        </p>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={t.filterLabel}>
          {filters.map((filter) => {
            const isActive = activeCategory === filter;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(filter)}
                className={`rounded-sm border px-4 py-2 font-mono text-caption transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2 ${
                  isActive
                    ? "border-terminal bg-terminal/10 text-text-primary"
                    : "border-border bg-surface/80 text-text-secondary hover:border-terminal hover:text-text-primary"
                }`}
              >
                {filter === "all" ? t.all : filter}
              </button>
            );
          })}
        </div>

        <div className="mt-10 space-y-6">
          {renderedProjects.length > 0 ? (
            renderedProjects.map((project) => (
              <ProjectEntry key={project.slug} project={project} variant={variant} locale={locale} />
            ))
          ) : (
            <p className="border border-border bg-surface p-6 text-body text-text-secondary">
              {t.empty}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
