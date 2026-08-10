export interface ExperienceEntry {
  slug: string;
  org: string;
  role: string;
  period: string;
  bullets: string[];
  stack?: string[];
  link?: { label: string; href: string };
}

// Source: the resume attached to AGENT-64. RIID belongs to Experience there,
// rather than being duplicated in Projects.
export const experience: ExperienceEntry[] = [
  {
    slug: "t-bank",
    org: "Т-Банк",
    role: "Стажировка, Scala-разработчик · продуктовая команда документооборота",
    period: "апрель 2026 – июль 2026",
    bullets: [
      "Участвовал в миграции документов с long на UUID: создал 10 новых эндпоинтов.",
      "Создал 7 клиентов к сервисам команды и протестировал их e2e на QA-контуре.",
      "Создал и протестировал 23 интеграции low-code платформы для перехода на новое API бухгалтерии.",
      "Настраивал алерты, оптимизировал запросы и добавлял расширения PostgreSQL.",
    ],
    stack: ["Scala", "Cats Effect", "PostgreSQL", "Kafka", "Docker", "TypeScript", "ELK", "Kanban"],
  },
  {
    slug: "riid",
    org: "RIID для внутреннего облака VK",
    role: "Индивидуальный проект · Java daemon для p2p-загрузки OCI/Docker-образов",
    period: "январь 2026 – июнь 2026",
    bullets: [
      "Спроектировал модульный pipeline: CLI → dispatcher → registry client/cache/p2p → engine adapters.",
      "Провёл нагрузочное тестирование на k8s-кластере: 100 образов размером от 1 МБ до 5 ГБ.",
      "По результатам тестирования загрузка в 1,2 раза быстрее Podman.",
      "Интегрировал Dragonfly через unix-socket/TCP и собственную gRPC-библиотеку.",
    ],
    stack: ["Java", "Kubernetes", "Grafana", "Prometheus", "gRPC", "OCI Registry API", "Docker"],
    link: { label: "GitHub", href: "https://github.com/UsatovPavel/riid" },
  },
];
