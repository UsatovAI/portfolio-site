# Ideas to improve the portfolio site — from backend/fullstack research round 2

**Jira:** AGENT-69 "Explore backend engineer websites 2" (child of AGENT-40 "My portfolio site")
**Source:** `best-sites.md` in this folder (8 backend/fullstack engineer sites, researched via 4 parallel agents).
**Cross-reference:** `docs/portfolio-requirements.md` (AGENT-41, updated per AGENT-44) already sets the base plan — single-page scroll, no blog at launch, footer-only resume/contact, Russian-only, no i18n. Ideas below are flagged **[fits current plan]** when they slot into that structure as-is, or **[later-phase / needs a plan change]** when they assume something the current plan explicitly rules out (mainly: a blog). None of this overrides the AGENT-44 decisions — it's additional input for whoever revisits scope next.

---

## 1. Rewrite the bio as artifacts, not adjectives — [fits current plan]

The single highest-leverage, zero-cost idea across every site researched. mitchellh.com's About paragraph names shipped systems and roles held (Vagrant, Terraform, Vault; "CEO, CTO, and IC") with no "passionate about scalable systems" language anywhere. jvns.ca and fasterthanli.me do the same at the section-header level (DNS, terminals, ELF layout — the taxonomy itself is the pitch).

**Apply it:** In the About/hero section already planned, describe each flagship project (RIID, PRAssign+AsyncFactorial, TimeTamer) by what it does and what role was played, not by an adjective list. This is a copy-editing pass on the existing plan, not a structural change.

## 2. Give every project a date range and an honest status — [fits current plan]

mtlynch.io's Projects page groups entries by category, each with a date range and a current status ("maintenance mode", sold, abandoned) — turning a static list into a track record. jvns.ca's project entries similarly admit "might be out of date." Nobody researched hides that a project is dormant.

**Apply it:** The two-tier Projects section already planned (flagship / coursework) should carry a start–end date and a one-word status per card (active / archived / coursework-complete). Costs nothing, adds credibility, and directly answers the unspoken recruiter question "is this still relevant."

## 3. Let the site's own construction be a credibility artifact — [fits current plan]

xeiaso.net's footer credits her own custom static-site generator and CSS framework, with a repo link. thorstenball.com and jvns.ca are both plain static builds and say so implicitly through performance. For a polyglot Scala/Go/Kotlin candidate this is unusually cheap leverage: the site itself can be evidence.

**Apply it:** If any part of the build (a small Go/Scala service, a custom build script, anything beyond the Next.js template) is genuinely bespoke, credit it in the footer with a repo link — "built with [tool], source here." Don't fabricate bespoke tooling just to have something to credit; only surface what's real.

## 4. Security-conscious response headers as a passive signal — [fits current plan]

mitchellh.com ships a strict hand-written CSP, HSTS preload, `X-Frame-Options: DENY`, and a locked-down `permissions-policy`. The research agent noted this reads as a backend-engineer signal to anyone who runs a securityheaders.com scan — small, free, and squarely in a backend candidate's wheelhouse to get right.

**Apply it:** Add a baseline CSP, HSTS, and `X-Frame-Options`/`permissions-policy` to the Next.js deployment config. This is infrastructure hygiene work already adjacent to whatever's being built, not new scope.

## 5. Specific numbers over adjectives on flagship projects — [fits current plan]

mtlynch.io uses hard figures throughout ("$1M/year revenue, sold for $598k"). The backend analogue, per the research agent: latency/throughput/cost deltas ("cut p99 from 800ms to 60ms", "reduced cluster spend 40%"). This echoes the "quantified impact" gap already flagged as the single biggest weak point across the round-1 cohort in `docs/portfolio-requirements.md` §3.

**Apply it:** Before writing final project-card copy, pull one concrete number per flagship project (RIID, PRAssign, TimeTamer) — a metric, a scale, a before/after — even an approximate one. If no real number exists for a project, that's worth knowing before launch, not after.

