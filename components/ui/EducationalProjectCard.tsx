import type { Project } from "@/content/projects";

export function EducationalProjectCard({ project }: { project: Project }) {
  return (
    <article className="selection-card flex min-h-72 flex-col border border-border bg-surface/70 p-6 sm:aspect-square">
      <p className="font-mono text-caption text-terminal">{project.role}</p>
      <h3 className="mt-3 text-h3 text-text-primary">{project.title}</h3>
      <p className="mt-2 text-body font-medium text-text-primary">{project.summary}</p>
      <p className="mt-3 text-body text-text-secondary">{project.description}</p>

      <div className="mt-auto pt-6">
        <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-caption text-text-secondary" aria-label="Стек проекта">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {project.links.length > 0 ? (
          <a
            href={project.links[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block border-b border-border text-body text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
          >
            {project.links[0].label} ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
