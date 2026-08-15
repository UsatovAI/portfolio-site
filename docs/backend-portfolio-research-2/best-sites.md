# Backend/fullstack engineer portfolio sites — best-of list

**Jira:** AGENT-69 "Explore backend engineer websites 2" (child of AGENT-40 "My portfolio site")
**Scope:** Round 2 of portfolio research, narrowed to backend/fullstack engineers specifically (round 1, AGENT-41, covered a broader SE/hackathon-dev cohort — see `docs/se-portfolio-research/`).
**Method:** 4 parallel research agents, 2 sites each, 8 candidates total. All 8 were pre-filtered for qualitative merit before research — none are blank templates or generic white-background resume pages. Full findings condensed below; see `ideas-to-improve.md` for the synthesized action list.

Sites are grouped into two tiers. Tier A is strong on both content *and* execution/design — copy structure and, where relevant, visual patterns. Tier B is included for one specific, high-value lesson each, but the site's visual minimalism/plainness should **not** be copied wholesale — each only gets away with it because of the owner's existing reputation, which a job-seeking candidate doesn't have yet.

---

## Tier A — best-in-class (content + execution)

### [fasterthanli.me](https://fasterthanli.me) — Amos Wenger
Long-form technical-writing portfolio; the site *is* the credibility argument (an 8-hour deep-dive series on building an executable packer from scratch). No CV page, no "hire me" CTA — pure demonstrated depth.
- Two content tiers with a stated contract: quick "Articles" vs. long-form "Series" starting from a premise, so a reader self-selects by time available.
- Total-read-time badges on series ("8 hours 53 min"), plus `complete`/incomplete status badges — signals finished work, not another half-abandoned repo.
- Recurring illustrated character asides break up long technical text; the site is recognizable from one screenshot.
- Self-hosted custom Rust stack behind Cloudflare, own asset CDN.

### [xeiaso.net](https://xeiaso.net) — Xe Iaso
Blog-led hub where the homepage doubles as a condensed resume (identity line → skill tags → notable publications → featured projects → recent posts) sitting above the post feed.
- Backend/systems credibility comes from shipped artifacts (Anubis anti-scraper filter, a toy language compiling to Wasm) and protocol-level post titles (SigV4, DNS, object storage), not adjectives.
- The infrastructure is itself a signal: self-hosted (no CDN in response headers), a Tor onion mirror, custom response headers — reads as "operates real systems."
- Footer credits the site's own custom-built generator and CSS framework, with a link to the repo.

### [simonwillison.net](https://simonwillison.net) — Simon Willison
24-year-running weblog (Django + PostgreSQL, self-built, source public) with essentially no "portfolio" framing — the content is the credential.
- Multiple content types at different effort levels: long Entries, short Links (a URL + two sentences of commentary), Quotes, Notes, TILs — this is what keeps a site looking alive between big posts.
- TILs as a first-class section — the lowest-friction way to show active depth in a technology without owing a full essay.
- Aggressive per-topic tagging (1,800+ tags) doubles as navigation — each tag has its own archive page and its own feed, so a recruiter can land straight on `/tags/kotlin/`.
- Caveat: no above-the-fold "who am I / hire me" block and no contact info — works only because he's already a known quantity.

### [jvns.ca](https://jvns.ca) — Julia Evans
Blog-led, archive-first — the homepage is the full 12-year archive organized into ~44 hand-written, human-named topic sections (not an auto-generated tag cloud).
- ★-marked favorites inside every category list, plus a dedicated `/favorites` page, so a first-time visitor's first click is the best work, not the newest.
- Projects page is written as motivation-then-trail (2–4 paragraphs on *why* the project exists) with links to both the related blog posts and the repo — projects and writing cross-reference each other instead of sitting in separate silos.
- Honesty markers build trust: project entries note when they "might be out of date" or when maintainership was handed off.
- Caveat: works at 12 years of volume; with 10–20 posts the same taxonomy would look like an empty skeleton.

