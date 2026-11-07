import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Павел Усатов — backend-разработчик",
  description:
    "Портфолио Павла Усатова: backend и распределённые системы, Java, Scala, Go, Kafka, PostgreSQL, Kubernetes.",
  locale: "ru",
  path: "/default",
  ruPath: "/default",
  enPath: "/en/default",
});

export default function DefaultPortfolio() {
  return <PortfolioPage variant="default" alternateHref="/en/default" />;
}
