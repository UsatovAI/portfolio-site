export interface ExperienceEntry {
  slug: string;
  org: string;
  role: string;
  period: string;
  bullets: string[];
  stack?: string[];
}

// Source: docs/stub-content.md §3.
export const experience: ExperienceEntry[] = [
  {
    slug: "t-bank",
    org: "Т-Банк",
    role: "Стажировка, Scala-разработчик",
    period: "апрель 2026 – июль 2026",
    bullets: [
      "Продуктовая команда документооборота: миграция long → UUID.",
      "Создал 10 новых эндпоинтов, работающих с UUID.",
      "Создал 7 клиентов интеграций в репозитории b2b-интеграций, протестировал e2e на QA-контуре.",
      "Создал и протестировал 23 интеграции для low-code платформы, обеспечив переход на новое API бухгалтерии.",
      "Работа с БД: настройка алертов, оптимизация запросов, добавление расширений.",
    ],
    stack: ["Scala", "Cats Effect", "PostgreSQL", "Kafka", "Docker", "TypeScript", "ELK", "Kanban"],
  },
  {
    slug: "vishkil",
    org: "Кировская летняя метапредметная школа (Вишкиль)",
    role: "Педагог дополнительного образования (математика)",
    period: "июль 2024, июль 2025",
    bullets: ["Две летние сессии преподавания математики."],
  },
];
