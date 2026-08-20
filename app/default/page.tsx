import type { Metadata } from "next";
import { PortfolioPage } from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Павел Усатов — backend-разработчик",
  alternates: { canonical: "/default" },
};

export default function DefaultPortfolio() {
  return <PortfolioPage variant="default" />;
}
