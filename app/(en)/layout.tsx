import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { YandexMetrika } from "@/components/analytics/YandexMetrika";
import { ThemeScript } from "@/components/theme/ThemeScript";
import "../globals.css";

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

// Root layout for the English pages: a separate route group so <html lang>
// is "en" here and "ru" everywhere else.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pavel Usatov — backend developer",
  description:
    "Pavel Usatov’s portfolio: backend development, distributed systems, Java, Scala, Kotlin, Kafka, PostgreSQL and Kubernetes.",
  openGraph: {
    title: "Pavel Usatov — backend developer",
    description:
      "Pavel Usatov’s portfolio: backend development, distributed systems, Java, Scala, Kotlin, Kafka, PostgreSQL and Kubernetes.",
    url: siteUrl,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pavel Usatov — backend developer",
    description:
      "Pavel Usatov’s portfolio: backend development, distributed systems, Java, Scala, Kotlin, Kafka, PostgreSQL and Kubernetes.",
  },
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
