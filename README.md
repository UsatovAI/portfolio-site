# portfolio-site

Portfolio/candidate site for Pavel Usatov ([github.com/UsatovPavel](https://github.com/UsatovPavel)),
a 3rd-year Applied Mathematics & Computer Science student at HSE University, Saint Petersburg.

Live at [usatovpavel.ru](https://usatovpavel.ru).

Next.js (App Router) + Tailwind, exported as a static site (`output: "export"`). One build
serves five content variants, each reordering/reshaping the same sections for a different
audience:

- `/default` (and `/`) — complete portfolio
- `/jvm` — JVM-first framing (Java/Kotlin/Scala prioritized, TypeScript dropped)
- `/backend` — backend/infra stack and projects prioritized
- `/ml` — ML/Python stack and projects prioritized
- `/devops` — shared portfolio content with a DevOps role and résumé

## Structure

- `content/` — resume-sourced data (experience, projects, stack, per-variant copy)
- `components/sections/` — page sections (Hero, Stack, Experience, Projects, Educational
  Projects, Additional Activities)
- `components/ui/` — terminal-motif entry cards and shared UI primitives
- `docs/` — requirements/architecture research behind the build (see below)
- `nginx/` — TLS bootstrap (Certbot) and vhost template for the production deploy
- `resume/` — LaTeX source the site content is pulled from

## Deploying

The site is a static export (`npm run build` → `out/`) served by Nginx on a VPS behind Cloudflare.
`nginx/bootstrap.sh` provisions TLS via Certbot and installs the vhost from `nginx/site.conf.template`.
CI (`.github/workflows/deploy.yml`) builds on every push to `main`, then rsyncs `out/` to `WEB_ROOT`.
`nginx/deploy.sh` does the same by hand; credentials and secrets are listed in `nginx/README.md`.

## Docs

- `docs/portfolio-requirements.md` — research-based requirements (AGENT-41)
- `docs/site-architecture.md` — sitemap, nav, repo layout, hosting/CD decisions (AGENT-44)
- `docs/design-system.md` — visual language (terminal motif, tokens, component specs)
- `docs/backend-portfolio-research-2/` — round-2 competitor research and the resulting
  ideas-to-improve backlog (AGENT-69)

## License

MIT — see [LICENSE](LICENSE).
