import Image from "next/image";

export function AdditionalActivities() {
  return (
    <section
      id="activities"
      aria-labelledby="activities-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 id="activities-heading" className="text-h2 text-text-primary">
          Дополнительная деятельность
        </h2>
        <p className="mt-2 max-w-2xl text-body text-text-secondary">
          Преподавание, профессиональное обучение и участие в инженерном сообществе.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <article className="selection-card border border-border bg-surface/80 p-6">
            <p className="font-mono text-caption text-terminal">education --certificate</p>
            <h3 className="mt-3 text-h3 text-text-primary">Yandex EdTech · Agents Week</h3>
            <p className="mt-3 text-body text-text-secondary">
              Интенсив по проектированию и применению AI-агентов в образовательных продуктах.
            </p>
            <a
              href="/activities/agents-week-certificate.pdf"
              download
              className="mt-5 inline-block border-b border-border text-body text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
            >
              Скачать сертификат (PDF) ↓
            </a>
          </article>

          <article className="selection-card border border-border bg-surface/80 p-6">
            <p className="font-mono text-caption text-terminal">teaching --math</p>
            <h3 className="mt-3 text-h3 text-text-primary">Кировская летняя метапредметная школа</h3>
            <p className="mt-3 text-body text-text-secondary">
              Педагог дополнительного образования по математике в Вишкиле.
            </p>
            <p className="mt-5 font-mono text-caption text-text-secondary">июль 2024 · июль 2025</p>
          </article>

          <article className="activity-photo-reveal border border-border bg-surface/80 p-6 sm:col-span-2">
            <button
              type="button"
              className="activity-photo-reveal__trigger font-mono text-caption text-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-4"
              aria-describedby="community-events-description"
            >
              community --events
            </button>
            <h3 className="mt-3 text-h3 text-text-primary">Инженерные мероприятия</h3>
            <p id="community-events-description" className="mt-3 max-w-2xl text-body text-text-secondary">
              Посещаю JVM-субботники, «Сезон кода» в Санкт-Петербурге и Code Retreat — слежу за практиками backend-разработки и обмениваюсь опытом с сообществом.
            </p>
            <figure className="activity-photo-reveal__preview">
              <Image
                src="/activities/events-merch.jpg"
                alt="Бейджи и мерч с JVM, Code Retreat и «Сезона кода»"
                width={960}
                height={1160}
                className="h-auto w-full border border-border object-cover shadow-2xl"
              />
              <figcaption className="mt-2 font-mono text-caption text-text-secondary">
                JVM · Ozon Tech · «Сезон кода» · Code Retreat
              </figcaption>
            </figure>
          </article>
        </div>
      </div>
    </section>
  );
}
