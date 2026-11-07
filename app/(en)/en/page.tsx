import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Pavel Usatov — backend developer",
  description:
    "Pavel Usatov’s portfolio: backend development, distributed systems, Java, Scala, Go, Kafka, PostgreSQL and Kubernetes.",
  locale: "en",
  path: "/en",
  ruPath: "/",
  enPath: "/en",
});

export default function EnglishHome() {
  return <PortfolioPage variant="default" locale="en" alternateHref="/" />;
}
