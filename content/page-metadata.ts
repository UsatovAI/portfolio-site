import type { Metadata } from "next";
import type { Locale } from "@/content/locale";

// Every page sets its own title and description; Open Graph and Twitter cards
// must repeat them, or link previews (Discord, Telegram, Slack) fall back to the
// root layout's generic card and the root URL.
export function pageMetadata({
  title,
  description,
  locale,
  path,
  ruPath,
  enPath,
}: {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  ruPath: string;
  enPath: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, languages: { ru: ruPath, en: enPath } },
    openGraph: {
      title,
      description,
      url: path,
      locale: locale === "en" ? "en_US" : "ru_RU",
      alternateLocale: locale === "en" ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
