export interface StackItem {
  name: string;
  note?: string;
  muted?: boolean;
}

export interface StackCategory {
  slug: string;
  title: string;
  items: StackItem[];
}

// Resume-backed items are synchronized with HH_spam/Resume/BackendTex.tex; the
// broader portfolio adds tools evidenced by portfolio-only projects. Go folds
// under Backend rather than getting its own category, per site-architecture.md §1.
// Testing frameworks (JUnit/Mockito/ScalaTest) and dev/observability tooling
// (Gradle/Grafana/Prometheus/ELK/Git/Kanban/k6) live under Tools, separate from
// Infrastructure (runtime/deployment tech) — split requested directly by Pavel.
export const stackCategories: StackCategory[] = [
  {
    slug: "backend",
    title: "Backend",
    items: [
      { name: "Java", note: "RIID, сервер TimeTamer, учебный Git CLI" },
      { name: "Scala", note: "Cats Effect 3, ZIO — стажировка в Т-Банке, PRAssign+AsyncFactorial, ZIO-Notification-Service" },
      { name: "Go", note: "REST API — PRAssign" },
      { name: "Kotlin", note: "Android — TimeTamer" },
      { name: "Spring Boot" },
      { name: "TypeScript", note: "стек стажировки в Т-Банке" },
      { name: "C++", note: "средний уровень — Voevoda (Unreal Engine 4)" },
    ],
  },
  {
    slug: "ml-python",
    title: "ML & Python",
    items: [
      { name: "Python", note: "средний уровень" },
      { name: "pandas" },
      { name: "NumPy" },
      { name: "scikit-learn" },
      { name: "XGBoost" },
      { name: "Prophet", note: "временные ряды" },
      { name: "statsmodels" },
      { name: "SciPy" },
      { name: "Jupyter" },
      { name: "FastAPI", note: "хакатон scanovich-webUI" },
      { name: "pytest" },
      { name: "ANTLR", note: "генератор парсеров — учебный regex-парсер" },
    ],
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    items: [
      { name: "Docker" },
      { name: "Docker Compose" },
      { name: "Kubernetes", note: "кластер нагрузочного тестирования RIID" },
      { name: "Kafka", note: "PRAssign+AsyncFactorial, стажировка в Т-Банке" },
      { name: "PostgreSQL", note: "стажировка в Т-Банке, PRAssign, TimeTamer" },
      { name: "Nginx", note: "масштабирование API PRAssign" },
      { name: "gRPC", note: "RIID" },
      { name: "OCI/Docker Registry API", note: "RIID" },
      { name: "Podman", note: "база сравнения нагрузочных тестов RIID" },
      // [VERIFY] systemd is not mentioned anywhere in either resume — omitted per
      // docs/stub-content.md §1 rather than guessed.
    ],
  },
  {
    slug: "tools",
    title: "Tools",
    items: [
      { name: "Git" },
      { name: "Kanban" },
      { name: "Gradle", note: "сборка RIID" },
      { name: "Grafana" },
      { name: "Prometheus" },
      { name: "ELK", note: "стек стажировки в Т-Банке" },
      { name: "k6", note: "нагрузочное тестирование RIID" },
      { name: "JUnit 4/5" },
      { name: "Mockito" },
      { name: "ScalaTest" },
    ],
  },
];
