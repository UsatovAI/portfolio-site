import { PortfolioPage } from "@/components/PortfolioPage";
import { pageMetadata } from "@/content/page-metadata";

export const metadata = pageMetadata({
  title: "Павел Усатов — ML и backend-разработчик",
  description:
    "ML-ориентированное портфолио Павла Усатова: Python, pandas, scikit-learn, XGBoost, временные ряды и backend-интеграции.",
  locale: "ru",
  path: "/ml",
  ruPath: "/ml",
  enPath: "/en/ml",
});

export default function MlPortfolio() {
  return <PortfolioPage variant="ml" alternateHref="/en/ml" />;
}
