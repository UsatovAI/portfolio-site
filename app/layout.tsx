import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeScript } from "@/components/theme/ThemeScript";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "http://144.124.226.50:8081";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Павел Усатов — backend/infra-разработчик",
  description:
    "Портфолио Павла Усатова: Java, Scala, Go, Kubernetes. RIID, PRAssign+AsyncFactorial, TimeTamer и другие проекты, стажировка в Т-Банке.",
  openGraph: {
    title: "Павел Усатов — backend/infra-разработчик",
    description:
      "Портфолио Павла Усатова: Java, Scala, Go, Kubernetes. RIID, PRAssign+AsyncFactorial, TimeTamer и другие проекты, стажировка в Т-Банке.",
    url: siteUrl,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Павел Усатов — backend/infra-разработчик",
    description:
      "Портфолио Павла Усатова: Java, Scala, Go, Kubernetes. RIID, PRAssign+AsyncFactorial, TimeTamer и другие проекты, стажировка в Т-Банке.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>{children}</body>
    </html>
  );
}
