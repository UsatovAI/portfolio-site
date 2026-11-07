import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Pavel Usatov — backend developer",
  description:
    "Pavel Usatov’s portfolio: backend and distributed systems, Java, Scala, Go, Kafka, PostgreSQL, Kubernetes.",
  locale: "en",
  path: "/en/default",
  ruPath: "/default",
  enPath: "/en/default",
});

export default function EnglishDefaultPortfolio() {
  return <PortfolioPage variant="default" locale="en" alternateHref="/default" />;
}
