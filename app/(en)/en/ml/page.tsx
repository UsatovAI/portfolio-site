import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Pavel Usatov — ML and backend developer",
  description:
    "Pavel Usatov’s ML-focused portfolio: Python, pandas, scikit-learn, XGBoost, time series and backend integrations.",
  locale: "en",
  path: "/en/ml",
  ruPath: "/ml",
  enPath: "/en/ml",
});

export default function EnglishMlPortfolio() {
  return <PortfolioPage variant="ml" locale="en" alternateHref="/ml" />;
}
