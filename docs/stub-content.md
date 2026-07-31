# Portfolio Site — Stub Content (AGENT-45)

Stub-stage content only — real/expanded copy is TBD later. Every fact below must already be accurate; no invented numbers or repo links. Written 2026-07-31.

---

## 1. Skills / Stack

**Backend**
- Java — primary backend language (RIID, TimeTamer server, T-Bank internship exposure)
- Scala — Cats Effect 3, ZIO (T-Bank internship, PRAssign+AsyncFactorial, ZIO-Notification-Service)
- Go — REST API (PRAssign)
- Kotlin — Android (TimeTamer)
- Spring Boot, JUnit 4/5, Mockito, ScalaTest — frameworks/testing
- TypeScript — used on the T-Bank internship stack
- C++ — intermediate; used in Voevoda (Unreal Engine 4)

**ML / Python**
- Python — intermediate
- pandas, NumPy, scikit-learn, XGBoost — data/ML tooling (resume skills list)
- Prophet, statsmodels, SciPy — time-series/stats libraries (resume project descriptions)
- Jupyter — notebooks
- FastAPI, pytest — Python API + testing (scanovich-webUI hackathon stack)
- ANTLR — parser generator (regex-parser coursework project)

**Infra**
- Docker, Docker Compose — containerization
- Kubernetes — load-testing cluster (RIID), general skills list
- Kafka — PRAssign+AsyncFactorial pipeline, T-Bank internship
- PostgreSQL — T-Bank internship, PRAssign, TimeTamer
- Nginx — PRAssign (API scaling)
- Gradle — build tool (RIID)
- Grafana, Prometheus — monitoring (RIID, general skills list)
- ELK — T-Bank internship stack
- Git, Kanban — general workflow tooling
- gRPC, OCI/Docker Registry API, Podman, k6 — RIID-specific infra tooling (registry protocol work, load testing)

*[VERIFY]* systemd is not mentioned anywhere in either resume — omitted rather than guessed.

---

## 2. Projects

### Tier 1 — Flagship

- **RIID** — Java daemon for p2p downloading of OCI/Docker images, independent of the container engine; built for VK's internal cloud. Individual project, Jan–Jun 2026. Load-tested on a k8s cluster (100 images, 1MB–5GB): **1.2x faster than Podman**. Repo: https://github.com/UsatovPavel/riid. Stack: Java, Kubernetes, gRPC, OCI/Docker Registry API. *(Supporting p2p library, also Pavel's own: https://github.com/UsatovPavel/java-dragonfly-image-puller — [VERIFY] still current/public.)*

- **PRAssign + AsyncFactorial** — Go REST API + Scala/Kafka consumer pipeline: tasks ingested via the Go service, dispatched through Kafka, computed on Scala, tracked in Postgres. Individual project, Nov 2025–Jan 2026. Repos: https://github.com/UsatovPavel/PRAssign and https://github.com/UsatovPavel/AsyncFactorial. Stack: Go, Scala, Kafka, Cats Effect 3, PostgreSQL.

- **TimeTamer** — Java server + Kotlin/Jetpack Compose Android calendar app with gamification (shared tasks, stats, achievements, push notifications) and an AI assistant (ChatGPT + Whisper) for task suggestions and voice input. Team project (HSE coursework), Feb–Aug 2025 — built with teammates, not solo. Repo: https://github.com/hse-project-Java-2025 *[VERIFY — this is the org-level link given in the resume; confirm the specific repo name under that org before linking from the live site]*. Stack: Java, Spring Boot, Kotlin, Jetpack Compose, Retrofit.

### Tier 2 — Coursework / Hackathon

- **ZIO-Notification-Service** — Scala ZIO REST API for timezone-aware notifications. Coursework project. Repo: https://github.com/UsatovPavel/ZIO-Notification-Service. Stack: Scala, ZIO, REST API.

- **ANTLR parser** — Python regex parser built with ANTLR. Coursework project. Repo: https://github.com/UsatovPavel/Usatov-FL-HSE/tree/task4-dev *[VERIFY — links to a specific branch (`task4-dev`) of the Usatov-FL-HSE coursework repo; confirm the branch still exists / is still the right target before publishing]*. Stack: Python, ANTLR.

- **Voevoda** — 2D top-down RTS: command a general, capture cities, hire armies, fight AI. Team project, Jan–Jun 2024. Pavel's contribution per resume: city/opponent generation, enemy AI behavior, army widgets, fog of war, battles — built with teammates, not solo. Repo: https://github.com/UsatovPavel/Voevoda. Stack: C++, Unreal Engine 4.

- **scanovich-webUI** — MTS True Tech hackathon: Python orchestrator for AI models integrated into Open WebUI (query classification, model selection, file upload, PPTX generation via parallel LLM agents, speech-recognition integration, pytest coverage). Team hackathon project, 2026. Repo: https://github.com/FUYOH666/scanovich-webUI/ — **note:** this repo is hosted under teammate FUYOH666's GitHub account, not Pavel's; site copy should attribute it as a team hackathon entry Pavel contributed to, not a personal repo. Stack: Python, FastAPI, Open WebUI, Docker Compose.

---

## 3. Experience

- **T-Bank — Scala internship**, Apr 2026 – Jul 2026. Product team (document workflow, long→UUID migration). Built **10 new UUID-based endpoints**; built **7 integration clients** in the b2b integration repo (e2e-tested on the QA environment); built and tested **23 integrations** for a low-code platform, enabling migration to the new accounting API; also DB work (alerting, query optimization, extensions). Stack: Scala, Cats Effect, PostgreSQL, Kafka, Docker, TypeScript, ELK, Kanban.

- **Kirov Summer Interdisciplinary School (Вишкиль)** — supplementary-education teacher (mathematics). July 2024 and July 2025 (two summer sessions).
