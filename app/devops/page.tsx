import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Павел Усатов — DevOps-инженер",
  description:
    "DevOps-портфолио Павла Усатова: Kubernetes, CI/CD, Ansible, Docker, мониторинг и Linux.",
  alternates: { canonical: "/devops" },
};

export default function DevOpsPortfolio() {
  return <PortfolioPage variant="devops" />;
}