### [thorstenball.com](https://thorstenball.com) — Thorsten Ball
The single best *structural template* for a job-seeker at a smaller content volume. Homepage doubles as the About page: circular avatar, three short paragraphs naming shipped products (Amp, Zed, Sourcegraph, two self-published Go books), then Contact/Newsletter. Persistent left sidebar nav.
- Nav organized by artifact type, not by project: Books / Blog / Podcasts / Talks — each section is a distinct proof format.
- ★ favorites on the blog index (same pattern as jvns.ca, independently converged on) — strong evidence this specific device works.
- A human, low-friction contact line ("I love getting email from you") — worth adapting for someone applying remotely.
- Instructive edit history: an older, deleted bio full of "passionate about X" language was replaced with pure artifacts-and-roles — the edit itself is the lesson.
- Caveat: the blog section has been dormant for years with no signpost that activity moved elsewhere — a stale-looking section is worse than no section.

---

## Tier B — one strong lesson each, do not copy the visual minimalism

### [mitchellh.com](https://mitchellh.com) — Mitchell Hashimoto
A one-screen, near-styleless bio page (Next.js/Vercel) plus a 13-year reverse-chron writing archive. Borderline against the "blank sheet" exclusion on looks alone — it earns inclusion purely on content discipline.
- **The one thing to steal:** a bio written entirely as named artifacts + roles held (Vagrant, Packer, Consul, Terraform, Vault, Nomad, Waypoint, Ghostty; "co-founder, served as CEO, CTO, and IC") — zero "passionate about scalable systems" language.
- Keeps 13-year-old posts live in the same reverse-chron archive as this year's — demonstrates duration of practice instead of "starting fresh."
- Do not copy: the lack of any styling, projects page, or contact form. An unknown candidate's version of this reads as unfinished, not restrained.

### [mtlynch.io](https://mtlynch.io) — Michael Lynch
Hugo/Netlify blog with plain, default-ish typography — but the best Projects-page architecture found in this round.
- **The one thing to steal:** a Projects page grouped by category (Businesses / Educational / Open-Source), each entry carrying a **date range** and an honest current **status** ("maintenance mode", sold, abandoned) — turns a static list into a track record instead of a wall of eternally "active" repos.
- A hand-curated "Popular posts" block on the homepage, not a reverse-chron feed — surfaces the best work first.
- Specific numbers over adjectives throughout ("$1M/year revenue"; for a backend engineer, the analogue is "cut p99 from 800ms to 60ms").

### [taniarascia.com](https://www.taniarascia.com) (tania.dev) — Tania Rascia
Gatsby/Netlify "digital garden" — genuinely well-executed, but the content and voice signal frontend/educator, not backend/systems. Useful for information architecture only.
- **The one thing to steal, reframed:** her "Reinventing the Wheel" homepage bucket (from-scratch emulators/games/note apps) is the single most transferable idea here for a backend candidate — a from-scratch Raft implementation or toy storage engine, each with a writeup, is a far stronger polyglot-backend signal than a services list.
- Projects indexed by year, each with a demo + article + source triple — every project links to reasoning, not just code.
- An about page written as a dated timeline, useful as a pattern for narrating a non-linear career.
- Do not copy: the tutorial-flavored "Fundamentals" section reads junior-adjacent for a senior backend candidate, and the format needs comparable real-world artifacts (a widely-used OSS project, publication bylines) behind it to not feel hollow.

---

## What was explicitly excluded

No sites were dropped after research in this round — all 8 candidates were pre-selected for known qualitative merit rather than sampled at random, per the ticket's "only best" instruction. The Tier B caveats above are the closest thing to a rejection: each site's plain/minimal visual execution would fail the "not blank sheet, white background" bar on its own, and is only kept in the list because a specific piece of its content architecture is worth stealing regardless of the visuals.
