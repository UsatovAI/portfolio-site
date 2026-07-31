"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_LINKS = [
  { href: "#home", label: "Главная", sectionId: "home" },
  { href: "#stack", label: "Стек", sectionId: "stack" },
  { href: "#projects", label: "Проекты", sectionId: "projects" },
  { href: "#experience", label: "Опыт", sectionId: "experience" },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.sectionId)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <nav
        aria-label="Основная навигация"
        className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <a
          href="#home"
          className="font-mono text-body font-bold text-text-primary transition-colors hover:text-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
        >
          Павел Усатов
        </a>

        <ul className="flex flex-wrap items-center gap-3 font-sans text-body font-medium sm:gap-5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    "rounded-sm px-1 py-1 transition-colors hover:text-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2 " +
                    (isActive ? "text-accent" : "text-text-secondary")
                  }
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}
