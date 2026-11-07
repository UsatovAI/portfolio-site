import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Павел Усатов — backend-разработчик",
  description:
    "Backend-ориентированное портфолио Павла Усатова: Java, Scala, Go, REST API, Kafka, PostgreSQL и Kubernetes.",
  locale: "ru",
  path: "/backend",
  ruPath: "/backend",
  enPath: "/en/backend",
});

export default function BackendPortfolio() {
  return <PortfolioPage variant="backend" alternateHref="/en/backend" />;
}
