import { ui, type Locale } from "@/content/locale";

export function SkipLink({ locale }: { locale: Locale }) {
  return (
    <a href="#main" className="skip-link">
      {ui[locale].skipLink}
    </a>
  );
}
