import { GitHubIcon } from "@/components/ui/GitHubIcon";
import type { PortfolioVariant } from "@/content/portfolio-variant";

export function Hero({ variant }: { variant: PortfolioVariant }) {
  return (
    <section id="home" aria-labelledby="hero-heading" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="font-mono text-body text-terminal">
          <span aria-hidden="true">$</span> whoami
        </p>
        <h1 id="hero-heading" className="mt-2 text-h1 text-text-primary">
          Павел Усатов
        </h1>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-2 text-h3 text-text-primary">
          {variant === "default" ? (
            <span>backend developer</span>
          ) : (
            <>
              <span className="jvm-role-disclosure">
                <span className="jvm-role-disclosure__trigger" tabIndex={0} aria-describedby="jvm-languages">
                  JVM
                </span>
                <span id="jvm-languages" role="tooltip" className="jvm-role-disclosure__languages">
                  Java · Kotlin · Scala
                </span>
              </span>
              <span>backend developer</span>
            </>
          )}
        </div>

        <div className="mt-5 max-w-3xl space-y-2 text-lead text-text-secondary">
          <p>
            Разрабатываю бэкенд и распределенные системы: Spring Boot, REST API, работа с PostgreSQL,
            контейнеризация с Docker, асинхронные пайплайны (Kafka).
          </p>
          <p>Развертываю в Kubernetes, наблюдаю через Grafana.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 font-mono text-body">
          <a
            href="#projects"
            className="border border-border px-4 py-2 text-text-primary transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
          >
            смотреть проекты →
          </a>
          <a
            href="https://github.com/UsatovPavel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-text-primary transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
