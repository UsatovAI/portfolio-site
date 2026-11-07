import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Pavel Usatov — backend/infra developer",
  description:
    "Pavel Usatov’s JVM-focused portfolio: Java, Scala, Kotlin, Spring Boot, Kafka, PostgreSQL and Kubernetes.",
  locale: "en",
  path: "/en/jvm",
  ruPath: "/jvm",
  enPath: "/en/jvm",
});

export default function EnglishJvmPortfolio() {
  return <PortfolioPage variant="jvm" locale="en" alternateHref="/jvm" />;
}
