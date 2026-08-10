import { projects } from "@/content/projects";
import type { PortfolioVariant } from "@/content/portfolio-variant";
import { ProjectEntry } from "@/components/ui/ProjectEntry";

export function Projects({ variant }: { variant: PortfolioVariant }) {
  const renderedProjects = projects.map((project) => {
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

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-16 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 id="projects-heading" className="text-h2 text-text-primary">
          Проекты
        </h2>

        <p className="mt-2 max-w-2xl text-body text-text-secondary">
          Продуктовые, командные и исследовательские проекты из резюме.
        </p>

        <div className="mt-10 space-y-6">
          {renderedProjects.map((project) => (
            <ProjectEntry key={project.slug} project={project} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
}
