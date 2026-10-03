import type { StackCategory } from "@/content/stack";

// English edition of content/stack.ts.
export const stackCategoriesEn: StackCategory[] = [
  {
    slug: "backend",
    title: "Backend",
    items: [
      { name: "Java", note: "RIID, TimeTamer server, Git CLI coursework, Yandex internship" },
      { name: "Scala", note: "Cats Effect 3, ZIO — T-Bank internship, PRAssign+AsyncFactorial, ZIO-Notification-Service" },
      { name: "Go", note: "REST API — PRAssign" },
      { name: "Kotlin", note: "Android — TimeTamer; Yandex internship" },
      { name: "Spring Boot" },
      { name: "TypeScript", note: "T-Bank internship stack" },
      { name: "C++", note: "intermediate — Voevoda (Unreal Engine 4)" },
    ],
  },
  {
    slug: "ml-python",
    title: "ML & Python",
    items: [
      { name: "Python", note: "intermediate" },
      { name: "pandas" },
      { name: "NumPy" },
      { name: "scikit-learn" },
      { name: "XGBoost" },
      { name: "Prophet", note: "time series" },
      { name: "statsmodels" },
      { name: "SciPy" },
      { name: "Jupyter" },
      { name: "FastAPI", note: "scanovich-webUI hackathon" },
      { name: "pytest" },
      { name: "ANTLR", note: "parser generator — regex parser coursework" },
    ],
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    items: [
      { name: "Docker" },
      { name: "Docker Compose" },
      { name: "Kubernetes", note: "RIID load-testing cluster" },
      { name: "Kafka", note: "PRAssign+AsyncFactorial, T-Bank internship" },
      { name: "PostgreSQL", note: "T-Bank internship, PRAssign, TimeTamer" },
      { name: "MySQL", note: "Yandex internship" },
      { name: "Nginx", note: "scaling the PRAssign API" },
      { name: "gRPC", note: "RIID" },
      { name: "OCI/Docker Registry API", note: "RIID" },
      { name: "Podman", note: "RIID load-test baseline" },
    ],
  },
  {
    slug: "tools",
    title: "Tools",
    items: [
      { name: "Git" },
      { name: "Kanban" },
      { name: "Jira", note: "Moscow utility tunnels hackathon" },
      { name: "Gradle", note: "RIID build" },
      { name: "Grafana" },
      { name: "Prometheus" },
      { name: "ELK", note: "T-Bank internship stack" },
      { name: "k6", note: "RIID load testing" },
      { name: "JUnit 4/5" },
      { name: "Mockito" },
      { name: "ScalaTest" },
    ],
  },
];
