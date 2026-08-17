export interface ExperienceEntry {
  slug: string;
  org: string;
  role: string;
  period: string;
  bullets: string[];
  stack?: string[];
  link?: { label: string; href: string };
  media?: {
    overview: ExperienceMedia[];
    byTechnology: Partial<Record<string, ExperienceMedia[]>>;
  };
  featured?: boolean;
}

export interface ExperienceMedia {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
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
    featured: true,
    bullets: [
      "Спроектировал модульный pipeline: CLI → dispatcher → registry client/cache/p2p → engine adapters.",
      "Провёл нагрузочное тестирование на k8s-кластере: 100 образов размером от 1 МБ до 5 ГБ.",
      "По результатам тестирования загрузка в 1,2 раза быстрее Podman.",
      "Интегрировал Dragonfly через unix-socket/TCP и собственную gRPC-библиотеку.",
    ],
    stack: ["Java", "Kubernetes", "Grafana", "Prometheus", "gRPC", "OCI Registry API", "Docker"],
    link: { label: "GitHub", href: "https://github.com/UsatovPavel/riid" },
    media: {
      overview: [
        {
          src: "/projects/riid/riid-vs-podman.png",
          alt: "Диаграмма скорости и размера образов при сравнении RIID и Podman",
          caption: "RIID и Podman: скорость загрузки по размеру образа",
          width: 884,
          height: 710,
        },
        {
          src: "/projects/riid/layer-bytes.png",
          alt: "График объёма слоёв RIID по источникам cache и p2p",
          caption: "Распределение трафика между cache и p2p",
          width: 461,
          height: 295,
        },
      ],
      byTechnology: {
        Grafana: [
          {
            src: "/projects/riid/grafana-latency.png",
            alt: "График Grafana с медианной и 95-м перцентилем задержки pipeline RIID",
            caption: "Grafana: p50 и p95 успешных загрузок",
            width: 718,
            height: 369,
          },
        ],
        Kubernetes: [
          {
            src: "/projects/riid/kubernetes-pods.png",
            alt: "Панель Kubernetes с количеством готовых pod RIID, vmagent и Dragonfly",
            caption: "Kubernetes: состояние pod нагрузочного кластера",
            width: 1449,
            height: 418,
          },
        ],
      },
    },
  },
];
