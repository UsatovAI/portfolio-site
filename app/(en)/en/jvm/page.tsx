import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Pavel Usatov — backend/infra developer",
  description:
    "Pavel Usatov’s JVM-focused portfolio: Java, Scala, Kotlin, Spring Boot, Kafka, PostgreSQL and Kubernetes.",
  alternates: { canonical: "/en/jvm", languages: { ru: "/jvm", en: "/en/jvm" } },
};

export default function EnglishJvmPortfolio() {
  return <PortfolioPage variant="jvm" locale="en" alternateHref="/jvm" />;
}
