import type { Project } from "@/content/projects";
import type { PortfolioVariant } from "@/content/portfolio-variant";
import { JVM_SECONDARY_TECH } from "@/content/portfolio-variant";

// Terminal-motif Project entry. Spec: docs/design-system.md §4 "Project entry".
// Tier 1 (flagship) gets the `surface` fill; Tier 2 (coursework/hackathon) is the
// same structure at a visually lighter weight (border only, transparent background).
export function ProjectEntry({ project, variant }: { project: Project; variant: PortfolioVariant }) {
  return (
    <article className="selection-card border border-border bg-surface p-6">
      <p className="font-mono">
        <span className="text-text-secondary">{`~/projects/${project.slug}`}</span>
        <span className="font-bold text-terminal"> $ </span>
        <span className="font-medium text-text-primary">{project.title}</span>
      </p>

      <div className="mt-4 space-y-3 text-body text-text-secondary">
        <p className="font-medium text-text-primary">{project.summary}</p>
        <p>{project.description}</p>
        {project.metric ? <p className="text-text-primary">{project.metric}</p> : null}
        <p className="text-caption">
          {project.role} · {project.period}
        </p>

        <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-caption text-text-secondary" aria-label="Стек проекта">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className={variant === "jvm" && JVM_SECONDARY_TECH.has(tech) ? "opacity-40" : undefined}
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.links.length > 0 ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-border text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
