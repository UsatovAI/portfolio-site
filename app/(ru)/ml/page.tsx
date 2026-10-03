import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Павел Усатов — ML и backend-разработчик",
  description:
    "ML-ориентированное портфолио Павла Усатова: Python, pandas, scikit-learn, XGBoost, временные ряды и backend-интеграции.",
  alternates: { canonical: "/ml" },
};

export default function MlPortfolio() {
  return <PortfolioPage variant="ml" />;
}
