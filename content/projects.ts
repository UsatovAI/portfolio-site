export interface ProjectLink {
  label: string;
  href: string;
}

export type ProjectCategory = "Backend" | "ML" | "Android" | "DevOps";

interface ProjectMediaBase {
  src: string;
  title: string;
  description: string;
}

export interface ProjectVideoMedia extends ProjectMediaBase {
  type: "video";
  poster: string;
}

export interface ProjectImageMedia extends ProjectMediaBase {
  type: "image";
  alt: string;
  width: number;
  height: number;
}

export type ProjectMedia = ProjectVideoMedia | ProjectImageMedia;

export interface Project {
  slug: string;
  title: string;
  tier: 1 | 2;
  period: string;
  role: string;
  summary: string;
  description: string;
  bullets?: string[];
  metric?: string;
  stack: string[];
  categories: ProjectCategory[];
  media?: ProjectMedia[];
  links: ProjectLink[];
  featured?: boolean;
}

// Resume-backed entries are synchronized with HH_spam/Resume/BackendTex.tex.
// Main and educational work are kept separate so the page mirrors its structure;
// portfolio-only projects remain available as additional proof of work.
export const projects: Project[] = [
  {
    slug: "moscollector",
    title: "Хакатон ЛЦТ 2026 · АО «Москоллектор»",
    tier: 1,
    period: "сентябрь 2026",
    role: "Капитан команды, Backend",
    summary: "Сервис прогноза аварий в коллекторах Москвы",
    description:
      "ML-модель прогнозирует аварии по данным внешних сервисов, а Java-бэкенд передаёт риски и рекомендации в интерфейсы диспетчеров и технических специалистов.",
    bullets: [
      "Руководил командой из 5 человек (backend, ML, frontend): задачи в Jira, дейли и планирование; развернул прод с бэкапами.",
      "Спроектировал архитектуру потоков данных из внешних сервисов (погода, гидрология, сервисы заказчика) в ML и Frontend.",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Python", "CatBoost", "Vue", "Jira"],
    categories: ["Backend", "ML"],
    media: [
      {
        type: "video",
        src: "/projects/moscollector/demo.mp4",
        poster: "/projects/moscollector/demo-poster.jpg",
        title: "Демо стенда",
        description: "57 секунд, без звука.",
      },
      {
        type: "image",
        src: "/projects/moscollector/analytics-dashboard.webp",
        alt: "Аналитическая панель: карточки активных рисков, высокого риска и оборудования к проверке, распределение инцидентов по уровням риска",
        title: "Аналитическая панель",
        description: "Сводка рисков и распределение инцидентов по уровням.",
        width: 1600,
        height: 613,
      },
      {
        type: "image",
        src: "/projects/moscollector/high-risk-incidents.webp",
        alt: "Журнал прогнозов: таблица инцидентов высокого риска и открытая карточка прогноза пожара с вероятностью 99% и формой решения",
        title: "Журнал прогнозов",
        description: "Инциденты высокого риска и карточка прогноза.",
        width: 1600,
        height: 934,
      },
      {
        type: "image",
        src: "/projects/moscollector/technician-tree.webp",
        alt: "Иерархия объекта «объект Альфа» под ролью техника: дочерние объекты окрашены по уровню риска",
        title: "Иерархия объектов",
        description: "Уровни риска для технического специалиста.",
        width: 1600,
        height: 934,
      },
      {
        type: "image",
        src: "/projects/moscollector/technician-equipment.webp",
        alt: "Вкладка «Оборудование» журнала прогнозов под ролью техника: два датчика к проверке с вероятностью отказа 95% и 98%",
        title: "Оборудование к проверке",
        description: "Прогноз отказов датчиков.",
        width: 1600,
        height: 934,
      },
      {
        type: "image",
        src: "/projects/moscollector/admin-settings.webp",
        alt: "Настройки администратора: обновление интеграций и параметры прогноза с порогами MEDIUM и HIGH",
        title: "Панель администратора",
        description: "Интеграции и пороги прогноза.",
        width: 1600,
        height: 705,
      },
      {
        type: "image",
        src: "/projects/moscollector/admin-audit.webp",
        alt: "Журнал аудита администратора: входы, выходы и неудачные попытки входа пользователей с фильтрами",
        title: "Журнал аудита",
        description: "События пользователей с фильтрами по периоду, пользователю и действию.",
        width: 1600,
        height: 782,
      },
    ],
    links: [
      { label: "Стенд", href: "https://moscollector-goal.ru/" },
      { label: "Репозитории", href: "https://github.com/hack-goal-team" },
    ],
  },
  {
    slug: "scanovich-webui",
    title: "Хакатон MTS True Tech",
    tier: 1,
    period: "2026",
    role: "Командный проект",
    summary: "Оркестратор нейросетей на Python с интеграцией в WebUI",
    description:
      "Разработка оркестратора нейросетей на Python и его интеграция с WebUI в рамках хакатона MTS True Tech.",
    stack: ["Python", "WebUI"],
    categories: ["Backend", "ML"],
    links: [{ label: "GitHub", href: "https://github.com/FUYOH666/scanovich-webUI/" }],
  },
  {
    slug: "prassign",
    title: "PRAssign + AsyncFactorial",
    tier: 1,
    period: "ноябрь 2025 – январь 2026",
    role: "Индивидуальный проект",
    summary: "Go REST API + Scala/Kafka pipeline",
    description:
      "Go-сервис принимает задачи, Kafka передаёт их Scala-консьюмерам для вычисления, а состояние сохраняется в PostgreSQL.",
    stack: ["Scala", "Go", "Kafka", "Cats Effect 3", "PostgreSQL", "Nginx", "ScalaTest", "Docker", "k6"],
    categories: ["Backend", "DevOps"],
    links: [
      { label: "PRAssign", href: "https://github.com/UsatovPavel/PRAssign" },
      { label: "AsyncFactorial", href: "https://github.com/UsatovPavel/AsyncFactorial" },
    ],
  },
  {
    slug: "timetamer",
    title: "TimeTamer",
    tier: 1,
    featured: true,
    period: "февраль 2025 – август 2025",
    role: "Командный проект",
    summary: "Java-сервер + Kotlin Android-приложение-календарь с AI и геймификацией",
    description:
      "Общие задания, статистика, достижения, push-уведомления и аутентификация; взаимодействие с сервером через Retrofit и WorkManager; AI-ассистент ChatGPT + Whisper для предложений по задачам и голосового ввода.",
    stack: ["Java", "Spring Boot", "Kotlin", "Jetpack Compose", "Retrofit", "WorkManager", "PostgreSQL", "Docker", "JUnit 4/5", "Mockito"],
    categories: ["Backend", "Android", "DevOps"],
    media: [
      {
        type: "video",
        src: "/projects/timetamer/calendar-demo.mp4",
        poster: "/projects/timetamer/calendar-poster.jpg",
        title: "Smart Calendar",
        description: "Сценарии календаря, общих задач и планирования в Android-приложении.",
      },
      {
        type: "video",
        src: "/projects/timetamer/ai-dialog-demo.mp4",
        poster: "/projects/timetamer/ai-dialog-poster.jpg",
        title: "AI-диалог и голосовой ввод",
        description: "Работа ассистента ChatGPT и распознавания речи Whisper.",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/hse-project-Java-2025" },
    ],
  },
  {
    slug: "population-forecast",
    title: "ML-прогноз численности населения",
    tier: 1,
    period: "индивидуальный проект",
    role: "ML / time series",
    summary: "Прогноз временных рядов на 10 лет",
    description:
      "Сбор данных из World Bank API, UN Population Division и Census API. Сравнение ARIMA, Prophet, линейной регрессии, XGBoost и Random Forest по MAPE, RMSE и стабильности ошибки.",
    metric: "Лучшая ARIMA с grid search: MAPE 0,020 на отложенном десятилетнем окне.",
    stack: ["Python", "pandas", "scikit-learn", "XGBoost", "Prophet", "statsmodels", "SciPy"],
    categories: ["ML"],
    links: [
      { label: "GitHub", href: "https://github.com/UsatovPavel/Pop_ML_Forecast10" },
    ],
  },
  {
    slug: "voevoda",
    title: "Voevoda",
    tier: 1,
    period: "январь 2024 – июнь 2024",
    role: "Командный проект",
    summary: "2D top-down RTS: управление генералом, захват городов, наём армии и сражения с ИИ",
    description:
      "Генерация городов и оппонентов, поведение врагов, виджеты армии ИИ, туман войны и механика сражений.",
    stack: ["C++", "Unreal Engine 4"],
    categories: [],
    media: [
      {
        type: "video",
        src: "/projects/voevoda/gameplay-demo.mp4",
        poster: "/projects/voevoda/gameplay-poster.jpg",
        title: "Игровой процесс Voevoda",
        description: "Демонстрация top-down RTS, боевой механики и поведения противников.",
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/UsatovPavel/Voevoda" }],
  },
  {
    slug: "ansible-deploy",
    title: "ansible-deploy + claude-web-console",
    tier: 1,
    period: "2026",
    role: "Индивидуальный проект",
    summary: "Автодеплой веб-консоли к headless Claude Code на VPS",
    description:
      "Ansible-роли с тегами и секретами в ansible-vault для раздельных prod- и test-групп. systemd без root с ProtectSystem=strict, Certbot с renewal-хуком и SNI на Nginx.",
    stack: ["Ansible", "ansible-vault", "systemd", "Nginx", "Certbot", "Bash"],
    categories: ["DevOps"],
    links: [
      { label: "ansible-deploy", href: "https://github.com/UsatovAI/ansible-deploy" },
      { label: "claude-web-console", href: "https://github.com/UsatovAI/claude-web-console" },
    ],
  },
];

export const educationalProjects: Project[] = [
  {
    slug: "java-git-cli",
    title: "Git CLI",
    tier: 2,
    period: "учебный проект",
    role: "Java",
    summary: "CLI-аналог Git",
    description: "Реализация основных операций системы контроля версий в консольном приложении.",
    stack: ["Java", "CLI"],
    categories: ["Backend"],
    links: [],
  },
  {
    slug: "zio-notification-service",
    title: "ZIO Notification Service",
    tier: 2,
    period: "учебный проект",
    role: "Scala",
    summary: "REST API для уведомлений",
    description: "Сервис уведомлений с учётом часовых поясов, построенный на ZIO.",
    stack: ["Scala", "ZIO", "REST API"],
    categories: ["Backend"],
    links: [
      { label: "GitHub", href: "https://github.com/UsatovPavel/ZIO-Notification-Service" },
    ],
  },
  {
    slug: "antlr-parser",
    title: "ANTLR-парсер",
    tier: 2,
    period: "учебный проект",
    role: "Python",
    summary: "Парсер регулярных выражений",
    description: "Парсер формального языка регулярных выражений, построенный с помощью ANTLR.",
    stack: ["Python", "ANTLR"],
    categories: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/UsatovPavel/Usatov-FL-HSE/tree/task4-dev",
      },
    ],
  },
  {
    slug: "portfolio-site",
    title: "Этот сайт",
    tier: 2,
    period: "июль 2026 – август 2026",
    role: "TypeScript",
    summary: "Собственный портфолио-сайт: Next.js + Tailwind",
    description:
      "Статический экспорт с пятью вариантами подачи контента (полный/JVM/backend/ML/DevOps); деплой на VPS через Nginx и Certbot.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Nginx"],
    categories: ["Backend"],
    links: [{ label: "GitHub", href: "https://github.com/UsatovAI/portfolio-site" }],
  },
];
