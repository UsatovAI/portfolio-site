import { educationalProjects } from "@/content/projects";
import { EducationalProjectCard } from "@/components/ui/EducationalProjectCard";

export function EducationalProjects() {
  return (
    <section
      id="education-projects"
      aria-labelledby="education-projects-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="education-projects-heading" className="text-h2 text-text-primary">
          Учебные проекты
        </h2>
        <p className="mt-2 max-w-2xl text-body text-text-secondary">
          Компактные задачи по языкам, API и формальным грамматикам.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {educationalProjects.map((project) => (
            <EducationalProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
