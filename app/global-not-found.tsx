import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { YandexMetrika } from "@/components/analytics/YandexMetrika";
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

export const metadata: Metadata = {
  title: "404 — страница не найдена",
};

export default function GlobalNotFound() {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 sm:px-6">
          <p className="font-mono text-body text-terminal">
            <span aria-hidden="true">$</span> cd {"<path>"}
          </p>
          <h1 className="mt-2 text-h1 text-text-primary">404</h1>
          <p className="mt-4 text-lead text-text-secondary">
            Страница не найдена · Page not found
          </p>
          <a
            href="/"
            className="mt-8 inline-block w-fit border border-border px-4 py-2 font-mono text-body text-text-primary transition-colors hover:border-terminal"
          >
            ← на главную
          </a>
        </main>
        <YandexMetrika />
      </body>
    </html>
  );
}
