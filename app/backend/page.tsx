import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Павел Усатов — backend-разработчик",
  description:
    "Backend-ориентированное портфолио Павла Усатова: Java, Scala, Go, REST API, Kafka, PostgreSQL и Kubernetes.",
  alternates: { canonical: "/backend" },
};

export default function BackendPortfolio() {
  return <PortfolioPage variant="backend" />;
}
