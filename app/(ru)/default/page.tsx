import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Павел Усатов — backend-разработчик",
  description:
    "Портфолио Павла Усатова: backend и распределённые системы, Java, Scala, Go, Kafka, PostgreSQL, Kubernetes.",
  openGraph: {
    title: "Павел Усатов — backend-разработчик",
    description:
      "Портфолио Павла Усатова: backend и распределённые системы, Java, Scala, Go, Kafka, PostgreSQL, Kubernetes.",
    url: "/default",
  },
  twitter: {
    title: "Павел Усатов — backend-разработчик",
    description:
      "Портфолио Павла Усатова: backend и распределённые системы, Java, Scala, Go, Kafka, PostgreSQL, Kubernetes.",
  },
  alternates: { canonical: "/default" },
};

export default function DefaultPortfolio() {
  return <PortfolioPage variant="default" />;
}
