# Portfolio Site — Requirements

**Jira:** AGENT-41 "Research current SE sites" (child of AGENT-40 "My portfolio site")
**Based on:** deep research of 7 SE/hackathon-dev portfolio sites — full per-site field-by-field detail is in `docs/se-portfolio-research/results/*.json` (all 7 pushed); run `docs/se-portfolio-research/generate_report.py` to regenerate the human-readable `report.md` from them
**Owner context:** Pavel Usatov, HSE SPb (Applied Math & CS, 2023–2027). Polyglot backend/infra engineer — Scala (T-Bank internship, Cats Effect), Java (RIID daemon), Go (PRAssign REST API), Kotlin (Android), plus ML/Python side projects. Hackathon participant (MTS True Tech, VK-adjacent scene) — same cohort as the sites researched below.

---

## 1. Summary of researched sites

| Site | Cohort | One-line verdict |
|---|---|---|
| [anpilovml.ru](https://anpilovml.ru) | RU seed | Good hackathon-proof section, but zero project links (no repo/demo on any of 7 cards) and decorative fake telemetry ("confidence 0.91") — a claims-only site. |
| [andreykaravaev.ru](https://andreykaravaev.ru) | RU seed | Best proof-of-work in the set (award PDFs linked and independently verifiable) and a clever "spec builder" CTA, undermined by a 2.4MB page weight and broken share metadata. |
| [scanovich.ai](https://scanovich.ai) | RU seed (not a portfolio) | Consulting/product site, not a portfolio — but its honest-status vocabulary ("Live / Scoped pilot / Roadmap") and caveated metrics are a transferable content pattern. Built by a hackathon teammate (FUYOH666, MTS True Tech "scanovich-webUI"). |
| [brittanychiang.com](https://brittanychiang.com) | Global benchmark | The accessibility/performance gold standard: skip link, full alt text, `prefers-reduced-motion` handled, ~150KB total. Weak on quantified impact. |
| [satnaing.dev](https://satnaing.dev) | Global benchmark | Structurally the closest template to copy, but a cautionary tale on content rot — abandoned blog with a live placeholder post since the CMS was discontinued. |
| [leerob.com](https://leerob.com) | Global benchmark | Extreme minimalism for a senior/authority profile (no nav, no project cards) — instructive but not a fit for someone building initial credibility. |
| [bruno-simon.com](https://bruno-simon.com) | Global benchmark | Interactive/3D ceiling. Admire, don't copy: message-medium fit (a WebGL specialist proving WebGL mastery) doesn't transfer to a backend/ML profile, and it sacrifices all accessibility to get there. |

---

## 2. Structure

Single-page scroll site (the format every site in this cohort converges on, except the two outliers built for a different medium — leerob's writing and bruno-simon's 3D world). Sections, in order:

1. **Hero / About** — name, role, one-sentence positioning, links to GitHub/LinkedIn/Telegram/email.
2. **Experience** — T-Bank Scala internship, teaching role, team projects — dated, with tech tags per entry (borrowed from brittanychiang: tags live on the experience/project entry, not in a separate Skills block).
3. **Projects** — two tiers, borrowed from bruno-simon's model:
   - **Tier 1 (flagship):** RIID, PRAssign+AsyncFactorial, TimeTamer — each with role, stack tags, live metric, and links to demo/repo.
   - **Tier 2 (coursework/experiments):** ZIO-Notification-Service, ANTLR parser, Voevoda, scanovich-webUI hackathon entry — lighter cards, still linked.
4. **Skills/Tech Stack** — grouped by domain (Backend/JVM, Go, ML/Python, Infra) rather than a flat tag cloud.
5. **Resume/CV** — see §4.
6. **Contact** — see §5.

No blog at launch (see §6 on content freshness) — add one later only with a plan to keep it fed, per the satnaing lesson.

## 3. Content strategy — proof over claims

This is the single biggest differentiator between the strong and weak sites in the cohort. Rules, in priority order:

- **Every project card links a live demo or a public repo — no exceptions.** anpilovml.ru's worst failure was 7 project cards and zero outbound links to code/demo/screenshot; andreykaravaev.ru and bruno-simon.com both hit ~100% live-link coverage and read far more credibly for it. This user's projects already have public repos (RIID, PRAssign, AsyncFactorial, ZIO-Notification-Service, Usatov-FL-HSE) — link every one.
- **Quantify every project with a real number, not a vibe.** The resume already has genuinely strong ones — reuse them verbatim on the site, don't water them down:
  - RIID: "1.2x faster than Podman" (load-tested: 100 images, 1MB–5GB, on a k8s cluster)
  - T-Bank internship: "10 new UUID endpoints, 7 integration clients, 23 tested integrations"
  - This directly fixes the weakness brittanychiang.com and bruno-simon.com both have (near-zero quantified impact) and does it with real data instead of anpilovml's fabricated "confidence 0.91" mock panel.
- **Attribute team work honestly.** Bruno-simon's per-project `role` / `at` / `with` metadata is worth copying directly for the team projects (TimeTamer, Voevoda, PRAssign+AsyncFactorial, scanovich-webUI) — say what you built and who else was involved, don't imply solo authorship.
- **If a claim can't be linked to something verifiable, caveat it or cut it** — scanovich.ai's discipline of stating a metric's denominator and sample size ("91% accuracy, internal golden set of 45 cases") is the right instinct, applied better there than in this cohort's portfolios.
- **No decorative/fake telemetry.** Don't build a mock "live" dashboard or confidence score that isn't wired to anything real (anpilovml's specific mistake) — it reads as fabrication the moment a technical visitor inspects it.

## 4. Resume integration

Provide **both** inline HTML content and a downloadable PDF (the existing LaTeX resume), matching the "both" mode that none of the 7 researched sites fully achieved — most picked one or the other, or (bruno-simon) neither. Keep the PDF text-selectable/ATS-parseable — avoid Figma-style flattened exports (a real risk flagged even for brittanychiang.com's PDF).

## 5. Contact & language

- **Bilingual (RU/EN), not RU-only.** anpilovml.ru and andreykaravaev.ru are both RU-only, which caps their reach; satnaing.dev's content-language filter (rather than a duplicated `/en` site) is the cleanest pattern to borrow, and scanovich.ai shows the failure mode to avoid (`/ru/` served with `lang="en"` — get the `hreflang`/`lang` attributes right per locale).
- **No personal phone number or other sensitive PII in cleartext.** anpilovml.ru publishes a personal mobile number and email as clear copy-paste text; prefer a contact form, an obfuscated mailto, or a link to LinkedIn/Telegram instead.
- **Contact must work without JavaScript**, or degrade to a visible fallback — scanovich.ai's contact section renders `null` with JS disabled, silently killing its one conversion path. At minimum, a plain `mailto:` link should always be present in the HTML.
- Set real Open Graph / Twitter Card metadata (title, description, image, url) — andreykaravaev.ru's link previews are broken (`<title>` = "About me", no `og:image`), which quietly costs shares/click-throughs.

## 6. Design & performance

- **Accessibility is table stakes, not a bonus** — treat brittanychiang.com's implementation as the bar: skip-to-content link, alt text on every image, `focus-visible` parity with every `hover:` style, and honor `prefers-reduced-motion` in CSS (not just claim it, as satnaing.dev's README does while shipping zero instances of it).
- **Performance budget: keep total page weight in the tens-of-KB to low-hundreds-of-KB range**, not megabytes. andreykaravaev.ru's ~2.4MB critical path is ~95% avoidable waste (one unoptimized PNG, variable-weight TTF fonts, a 5-year-old Three.js build loaded for one decorative canvas render-blocking). Don't repeat that; and don't reach for bruno-simon-scale asset budgets (~1MB+ JS, ~750MB source assets) — that trade only pays off for a WebGL specialist proving WebGL mastery, not a backend/ML profile.
- **Dark mode / light mode**, given the target audience skews technical (every site in the cohort except bruno-simon and scanovich defaults to or supports dark).
- **Mobile-first responsive**, with real testing on small screens — not just a media query pass.

## 7. Tech stack

Next.js + Tailwind is the dominant, well-proven stack across the strongest sites in this cohort (brittanychiang.com, satnaing.dev, scanovich.ai) and fits this user's existing frontend exposure (TimeTamer used Retrofit/Compose, TS appears in the T-Bank stack). Recommended:

- **Framework:** Next.js (static export where possible, for the performance-budget reason above)
- **Styling:** Tailwind CSS
- **Content:** MDX or plain data files (JSON/TS) for project entries — avoid a hosted CMS dependency, per the satnaing.dev lesson (its blog died the moment Forestry CMS was discontinued in 2023 and nobody noticed for a year)
- **Analytics (optional):** a lightweight, privacy-respecting option (Plausible/Umami/GA4) — every researched site uses at most one analytics script; don't over-instrument
- **Hosting:** static hosting (Vercel/Netlify/Pages) or self-host if preferred; either way, keep the origin reachable over HTTPS (anpilovml.ru actively refuses HTTPS, which is its own credibility problem)

## 8. Content freshness

Ship a small, honest signal of recency (last-updated date, or a "currently building" line) rather than an implied-evergreen page. If a blog/changelog is added later, commit to a git-based authoring flow (MDX in the repo) specifically to avoid the satnaing.dev failure mode of a third-party CMS quietly sunsetting and leaving a placeholder "this is just a testing" post live for years.

## 9. Explicit anti-patterns (do not repeat)

| Anti-pattern | Seen in | Fix |
|---|---|---|
| Project cards with no outbound link | anpilovml.ru | Every card links live demo and/or repo |
| Fabricated/decorative metrics | anpilovml.ru | Only real, sourced numbers |
| Cleartext personal phone/email | anpilovml.ru | Contact form / obfuscated mailto / social links |
| ~2.4MB page weight from unoptimized assets | andreykaravaev.ru | Compress images, subset fonts, drop unused libraries |
| Broken OG/share metadata | andreykaravaev.ru | Set title/description/og:image per page |
| Contact form that silently no-ops without JS | scanovich.ai | Always render a plain fallback (`mailto:`) |
| `lang` attribute mismatched with served locale | scanovich.ai | Set `lang`/`hreflang` correctly per locale route |
| Abandoned CMS-backed content left live | satnaing.dev | Git-based content, or don't ship a blog yet |
| Zero accessibility (no skip link, no alt text, no reduced-motion) | bruno-simon.com (by design, for a different audience) | Bake in accessibility from the start |

---

*Full per-site field-by-field research (structure, tech stack, differentiators, contact patterns, etc.) is in `se-portfolio-research/results/*.json`; run `se-portfolio-research/generate_report.py` to regenerate `report.md` from them.*
