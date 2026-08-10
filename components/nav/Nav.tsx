"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_LINKS = [
  { href: "#experience", label: "Опыт", sectionId: "experience" },
  { href: "#projects", label: "Проекты", sectionId: "projects" },
  { href: "#education-projects", label: "Учебные", sectionId: "education-projects" },
  { href: "#activities", label: "Активности", sectionId: "activities" },
  { href: "#stack", label: "Стек", sectionId: "stack" },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, visible: false });
  const linksRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

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

  useLayoutEffect(() => {
    const list = linksRef.current;
    const activeLink = linkRefs.current[activeSection];
    if (!list || !activeLink) return;

    const updateIndicator = () => {
      setIndicator({
        left: activeLink.offsetLeft,
        top: activeLink.offsetTop + activeLink.offsetHeight - 2,
        width: activeLink.offsetWidth,
        visible: true,
      });
    };

    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(list);
    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 shadow-[0_1px_0_rgb(var(--color-terminal)/0.05)] backdrop-blur-xl">
      <nav
        aria-label="Основная навигация"
        className="mx-auto grid max-w-5xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-3 lg:grid-cols-[auto_1fr_auto] lg:px-6"
      >
        <a
          href="#home"
          className="font-mono text-body font-bold text-text-primary transition-colors hover:text-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
        >
          Павел Усатов
        </a>

        <ul
          ref={linksRef}
          className="relative col-span-2 row-start-2 flex min-w-0 items-center justify-between gap-3 overflow-x-auto font-sans text-caption font-medium sm:justify-start sm:gap-5 sm:text-body lg:col-span-1 lg:row-start-1 lg:justify-center"
        >
          <li
            aria-hidden="true"
            className="nav-selection-indicator"
            style={{
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
              transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
            }}
          />
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <li key={link.href}>
                <a
                  ref={(element) => {
                    linkRefs.current[link.sectionId] = element;
                  }}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveSection(link.sectionId)}
                  className={
                    "relative z-10 block rounded-sm px-1 py-1 transition-colors hover:text-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2 " +
                    (isActive ? "text-terminal" : "text-text-secondary")
                  }
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="col-start-2 row-start-1 lg:col-start-3">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
