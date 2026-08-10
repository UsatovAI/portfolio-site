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

const siteUrl = "https://usatovpavel.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Павел Усатов — JVM backend-разработчик",
  description:
    "Портфолио Павла Усатова: JVM backend, Scala, Java, Kafka и Kubernetes. Опыт в Т-Банке, RIID, продуктовые, ML и учебные проекты.",
  openGraph: {
    title: "Павел Усатов — JVM backend-разработчик",
    description:
      "Портфолио Павла Усатова: JVM backend, Scala, Java, Kafka и Kubernetes. Опыт в Т-Банке, RIID, продуктовые, ML и учебные проекты.",
    url: siteUrl,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Павел Усатов — JVM backend-разработчик",
    description:
      "Портфолио Павла Усатова: JVM backend, Scala, Java, Kafka и Kubernetes. Опыт в Т-Банке, RIID, продуктовые, ML и учебные проекты.",
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
