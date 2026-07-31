# Portfolio Site — Architecture

**Jira:** AGENT-44 "Site architecture" (child of AGENT-40 "My portfolio site")
**Builds on:** `docs/portfolio-requirements.md` (AGENT-41 research). This doc resolves the open structural questions Pavel raised in the AGENT-44 comments and lays out the concrete site/repo architecture to build against.

---

## 1. Decisions (resolving the open questions from AGENT-44)

| Question raised | Decision | Why |
|---|---|---|
| Canvas vs. pages vs. "game scenario" structure | **Pages** (standard scrollable sections, server-rendered/static — not a canvas/WebGL scene, not an interactive game-style walkthrough) | A canvas/game structure is the bruno-simon-style ceiling: it costs disproportionate build time for a payoff that only fits a graphics/WebGL specialist proving graphics mastery (see requirements doc §6). Pavel's target audience is RU backend/infra hiring, not creative-coding roles — a fast, accessible, content-forward page structure sells the actual work better and fits the "may host on a 4RAM/2vCPU VPS" budget from AGENT-40 far more comfortably than a WebGL scene would. |
| Language scope | **Russian only, no `/en` route or language switcher** | AGENT-44: "en is useless (i apply in russia to job)." This supersedes requirements doc §5's earlier bilingual RU/EN recommendation — see the correction applied to that doc in this same PR. |
| Navigation style | **Persistent top nav bar, large and always visible**, not a hidden hamburger or scroll-only site. Nav links may optionally also appear inline within page content (e.g. a repeated in-page jump menu), not only as fixed top chrome. | Modeled on the "good business positioning" example Pavel flagged (therobin.dev/services): a nav that reads like clear service/section categories rather than an about-me scroll with no wayfinding. |
| Stack/project presentation style | **Grouped, labeled categories: Backend, ML/Python, Infra** (Go folds under Backend rather than getting its own category — per Pavel's review, don't call out Go separately) rendered with a **terminal/shell-style visual treatment** — monospace category headers, `$`-prefixed or directory-listing-style project entries | Modeled on the categorized formatting Pavel flagged at amidat.tech, adapted to his own categories, plus his own note that "my projects can be bash-descripted" — i.e. project entries get a terminal-flavored presentation (e.g. `~/projects/riid $ ...`) rather than generic cards, which also doubles as a signature visual motif tying together someone who works close to infra/CLI tooling. |

## 2. Sitemap

Single domain, Russian-only, no locale routing:

```
/                 Home — hero/about, condensed project highlights, links to sections below
/#stack           Stack — categorized, terminal-styled (Backend, ML/Python, Infra)
/#projects        Projects — Tier 1 (flagship: RIID, PRAssign+AsyncFactorial, TimeTamer)
                             Tier 2 (coursework/hackathon: ZIO-Notification-Service, ANTLR
                             parser, Voevoda, scanovich-webUI)
/#experience      Experience — T-Bank Scala internship, teaching role, dated entries
(footer)          Resume PDF download link + contact (mailto, LinkedIn, Telegram) —
                   no phone in cleartext, no dedicated nav item or route
```

Anchors (`/#section`) keep it a single scrollable page for every primary section (per requirements doc §2), matching the "pages" decision above. No `/resume` route and no dedicated Contact section per Pavel's review: the site's job is describing him as a candidate, not duplicating the resume — the resume PDF link and contact details both just live in the page footer, mirroring scanovich.ai's end-of-page contact pattern instead of being promoted to nav-level destinations.

## 3. Navigation

Fixed/sticky top bar, visible at all scroll positions, with explicit labeled links (not icons-only): `Главная` · `Стек` · `Проекты` · `Опыт`. Resume and contact are footer-only (see §2) rather than top-nav destinations. Active-section highlighting on scroll. No hamburger collapse above mobile breakpoints — the whole point of the therobin.dev-style reference is that the nav itself communicates the site's structure at a glance. The same links may also repeat inline within page content (e.g. a "jump to" menu partway down the page), not only as fixed top chrome.

## 4. Repository layout (Next.js)

```
/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Home (renders section components in order)
│   └── layout.tsx              # Root layout: nav, fonts, theme provider
├── components/
│   ├── nav/                    # Sticky top nav + active-section tracking
│   ├── sections/               # Hero, Stack, Projects, Experience
│   ├── footer/                 # Resume PDF link + contact (mailto, LinkedIn, Telegram)
│   └── ui/                     # Shared primitives (terminal-styled card, tag, etc.)
├── content/
│   ├── projects.ts             # Project entries: role, stack tags, metrics, links
│   ├── experience.ts           # Experience entries: dates, org, tags
│   └── stack.ts                # Stack categories → items
├── public/
│   ├── resume.pdf              # Generated from resume/*.tex, kept text-selectable
│   └── og/                     # Open Graph images
├── docs/                       # This repo's own project docs (already in place)
└── resume/                     # Existing LaTeX sources (already in place)
```

Content lives in typed data files (`content/*.ts`), not a CMS or MDX — per requirements doc §7's explicit anti-pattern (satnaing.dev's abandoned CMS-backed blog). No blog at launch.

## 5. Tech stack & hosting

- **Framework:** Next.js, static export (`next export` / `output: "export"`) — no server runtime required.
- **Styling:** Tailwind CSS.
- **Hosting:** self-hosted static files on the VPS mentioned in AGENT-40 (4 RAM / 2 vCPU / 80 GB, upgradeable to 8 RAM / 4 vCPU) behind Nginx with HTTPS (Certbot) — the laptop and the VPS are both viable per AGENT-40, but the VPS is preferred so the site is reachable without Pavel's machine being on. GitHub Pages remains a fallback if VPS deployment is deprioritized.
- **Analytics:** optional, single lightweight script (Plausible/Umami) — no over-instrumentation.
- **Repository visibility:** private (AGENT-44 acceptance criterion) — done.

## 6. Deployment flow (CD, not a manual step)

Per Pavel's review: what's live on the site must reflect what's actually in the GitHub repo — no manual copy-paste step that can drift out of sync.

1. Push/merge to `main` triggers a GitHub Actions workflow automatically (no manual "someone runs a build" step).
2. The workflow builds (`next build`, static export) and deploys straight to the VPS — either by pushing the built `out/` directory over SSH (rsync/scp), or by having the VPS pull `main` and rebuild via a small webhook listener. Either way, `main` is the single source of truth for what's live.
3. Nginx serves the exported `out/` directory, HTTPS via Certbot, matching the anti-pattern fix in requirements doc §9 (anpilovml.ru refuses HTTPS — don't repeat that).
4. `resume.pdf` is regenerated from `resume/*.tex` and copied into `public/` as part of the same automated build, not hand-uploaded, so the downloadable PDF never drifts from the LaTeX source of truth either.

## 7. Open follow-ups

- Actual Next.js scaffold (this doc is architecture, not implementation) is the next piece of work once this is reviewed.
