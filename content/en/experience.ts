import type { ExperienceEntry } from "@/content/experience";

// English edition of content/experience.ts. The Yandex and T-Bank entries are
// translated line for line from HH_spam/Resume/Backend.tex.
export const experienceEn: ExperienceEntry[] = [
  {
    slug: "yandex-ads",
    org: "Yandex Advertising Network",
    role: "Backend internship",
    period: "September 2026 – present",
    bullets: [],
    stack: ["Java", "Kotlin", "Spring", "MySQL"],
  },
  {
    slug: "t-bank",
    org: "T-Bank",
    role: "Backend internship · Took part in migrating documents from long to UUID IDs · Document workflow product team",
    period: "April 2026 – July 2026",
    bullets: [
      "Versioned 10 endpoints for UUIDs so as not to break the mobile apps already installed on users’ devices.",
      "Wrote the team’s module in the shared B2B integration repository: 7 documented clients replacing three-year-old legacy code. Neighboring teams opened epics to migrate to the new API.",
      "Migrated 23 low-code integrations to the new API, enabling the accounting department’s switchover. Verified e2e on the QA environment.",
      "Database work: creating alerts, optimizing a query, adding extensions.",
      "Fixed document generation bugs: time handling on our side; restored a statistics column in an external service.",
    ],
    stack: ["Scala", "Cats Effect", "PostgreSQL", "Kanban", "Kafka", "Docker", "TypeScript", "ELK"],
  },
  {
    slug: "riid",
    org: "RIID for VK’s internal cloud",
    role: "Term project supervised by an SRE from VK · Java daemon for p2p downloading of OCI/Docker images, independent of the container engine",
    period: "January 2026 – June 2026",
    featured: true,
    bullets: [
      "Wrote a library — a gRPC client for Dragonfly that downloads layers from neighboring nodes; the library was adopted at VK.",
      "Made the case to the team for integrating with the Rust version instead of the previously agreed Go version, which is unsupported since 2026.",
      "Designed a modular architecture: CLI → dispatcher (download strategy) → registry client/cache/p2p → engine adapters.",
      "Achieved downloads 20% faster than Podman on a 12-node k8s cluster: 100 images from 1 MB to 5 GB.",
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
          alt: "Chart of download speed and image size comparing RIID and Podman",
          caption: "RIID vs Podman: download speed by image size",
          width: 884,
          height: 710,
        },
        {
          src: "/projects/riid/layer-bytes.png",
          alt: "Chart of RIID layer volume by source: cache and p2p",
          caption: "Traffic split between cache and p2p",
          width: 461,
          height: 295,
        },
      ],
      byTechnology: {
        Grafana: [
          {
            src: "/projects/riid/grafana-latency.png",
            alt: "Grafana chart with median and 95th percentile latency of the RIID pipeline",
            caption: "Grafana: p50 and p95 of successful downloads",
            width: 718,
            height: 369,
          },
        ],
        Kubernetes: [
          {
            src: "/projects/riid/kubernetes-pods.png",
            alt: "Kubernetes panel with the number of ready RIID, vmagent and Dragonfly pods",
            caption: "Kubernetes: pod status of the load-testing cluster",
            width: 1449,
            height: 418,
          },
        ],
      },
    },
  },
];
