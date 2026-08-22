import type { PortfolioVariant } from "@/content/portfolio-variant";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

// Footer: resume PDF link + contact only — no dedicated /resume or /contact route,
// per site-architecture.md §2/§3. No phone number in cleartext (requirements §5).
//
// Deviation from site-architecture.md §2/§4: that doc lists "mailto, LinkedIn,
// Telegram" as the contact set. Pavel's resume (resume/resume2026.tex) only lists a
// phone number, an email, and a GitHub profile — no LinkedIn or Telegram handle
// exists anywhere in the source docs. Per stub-content.md's "no invented numbers or
// repo links" rule, that same discipline applies to contact links: rather than
// invent a LinkedIn/Telegram URL, this footer links only email (mailto) and GitHub.
// Flagged in the PR description for Pavel to add real LinkedIn/Telegram links (and
// update site-architecture.md) if he wants those channels included.
export function Footer({ variant }: { variant: PortfolioVariant }) {
  const resume =
    variant === "devops"
      ? { href: "/resume-devops.pdf?v=2026-08-21", label: "DevOps-резюме" }
      : variant === "jvm"
        ? { href: "/resume.pdf?v=2026-08-21", label: "Java-резюме" }
        : { href: "/resume.pdf?v=2026-08-21", label: "резюме" };

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-body text-text-secondary">
              <span className="text-terminal">$</span> resume --format=pdf
            </p>
            <a
              href={resume.href}
              className="inline-block border-b border-border font-sans text-body text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
            >
              Скачать {resume.label} (PDF) ↓
            </a>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-body text-text-secondary">
              <span className="text-terminal">$</span> contact --list
            </p>
            <ul className="space-y-1 font-sans text-body">
              <li>
                <a
                  href="mailto:pvusatov@edu.hse.ru"
                  className="border-b border-border text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
                >
                  pvusatov@edu.hse.ru
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/UsatovPavel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-b border-border text-accent transition-colors hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 font-mono text-caption text-text-secondary">
          Обновлено: 22 августа 2026
        </p>
      </div>
    </footer>
  );
}
