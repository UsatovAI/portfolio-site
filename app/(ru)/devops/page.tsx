import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Павел Усатов — DevOps-инженер",
  description:
    "DevOps-портфолио Павла Усатова: Kubernetes, CI/CD, Ansible, Docker, мониторинг и Linux.",
  locale: "ru",
  path: "/devops",
  ruPath: "/devops",
  enPath: "/en/devops",
});

export default function DevOpsPortfolio() {
  return <PortfolioPage variant="devops" alternateHref="/en/devops" />;
}
