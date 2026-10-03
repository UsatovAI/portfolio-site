import Image from "next/image";
import { ui, type Locale } from "@/content/locale";

export function AdditionalActivities({ locale }: { locale: Locale }) {
  const t = ui[locale].activities;

  return (
    <section
      id="activities"
      aria-labelledby="activities-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="activities-heading" className="text-h2 text-text-primary">
          {t.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-body text-text-secondary">
          {t.intro}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <article className="selection-card border border-border bg-surface/80 p-6">
            <p className="font-mono text-caption text-terminal">education --certificates</p>
            <h3 className="mt-3 text-h3 text-text-primary">{t.yandexTitle}</h3>
            <p className="mt-3 text-body text-text-secondary">
              {t.yandexText}
            </p>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="/activities/agents-week-certificate.pdf"
                  download
                  className="inline-block border-b border-border text-body text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
                >
                  Agents Week (PDF) ↓
                </a>
                <p className="mt-1 font-mono text-caption text-text-secondary">{t.agentsWeekDates}</p>
              </li>
              <li>
                <a
                  href="/activities/ai-agents-security-week-certificate.pdf"
                  download
                  className="inline-block border-b border-border text-body text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
                >
                  AI Agents Security Week (PDF) ↓
                </a>
                <p className="mt-1 font-mono text-caption text-text-secondary">{t.securityWeekDates}</p>
              </li>
            </ul>
          </article>

          <article className="selection-card border border-border bg-surface/80 p-6">
            <p className="font-mono text-caption text-terminal">teaching --math</p>
            <h3 className="mt-3 text-h3 text-text-primary">{t.teachingTitle}</h3>
            <p className="mt-3 text-body text-text-secondary">
              {t.teachingText}
            </p>
            <p className="mt-5 font-mono text-caption text-text-secondary">{t.teachingDates}</p>
          </article>

          <article className="activity-photo-reveal border border-border bg-surface/80 p-6 sm:col-span-2">
            <button
              type="button"
              className="activity-photo-reveal__trigger block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-4"
            >
              <span className="block font-mono text-caption text-terminal">community --events</span>
              <span className="mt-3 block text-h3 text-text-primary">{t.eventsTitle}</span>
              <span
                id="community-events-description"
                className="mt-3 block max-w-2xl text-body text-text-secondary"
              >
                {t.eventsText}
              </span>
            </button>
            <figure className="activity-photo-reveal__preview">
              <Image
                src="/activities/events-merch.jpg"
                alt={t.eventsAlt}
                width={960}
                height={1160}
                className="h-auto w-full border border-border object-cover shadow-2xl"
              />
              <figcaption className="mt-2 font-mono text-caption text-text-secondary">
                {t.eventsCaption}
              </figcaption>
            </figure>
          </article>
        </div>
      </div>
    </section>
  );
}
