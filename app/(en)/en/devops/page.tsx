import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Pavel Usatov — DevOps engineer",
  description:
    "Pavel Usatov’s DevOps portfolio: Kubernetes, CI/CD, Ansible, Docker, monitoring and Linux.",
  locale: "en",
  path: "/en/devops",
  ruPath: "/devops",
  enPath: "/en/devops",
});

export default function EnglishDevOpsPortfolio() {
  return <PortfolioPage variant="devops" locale="en" alternateHref="/devops" />;
}
