"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { ExperienceEntry, ExperienceMedia } from "@/content/experience";
import type { PortfolioVariant } from "@/content/portfolio-variant";

type MediaSelection = "overview" | string | null;

function MediaPanel({ items, selection }: { items: ExperienceMedia[]; selection: string }) {
  const isOverview = selection === "overview";

  return (
    <div
      className={
        isOverview && items.length > 1
          ? "grid items-start gap-3 sm:grid-cols-2"
          : "space-y-3"
      }
    >
      {items.map((item) => (
        <figure key={item.src} className="overflow-hidden border border-border bg-surface">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="h-auto w-full"
          />
          <figcaption className="p-3 text-caption text-text-secondary">{item.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ExperienceItem({
  entry,
  variant,
}: {
  entry: ExperienceEntry;
  variant: PortfolioVariant;
}) {
  const [selection, setSelection] = useState<MediaSelection>(null);
  const mediaId = useId();
  const hasMedia = Boolean(entry.media);
  const selectedItems =
    selection && entry.media
      ? selection === "overview"
        ? entry.media.overview
        : entry.media.byTechnology[selection] ?? []
      : [];

  const toggleSelection = (nextSelection: Exclude<MediaSelection, null>) => {
    setSelection((current) => (current === nextSelection ? null : nextSelection));
  };

  return (
    <li
      className="relative border-l-2 border-border pl-6"
      onMouseEnter={hasMedia ? () => setSelection((current) => current ?? "overview") : undefined}
      onMouseLeave={hasMedia ? () => setSelection(null) : undefined}
      onFocus={hasMedia ? () => setSelection((current) => current ?? "overview") : undefined}
      onBlur={
        hasMedia
          ? (event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setSelection(null);
            }
          : undefined
      }
    >
      {entry.featured ? (
        <span
          className="pointer-events-none absolute left-0 top-0 -translate-x-[135%] font-mono text-[2em] leading-none text-terminal"
          aria-hidden="true"
        >
          ★
        </span>
      ) : null}
      {entry.featured ? <span className="sr-only">Ключевой проект:</span> : null}

      <div>
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
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-caption text-text-secondary"
            aria-label="Стек проекта"
          >
            {entry.stack
              .filter((tech) => variant !== "jvm" || tech !== "TypeScript")
              .map((tech) => {
                const isInteractive = Boolean(entry.media?.byTechnology[tech]);
                const isSelected = selection === tech;

                return (
                  <li key={tech}>
                    {isInteractive ? (
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        aria-controls={mediaId}
                        onClick={() => toggleSelection(tech)}
                        onMouseEnter={() => setSelection(tech)}
                        onMouseLeave={() => setSelection("overview")}
                        onFocus={() => setSelection(tech)}
                        className={`rounded-sm border px-2 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2 ${
                          isSelected
                            ? "border-terminal bg-terminal/10 text-text-primary"
                            : "border-border text-accent hover:border-terminal"
                        }`}
                      >
                        {tech} {isSelected ? "−" : "+"}
                      </button>
                    ) : (
                      tech
                    )}
                  </li>
                );
              })}
          </ul>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-4">
          {entry.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-border text-body text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
            >
              {link.label} ↗
            </a>
          ))}

          {hasMedia ? (
            <button
              type="button"
              aria-expanded={selection === "overview"}
              aria-controls={mediaId}
              onClick={() => toggleSelection("overview")}
              className="border-b border-border font-mono text-caption text-terminal transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
            >
              {selection === "overview" ? "− скрыть материалы RIID" : "+ материалы RIID"}
            </button>
          ) : null}
        </div>
      </div>

      {selection && selectedItems.length > 0 ? (
        <div id={mediaId} className="media-reveal mt-4" aria-live="polite">
          <MediaPanel items={selectedItems} selection={selection} />
        </div>
      ) : null}
    </li>
  );
}
