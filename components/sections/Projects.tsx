"use client";

import { useState } from "react";
import { projects, type ProjectCategory } from "@/content/projects";
import type { PortfolioVariant } from "@/content/portfolio-variant";
import { ProjectEntry } from "@/components/ui/ProjectEntry";

export function Projects({ variant }: { variant: PortfolioVariant }) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "Все">("Все");
  const shapedProjects = projects.map((project) => {
    if (variant !== "jvm") return project;

    if (project.slug === "scanovich-webui") {
      return {
        ...project,
        description:
          "Оркестратор AI-моделей для Open WebUI: маршрутизация запросов, генерация PPTX и распознавание речи.",
      };
    }

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
    (project) => activeCategory === "Все" || project.categories.includes(activeCategory)
  );
  const filters: Array<ProjectCategory | "Все"> = ["Все", "Backend", "ML", "Android"];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-16 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="projects-heading" className="text-h2 text-text-primary">
          Проекты
        </h2>

        <p className="mt-2 max-w-2xl text-body text-text-secondary">
          Продуктовые, командные и исследовательские проекты из резюме.
        </p>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Фильтр проектов">
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
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-10 space-y-6">
          {renderedProjects.length > 0 ? (
            renderedProjects.map((project) => (
              <ProjectEntry key={project.slug} project={project} variant={variant} />
            ))
          ) : (
            <p className="border border-border bg-surface p-6 text-body text-text-secondary">
              В этой категории пока нет проектов.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
