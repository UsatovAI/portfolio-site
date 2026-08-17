"use client";

import { useId, useState } from "react";
import type { Project } from "@/content/projects";
import type { PortfolioVariant } from "@/content/portfolio-variant";
import { JVM_SECONDARY_TECH } from "@/content/portfolio-variant";

// Terminal-motif Project entry. Spec: docs/design-system.md §4 "Project entry".
// Tier 1 (flagship) gets the `surface` fill; Tier 2 (coursework/hackathon) is the
// same structure at a visually lighter weight (border only, transparent background).
export function ProjectEntry({ project, variant }: { project: Project; variant: PortfolioVariant }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const mediaId = useId();
  const hasMedia = Boolean(project.media?.length);
  const isOpen = hasMedia && (isHovered || isFocused || isPinnedOpen);

  return (
    <article
      onMouseEnter={hasMedia ? () => setIsHovered(true) : undefined}
      onMouseLeave={hasMedia ? () => setIsHovered(false) : undefined}
      onFocus={hasMedia ? () => setIsFocused(true) : undefined}
      onBlur={
        hasMedia
          ? (event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
            }
          : undefined
      }
    >
      <div className="selection-card relative border border-border bg-surface p-6">
        {hasMedia ? (
          <button
            type="button"
            className="absolute inset-0 z-[1] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
            aria-label={`${isOpen ? "Скрыть" : "Показать"} материалы проекта ${project.title}`}
            aria-expanded={isOpen}
            aria-controls={mediaId}
            onClick={() => setIsPinnedOpen((value) => !value)}
          />
        ) : null}

        <div
          className={
            hasMedia ? "pointer-events-none relative z-[2] flex gap-3" : "relative z-[2] flex gap-3"
          }
        >
          <span
            className={`shrink-0 pt-0.5 font-mono text-terminal ${project.featured ? "" : "invisible"}`}
            aria-hidden="true"
          >
            ★
          </span>
          {project.featured ? <span className="sr-only">Ключевой проект:</span> : null}

          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-baseline gap-x-2 font-mono">
              <span className="text-text-secondary">{`~/projects/${project.slug}`}</span>
              <span className="font-bold text-terminal">$</span>
              <span className="font-medium text-text-primary">{project.title}</span>
              <span
                className="mx-1 hidden h-[0.6em] flex-1 self-center border-b border-dotted border-border sm:block"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap text-caption text-text-secondary">
                {project.period}
              </span>
            </p>

            <div className="mt-4 space-y-3 text-body text-text-secondary">
              <p className="font-medium text-text-primary">{project.summary}</p>
              <p>{project.description}</p>
              {project.metric ? <p className="text-text-primary">{project.metric}</p> : null}
              <p className="text-caption">{project.role}</p>

              <ul
                className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-caption text-text-secondary"
                aria-label="Стек проекта"
              >
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className={
                      variant === "jvm" && JVM_SECONDARY_TECH.has(tech) ? "opacity-40" : undefined
                    }
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
                        className="pointer-events-auto border-b border-border text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
                      >
                        {link.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              {hasMedia ? (
                <p className="inline-flex items-center gap-2 rounded-sm border border-terminal bg-terminal/10 px-3 py-2 font-mono text-caption font-medium text-terminal">
                  <span aria-hidden="true" className="text-body leading-none">
                    {isOpen ? "−" : "+"}
                  </span>
                  {isOpen
                    ? "Скрыть материалы"
                    : `Наведите: ${project.media!.length} видео`}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {hasMedia && isOpen ? (
        <div
          id={mediaId}
          className="media-reveal mt-4 grid gap-4 sm:grid-cols-2"
          aria-live="polite"
        >
          {project.media!.map((media) => (
            <figure key={media.src} className="overflow-hidden border border-border bg-surface">
              <video
                className="aspect-video w-full bg-black object-contain"
                controls
                playsInline
                preload="metadata"
                poster={media.poster}
                aria-label={media.title}
              >
                <source src={media.src} type="video/mp4" />
                Ваш браузер не поддерживает видео. Можно открыть файл по ссылке ниже.
              </video>
              <figcaption className="space-y-1 p-3">
                <p className="font-medium text-text-primary">{media.title}</p>
                <p className="text-caption text-text-secondary">{media.description}</p>
                <a
                  href={media.src}
                  className="inline-block border-b border-border text-caption text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
                >
                  Открыть видео
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </article>
  );
}
