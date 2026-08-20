import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Павел Усатов — backend-разработчик",
  description:
    "Портфолио Павла Усатова: backend-разработка, распределённые системы, Java, Scala, Go, Kafka, PostgreSQL и Kubernetes.",
  alternates: { canonical: "/default" },
};

export default function DefaultPortfolio() {
  return <PortfolioPage variant="default" />;
}
