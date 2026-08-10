import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Павел Усатов — backend/infra-разработчик",
  description:
    "JVM-ориентированное портфолио Павла Усатова: Java, Scala, Kotlin, Spring Boot, Kafka, PostgreSQL и Kubernetes.",
  alternates: { canonical: "/jvm" },
};

export default function JvmPortfolio() {
  return <PortfolioPage variant="jvm" />;
}
