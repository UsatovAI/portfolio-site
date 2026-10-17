export interface ExperienceEntry {
  slug: string;
  org: string;
  role: string;
  period: string;
  bullets: string[];
  stack?: string[];
  links?: { label: string; href: string }[];
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
  // Wide screens show it in the page gutter beside the entry instead.
  side?: "left" | "right";
}

// Source of truth: HH_spam/Resume/BackendTex.tex. RIID belongs to Experience
// there, rather than being duplicated in Projects.
export const experience: ExperienceEntry[] = [
  {
    slug: "moscollector",
    org: "Хакатон ЛЦТ 2026 · АО «Москоллектор»",
    role: "Капитан команды, Backend · сервис прогноза аварий в коллекторах Москвы",
    period: "сентябрь 2026",
    bullets: [
      "Руководил командой из 5 человек (backend, ML, frontend): задачи в Jira, дейли и планирование; развернул прод с бэкапами.",
      "Спроектировал архитектуру потоков данных из внешних сервисов (погода, гидрология, сервисы заказчика) в ML и Frontend.",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Python", "CatBoost", "Vue", "Jira"],
    links: [
      { label: "Стенд", href: "https://moscollector-goal.ru/" },
      { label: "Репозитории", href: "https://github.com/hack-goal-team" },
    ],
    media: {
      overview: [
        {
          src: "/projects/moscollector/analytics-dashboard.webp",
          alt: "Аналитическая панель: карточки активных рисков, высокого риска и оборудования к проверке, распределение инцидентов по уровням риска",
          caption: "Аналитическая панель: сводка рисков и распределение инцидентов по уровням",
          width: 1600,
          height: 613,
          side: "left",
        },
        {
          src: "/projects/moscollector/high-risk-incidents.webp",
          alt: "Журнал прогнозов: таблица инцидентов высокого риска и открытая карточка прогноза пожара с вероятностью 99% и формой решения",
          caption: "Журнал прогнозов: инциденты высокого риска и карточка прогноза",
          width: 1600,
          height: 934,
          side: "left",
        },
        {
          src: "/projects/moscollector/technician-tree.webp",
          alt: "Иерархия объекта «объект Альфа» под ролью техника: дочерние объекты окрашены по уровню риска",
          caption: "Иерархия объектов с уровнем риска, роль техника",
          width: 1600,
          height: 934,
          side: "right",
        },
        {
          src: "/projects/moscollector/technician-equipment.webp",
          alt: "Вкладка «Оборудование» журнала прогнозов под ролью техника: два датчика к проверке с вероятностью отказа 95% и 98%",
          caption: "Оборудование к проверке: прогноз отказов датчиков",
          width: 1600,
          height: 934,
          side: "right",
        },
      ],
      byTechnology: {},
    },
  },
  {
    slug: "t-bank",
    org: "Т-Банк",
    role: "Backend-стажировка · миграция документов с long на UUID · продуктовая команда документооборота",
    period: "апрель 2026 – июль 2026",
    bullets: [
      "Версионировал 10 эндпоинтов под UUID, сохранив совместимость с установленными мобильными приложениями.",
      "Написал модуль команды в общем репозитории B2B-интеграций: 7 документированных клиентов взамен трёхлетнего legacy. Смежные команды завели эпики перехода на новое API.",
      "Перевёл 23 low-code-интеграции на новое API, обеспечив переход бухгалтерии; проверил e2e на QA-контуре.",
      "Работал с PostgreSQL: создавал алерты, оптимизировал запрос и добавлял расширения.",
      "Исправлял баги генерации документов, включая проблему со временем на нашей стороне; восстановил столбец статистики во внешнем сервисе.",
    ],
    stack: ["Scala", "Cats Effect", "PostgreSQL", "Kafka", "Docker", "TypeScript", "ELK", "Kanban"],
  },
  {
    slug: "riid",
    org: "RIID для внутреннего облака VK",
    role: "Курсовая, научный руководитель — SRE из VK · Java daemon для p2p-загрузки OCI/Docker-образов, независимый от container engine",
    period: "январь 2026 – июнь 2026",
    featured: true,
    bullets: [
      "Написал библиотеку — gRPC-клиент к Dragonfly для загрузки слоёв с соседних нод; библиотека взята в использование в VK.",
      "Обосновал команде интеграцию с Rust-версией вместо согласованной ранее Go-версии, которая не поддерживается с 2026 года.",
      "Спроектировал модульную архитектуру: CLI → dispatcher (стратегия скачивания) → registry client/cache/p2p → engine adapters.",
      "Добился загрузки на 20% быстрее Podman на k8s-кластере из 12 нод: 100 образов размером от 1 МБ до 5 ГБ.",
    ],
    stack: [
      "Java",
      "Kubernetes",
      "Grafana",
      "Prometheus",
      "Gradle",
      "OCI/Docker Registry API",
      "p2p",
      "Podman",
      "Docker",
      "gRPC",
    ],
    links: [
      { label: "RIID", href: "https://github.com/UsatovPavel/riid" },
      {
        label: "java-dragonfly-image-puller",
        href: "https://github.com/UsatovPavel/java-dragonfly-image-puller",
      },
    ],
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
