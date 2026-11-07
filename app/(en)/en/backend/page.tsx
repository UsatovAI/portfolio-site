import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Pavel Usatov — backend developer",
  description:
    "Pavel Usatov’s backend-focused portfolio: Java, Scala, Go, REST APIs, Kafka, PostgreSQL and Kubernetes.",
  locale: "en",
  path: "/en/backend",
  ruPath: "/backend",
  enPath: "/en/backend",
});

export default function EnglishBackendPortfolio() {
  return <PortfolioPage variant="backend" locale="en" alternateHref="/backend" />;
}
