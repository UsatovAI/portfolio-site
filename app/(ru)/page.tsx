import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Павел Усатов — backend-разработчик",
  description:
    "Портфолио Павла Усатова: backend-разработка, распределённые системы, Java, Scala, Go, Kafka, PostgreSQL и Kubernetes.",
  locale: "ru",
  path: "/",
  ruPath: "/",
  enPath: "/en",
});

export default function Home() {
  return <PortfolioPage variant="default" alternateHref="/en" />;
}
