export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  tier: 1 | 2;
  period: string;
  role: string;
  summary: string;
  description: string;
  metric?: string;
  stack: string[];
  links: ProjectLink[];
  /** Notes carried over from docs/stub-content.md's [VERIFY] flags — rendered as
   * visible on-page caveats AND left as JSX comments at the relevant spot, per
   * AGENT-45 instructions (don't silently invent a replacement fact). */
  verify?: string[];
}

// Source: docs/stub-content.md §2. Every entry links a real, public repo per
// portfolio-requirements.md §3 ("every project card links a live demo or a public
// repo — no exceptions"). Numbers are reused verbatim from the resume, not invented.
export const projects: Project[] = [
  {
    slug: "riid",
    title: "RIID",
    tier: 1,
    period: "январь 2026 – июнь 2026",
    role: "Индивидуальный проект",
    summary: "Java daemon, в 1.2 раза быстрее Podman",
    description:
      "Java-демон для p2p-загрузки OCI/Docker образов, независимый от container engine. Разработан для внутреннего облака VK.",
    metric:
      "Нагрузочное тестирование на кластере k8s (100 образов, 1 МБ – 5 ГБ): в 1.2 раза быстрее Podman.",
    stack: ["Java", "Kubernetes", "gRPC", "OCI/Docker Registry API"],
    links: [
      { label: "репозиторий", href: "https://github.com/UsatovPavel/riid" },
      {
        label: "p2p-библиотека",
        href: "https://github.com/UsatovPavel/java-dragonfly-image-puller",
      },
    ],
    verify: [
      "Вспомогательная p2p-библиотека (java-dragonfly-image-puller) — уточнить, что репозиторий всё ещё существует и открыт для просмотра.",
    ],
  },
  {
    slug: "prassign",
    title: "PRAssign + AsyncFactorial",
    tier: 1,
    period: "ноябрь 2025 – январь 2026",
    role: "Индивидуальный проект",
    summary: "Go REST API + Scala/Kafka pipeline",
    description:
      "Go REST API + пайплайн из Scala-консьюмеров через Kafka: задачи принимаются Go-сервисом, передаются через Kafka, вычисляются на Scala, отслеживаются в PostgreSQL.",
    stack: ["Go", "Scala", "Kafka", "Cats Effect 3", "PostgreSQL"],
    links: [
      { label: "PRAssign", href: "https://github.com/UsatovPavel/PRAssign" },
      { label: "AsyncFactorial", href: "https://github.com/UsatovPavel/AsyncFactorial" },
    ],
  },
  {
    slug: "timetamer",
    title: "TimeTamer",
    tier: 1,
    period: "февраль 2025 – август 2025",
    role: "Командный проект (курсовая работа НИУ ВШЭ) — сделано вместе с командой, не в одиночку",
    summary: "Java-сервер + Kotlin/Compose календарь с геймификацией",
    description:
      "Java-сервер и Android-приложение-календарь на Kotlin/Jetpack Compose с элементами геймификации (общие задания, статистика, достижения, push-уведомления) и AI-ассистентом (ChatGPT + Whisper) для подсказок по задачам и голосового ввода.",
    stack: ["Java", "Spring Boot", "Kotlin", "Jetpack Compose", "Retrofit"],
    links: [
      { label: "репозиторий (организация)", href: "https://github.com/hse-project-Java-2025" },
    ],
    verify: [
      "Ссылка ведёт на организацию, указанную в резюме — перед публикацией уточнить точное имя репозитория внутри неё.",
    ],
  },
  {
    slug: "zio-notification-service",
    title: "ZIO-Notification-Service",
    tier: 2,
    period: "учебный проект",
    role: "Учебный проект",
    summary: "Scala ZIO REST API для уведомлений",
    description:
      "REST API на Scala ZIO для отправки уведомлений с учётом часовых поясов.",
    stack: ["Scala", "ZIO", "REST API"],
    links: [
      {
        label: "репозиторий",
        href: "https://github.com/UsatovPavel/ZIO-Notification-Service",
      },
    ],
  },
  {
    slug: "antlr-parser",
    title: "ANTLR-парсер",
    tier: 2,
    period: "учебный проект",
    role: "Учебный проект",
    summary: "Python regex-парсер на ANTLR",
    description: "Парсер регулярных выражений на Python, построенный с помощью ANTLR.",
    stack: ["Python", "ANTLR"],
    links: [
      {
        label: "репозиторий (ветка task4-dev)",
        href: "https://github.com/UsatovPavel/Usatov-FL-HSE/tree/task4-dev",
      },
    ],
    verify: [
      "Ссылка ведёт на конкретную ветку (task4-dev) учебного репозитория Usatov-FL-HSE — перед публикацией уточнить, что ветка ещё существует и остаётся нужной целью ссылки.",
    ],
  },
  {
    slug: "voevoda",
    title: "Voevoda",
    tier: 2,
    period: "январь 2024 – июнь 2024",
    role: "Командный проект — сделано вместе с командой, не в одиночку",
    summary: "2D top-down RTS на Unreal Engine 4",
    description:
      "2D top-down RTS: командование генералом, захват городов, найм армий, сражения с ИИ. Вклад Павла: генерация городов и оппонентов, поведение ИИ противника, виджеты армии, туман войны, сражения.",
    stack: ["C++", "Unreal Engine 4"],
    links: [{ label: "репозиторий", href: "https://github.com/UsatovPavel/Voevoda" }],
  },
  {
    slug: "scanovich-webui",
    title: "scanovich-webUI",
    tier: 2,
    period: "2026",
    role: "Командная хакатон-работа (MTS True Tech) — репозиторий команды, не личный",
    summary: "Python-оркестратор нейросетей для Open WebUI",
    description:
      "Хакатон MTS True Tech: Python-оркестратор AI-моделей, интегрированный в Open WebUI (классификация запросов, выбор модели, загрузка файлов, генерация PPTX через параллельных LLM-агентов, интеграция распознавания речи, покрытие тестами pytest). Репозиторий размещён под аккаунтом тимлида FUYOH666, не Павла.",
    stack: ["Python", "FastAPI", "Open WebUI", "Docker Compose"],
    links: [
      { label: "репозиторий команды", href: "https://github.com/FUYOH666/scanovich-webUI/" },
    ],
  },
];

export const tier1Projects = projects.filter((p) => p.tier === 1);
export const tier2Projects = projects.filter((p) => p.tier === 2);
