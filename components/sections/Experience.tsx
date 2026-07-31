import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-16 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 id="experience-heading" className="text-h2 text-text-primary">
          Опыт
        </h2>

        <ol className="mt-10 space-y-10">
          {experience.map((entry) => (
            <li key={entry.slug} className="border-l-2 border-border pl-6">
              <p className="font-mono text-caption text-text-secondary">{entry.period}</p>
              <h3 className="mt-1 text-h3 text-text-primary">{entry.org}</h3>
              <p className="text-body font-medium text-text-secondary">{entry.role}</p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-body text-text-secondary">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {entry.stack && entry.stack.length > 0 ? (
                <ul
                  className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-caption text-text-secondary"
                  aria-label="Стек проекта"
                >
                  {entry.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
