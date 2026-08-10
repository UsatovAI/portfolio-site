import { projects } from "@/content/projects";
import { ProjectEntry } from "@/components/ui/ProjectEntry";

export function Projects() {
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
          {projects.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