## 6. A from-scratch / "reinventing the wheel" project as the standout, not a services list — [fits current plan, framing choice]

taniarascia.com's "Reinventing the Wheel" section (from-scratch emulators, games, note apps) was flagged by the research agent as the single most transferable idea for a backend candidate, reframed as infrastructure: a hand-built Raft implementation, a toy key-value store, a toy language interpreter. This is a stronger polyglot-backend signal than another CRUD app.

**Apply it:** Not a new section — a framing choice for which existing project (or a future one) gets flagship placement. If any current project in `Project_context/` is a from-scratch systems build (parser, scheduler, protocol implementation) rather than a CRUD app, it should outrank the others for the top project slot.

## 7. ★-mark or otherwise flag the strongest work — [fits current plan]

Independently converged on by jvns.ca and thorstenball.com (favorites-marking on list items) and by mtlynch.io (a curated "Popular" block instead of reverse-chron). The through-line: don't make a visitor guess which project matters most.

**Apply it:** In the two-tier Projects layout already planned, the flagship tier already does this job structurally — no new work needed, just confirms the existing tiering decision is the right pattern, not something to flatten later.

## 8. A short-form, low-friction content stream (TILs / links-with-commentary) — [later-phase / needs a plan change]

simonwillison.net's TILs and Links (a URL + two sentences) and jvns.ca's per-topic taxonomy solve a real problem: a "last post: 14 months ago" blog reads worse than no blog at all, but a full-essay-only bar means the site goes stale between big posts. `docs/portfolio-requirements.md` §6 currently rules out a blog at launch specifically because of this staleness risk (the satnaing lesson).

**Note, don't apply yet:** This research doesn't overturn that decision — it explains *why* it was the right call (an all-or-nothing blog is exactly the trap these sites avoid) and gives a concrete lower-effort alternative if a blog is revisited post-launch: start with TILs/short notes, not full articles, so the maintenance bar is low enough to actually sustain.

## 9. Content-format taxonomy over a flat tag cloud, if a writing section is ever added — [later-phase / needs a plan change]

jvns.ca's ~44 hand-named topic sections (not auto-tags) and simonwillison.net's per-tag archive pages both work as navigation *and* as landing pages a recruiter can be pointed at directly (e.g. `/tags/kotlin/`). Not applicable now since there's no blog/writing section at launch — flagged for the same future-blog scenario as #8.

## 10. What NOT to import from this cohort

- **Personal-brand furniture** (xeiaso.net's donations/signalboost, fasterthanli.me's funding blocks) — irrelevant to a job application and adds noise the current plan already avoids by design.
- **Design minimalism as a strategy** (mitchellh.com, mtlynch.io) — both sites' plainness only works because the owners are already known quantities; an unknown candidate's version of "unstyled" reads as unfinished, not restrained. The design-system work already planned should not be cut in the name of this research.
- **Sparse/no-contact pages** (simonwillison.net, mitchellh.com have no clear hire-me path) — the opposite of what a job-seeking site needs; the footer-only contact decision in `docs/portfolio-requirements.md` §5 is already a stronger baseline than either of these sites offers.
- **Dormant, unsignposted content sections** (thorstenball.com's blog, quiet since 2022, with no note that activity moved elsewhere) — direct argument for the existing "no blog at launch" decision: an abandoned-looking section actively hurts more than an absent one.

---

## Summary: what actually changes near-term

Of the 10 ideas above, #1–#7 fit inside the site plan already locked in by AGENT-41/AGENT-44 and are copy/content/infra tweaks, not structural changes — cheapest to fold into the current build. #8–#9 are explicitly deferred: they're evidence *for* the existing no-blog-at-launch call, with a concrete lower-effort pattern (TILs, not essays) to use if that call is ever revisited. #10 is a checklist of patterns from this cohort that were considered and rejected as not fitting a job-seeking candidate's site.
