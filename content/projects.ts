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
}

// Source: the resume attached to AGENT-64. Main and educational work are kept
// as separate collections so the page mirrors the resume structure.
export const projects: Project[] = [
  {
    slug: "scanovich-webui",
    title: "Scanovich",
    tier: 1,
    period: "2026",
    role: "Командный хакатон MTS True Tech",
    summary: "Python-оркестратор AI-моделей для Open WebUI",
    description:
      "Классификация запросов, выбор модели и загрузка файлов из Open WebUI. Генерация PPTX через LLM-план, параллельных агентов и шаблоны под аудиторию; интеграция распознавания речи и pytest-тесты.",
    stack: ["Python", "FastAPI", "Open WebUI", "REST API", "pytest", "Docker Compose"],
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
    stack: ["Go", "Scala", "Kafka", "Cats Effect 3", "PostgreSQL", "Nginx", "Docker", "k6"],
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
    role: "Командный проект",
    summary: "Java-сервер + Kotlin/Compose календарь",
    description:
      "Календарь с общими заданиями, статистикой, достижениями, push-уведомлениями и AI-ассистентом ChatGPT + Whisper для подсказок и голосового ввода.",
    stack: ["Java", "Spring Boot", "Kotlin", "Jetpack Compose", "Retrofit", "PostgreSQL"],
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
    summary: "2D top-down RTS на Unreal Engine 4",
    description:
      "Генерация городов и оппонентов, поведение врагов, виджеты армии ИИ, туман войны и механика сражений.",
    stack: ["C++", "Unreal Engine 4"],
    links: [{ label: "GitHub", href: "https://github.com/UsatovPavel/Voevoda" }],
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
    links: [
      {
        label: "GitHub",
        href: "https://github.com/UsatovPavel/Usatov-FL-HSE/tree/task4-dev",
      },
    ],
  },
];
