export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="font-mono text-body text-terminal">
          <span aria-hidden="true">$</span> whoami
        </p>
        <h1 id="hero-heading" className="mt-2 text-h1 text-text-primary">
          Павел Усатов
        </h1>
        <p className="mt-4 max-w-2xl text-lead text-text-secondary">
          Backend/infra-разработчик и студент ВШЭ СПб (ПМИ, 2023–2027). Пишу на Java, Scala и Go,
          закрываю задачи от REST API и очередей до нагрузочного тестирования на Kubernetes; со
          стороны — Python и ML.
        </p>
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
            className="border border-border px-4 py-2 text-text-primary transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
          >
            github.com/UsatovPavel ↗
          </a>
        </div>
      </div>
    </section>
  );
}
