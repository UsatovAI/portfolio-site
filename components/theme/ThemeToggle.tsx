"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  // Start undecided until mounted, so we never render a toggle state that
  // contradicts what ThemeScript already set on <html> before hydration.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
      className="rounded-sm border border-border px-2 py-1 font-mono text-caption text-text-secondary transition-colors hover:border-terminal hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
    >
      {isDark === null ? "…" : isDark ? "☮ dark" : "☀ light"}
    </button>
  );
}
