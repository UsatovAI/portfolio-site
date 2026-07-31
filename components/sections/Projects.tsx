import { tier1Projects, tier2Projects } from "@/content/projects";
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

        <div className="mt-10">
          <h3 className="font-mono text-h3 text-text-primary">Флагманские</h3>
          <div className="mt-6 space-y-6">
            {tier1Projects.map((project) => (
              <ProjectEntry key={project.slug} project={project} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-mono text-h3 text-text-primary">Учебные и хакатоны</h3>
          <div className="mt-6 space-y-6">
            {tier2Projects.map((project) => (
              <ProjectEntry key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
