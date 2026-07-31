import type { Project } from "@/content/projects";

// Terminal-motif Project entry. Spec: docs/design-system.md §4 "Project entry".
// Tier 1 (flagship) gets the `surface` fill; Tier 2 (coursework/hackathon) is the
// same structure at a visually lighter weight (border only, transparent background).
export function ProjectEntry({ project }: { project: Project }) {
  const isTier1 = project.tier === 1;

  return (
    <div
      className={
        isTier1
          ? "border border-border bg-surface p-6"
          : "border border-border bg-transparent p-6"
      }
    >
      <p className="font-mono">
        <span className="text-text-secondary">{`~/projects/${project.slug}`}</span>
        <span className="font-bold text-terminal"> $ </span>
        <span className="font-medium text-text-primary">{project.summary}</span>
      </p>

      <div className="mt-4 space-y-3 text-body text-text-secondary">
        <p>{project.description}</p>
        {project.metric ? <p className="text-text-primary">{project.metric}</p> : null}
        <p className="text-caption">
          {project.role} · {project.period}
        </p>

        <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-caption text-text-secondary" aria-label="Стек проекта">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

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

        {/* VERIFY items carried over verbatim from docs/stub-content.md — see that
            file's [VERIFY] markers. Do not remove until Pavel confirms each one. */}
        {project.verify && project.verify.length > 0 ? (
          <ul className="space-y-1 border-t border-border pt-3 text-caption text-text-secondary">
            {project.verify.map((note) => (
              // eslint-disable-next-line react/jsx-key
              <li key={note}>⚠ Проверить: {note}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
