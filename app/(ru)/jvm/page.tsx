import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Павел Усатов — backend/infra-разработчик",
  description:
    "JVM-ориентированное портфолио Павла Усатова: Java, Scala, Kotlin, Spring Boot, Kafka, PostgreSQL и Kubernetes.",
  locale: "ru",
  path: "/jvm",
  ruPath: "/jvm",
  enPath: "/en/jvm",
});

export default function JvmPortfolio() {
  return <PortfolioPage variant="jvm" alternateHref="/en/jvm" />;
}
