# Portfolio Site — Design System

**Jira:** AGENT-45 "Site stub realization" — design role
**Builds on:** `docs/portfolio-requirements.md` (§6 Design & performance, §9 anti-patterns) and `docs/site-architecture.md` (§1 decisions table: pages-based, RU-only, persistent top nav, terminal-styled Stack/Projects sections; Next.js + Tailwind, static export).

This doc is the single source of truth for typography, color, spacing, and the terminal-motif components. It is meant to be dropped into the Next.js/Tailwind scaffold with no further design judgment calls — every value below is final.

---

## 1. Typography

Exactly two font families, both self-hosted via `next/font/google` (no external `<link>` to Google Fonts — Next.js downloads the files at build time and serves them from the same origin, so there is no render-blocking third-party request and no layout shift from a late `font-display: swap` fetch over the network).

| Role | Family | Why |
|---|---|---|
| Body / UI sans | **Inter** | Free (SIL OFL), ships a `cyrillic` and `cyrillic-ext` subset directly in Google Fonts (site is RU-only per architecture doc §1), near-universal Latin+Cyrillic glyph coverage, and is one of the best-hinted screen faces at UI sizes. `next/font/google` serves it as static per-weight WOFF2 files, not the full variable font, so only the weights actually used ship. |
| Terminal / monospace | **JetBrains Mono** | Free (Apache 2.0), purpose-built for code/CLI display (the exact register the terminal motif needs), includes a `cyrillic` subset (needed since project descriptions and category labels are in Russian even inside the monospace treatment), and reads cleanly at small sizes for tags/badges. |

**Weights loaded (performance budget discipline — 2–3 per family max):**
- Inter: `400` (body), `500` (nav labels, tags), `700` (headings) — 3 weights.
- JetBrains Mono: `400` (terminal body text), `700` (the `$`/`#` prompt glyph and emphasis) — 2 weights.

That's 5 static WOFF2 files total, each subset to `latin + cyrillic` only (no `latin-ext`, no symbols). Static per-weight WOFF2 subsets of this size typically run ~15–35KB each, so the full font payload lands in the ~100–150KB range — a meaningful chunk of the "tens-of-KB to low-hundreds-of-KB" page budget in requirements §6, but nowhere near the andreykaravaev.ru anti-pattern (variable-weight TTFs, unsubset, uncompressed) that produced its 2.4MB page. Do not add more weights, do not load the variable-font versions, do not add `latin-ext`.

Font loading (drop into `app/layout.tsx`):

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// apply `${inter.variable} ${jetbrainsMono.variable}` on <html> or <body>
```

### Type scale (6 steps)

| Step | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `caption` | 0.75rem (12px) | 1rem (16px) | 400 | timestamps, footnotes, "last updated" line |
| `body` | 1rem (16px) | 1.5rem (24px) | 400 | paragraph text (base size) |
| `lead` | 1.125rem (18px) | 1.75rem (28px) | 400/500 | intro/hero sub-line, section lead-ins |
| `h3` | 1.5rem (24px) | 2rem (32px) | 700 | card titles, sub-section headings |
| `h2` | 2rem (32px) | 2.25rem (36px) | 700 | section headings (Stack, Projects, Experience) |
| `h1` | `clamp(2.5rem, 1rem + 5vw, 3.5rem)` (40–56px, fluid) | 1.1 | 700 | hero name/title only |

---

## 2. Color palette

A single disciplined slate-gray scale plus exactly two accent hues (blue for links/interactive, green for the terminal `$`-prompt motif) — no rainbow of category colors. Contrast ratios below are computed via the WCAG relative-luminance formula, not eyeballed.

### Light mode

| Token | Hex | Used for | Contrast vs. its pairing |
|---|---|---|---|
| `bg` | `#FFFFFF` | page background | — |
| `surface` | `#F1F5F9` | cards, terminal-box fill | — |
| `text-primary` | `#0F172A` | headings, body text | 17.9:1 on `bg` (AAA) |
| `text-secondary` | `#475569` | muted/secondary text | 7.6:1 on `bg` (AAA) |
| `accent` (link) | `#2563EB` | links, active nav, interactive text | 5.2:1 on `bg` (AA) |
| `border` | `#CBD5E1` | card/terminal-box borders, dividers | decorative, non-text |
| `terminal` (green, text-safe) | `#15803D` | `$`/`#` prompt glyph when rendered as text | 5.0:1 on `bg` (AA) |
| `terminal-bright` (green, large/decorative only) | `#16A34A` | icon fills, large glyphs, backgrounds ≥3:1 need only | 3.4:1 on `bg` — large text/graphics only, not body-size text |

### Dark mode

| Token | Hex | Used for | Contrast vs. its pairing |
|---|---|---|---|
| `bg` | `#020617` | page background | — |
| `surface` | `#0F172A` | cards, terminal-box fill | — |
| `text-primary` | `#E2E8F0` | headings, body text | 16.4:1 on `bg` (AAA) |
| `text-secondary` | `#94A3B8` | muted/secondary text | 7.9:1 on `bg` (AAA) |
| `accent` (link) | `#60A5FA` | links, active nav, interactive text | 7.9:1 on `bg` (AAA) |
| `border` | `#334155` | card/terminal-box borders, dividers | decorative, non-text |
| `terminal` (green) | `#4ADE80` | `$`/`#` prompt glyph, text-safe at any size | 11.6:1 on `bg` (AAA) |

Rules for the coder:
- All body/heading text uses `text-primary` or `text-secondary` only — never place `accent` or `terminal` colors on large blocks of copy.
- `terminal-bright` (`#16A34A`) is light-mode-only and reserved for large glyphs/icons/decorative fills (≥18.66px bold or ≥24px regular, the WCAG "large text" threshold with its 3:1 minimum) — never for body-size prompt text. In dark mode there's a single `terminal` green (`#4ADE80`) that's already AAA at any size, so no bright/text-safe split is needed there.
- Mode switch is driven by Tailwind's `darkMode: "class"` (a `.dark` class on `<html>`, toggled by a theme provider) — see the CSS-variable wiring in §5 so components never need `dark:` variants sprinkled per-utility.

---

## 3. Spacing & scale

Use Tailwind's **default** spacing scale — the requirements' 4/8/16/24/32/48/64px steps already map exactly onto existing Tailwind keys, so do not add a custom `spacing` block (avoids config drift / duplication):

| Step | px | rem | Tailwind key | Typical use |
|---|---|---|---|---|
| xs | 4 | 0.25rem | `1` | icon-to-label gap, tight inline spacing |
| sm | 8 | 0.5rem | `2` | tag padding, small gaps |
| md | 16 | 1rem | `4` | default paragraph spacing, card padding |
| lg | 24 | 1.5rem | `6` | gap between related elements (card internal sections) |
| xl | 32 | 2rem | `8` | gap between cards in a grid |
| 2xl | 48 | 3rem | `12` | space above/below a sub-block within a section |
| 3xl | 64 | 4rem | `16` | space between major page sections (Hero/Stack/Projects/Experience) |

---

## 4. Terminal-motif component spec

Two components carry the signature terminal treatment: the **Stack category header** and the **Project entry**. Both are sharp-cornered (`border-radius: 0`) — deliberately, to read as a terminal window rather than a soft card. Every other UI element (nav bar, buttons, tags) uses a small `4px` radius (`rounded-sm`) so the terminal components visually stand apart as the signature motif rather than blending into generic rounded cards.

### Stack category header

Renders as a shell comment line, monospace, sitting directly above that category's item list:

```
# backend
```

- Font: `font-mono`, weight `700`.
- The `#` glyph: color `terminal` (green token), always paired with the text in `text-primary` right after it (`# backend`, not `#backend` — one space).
- Category label: lowercase, no letter-spacing tricks (keep it literally typeable, reinforcing the CLI conceit).
- A `1px solid border` (the `border` token) beneath the header, full width of the stack block, `padding-bottom: 8px` (`pb-2`) before the rule.
- No background fill, no radius — it's a label, not a box.

### Project entry

Renders as a single terminal prompt line acting as the card's "title bar," followed by the description body inside a bordered, sharp-cornered box:

```
~/projects/riid $ Java daemon, 1.2x faster than Podman
```

- Outer container: `background: surface`, `border: 1px solid border`, `border-radius: 0`, `padding: 24px` (`p-6`).
- Prompt line (top of the card), `font-mono`:
  - Path segment `~/projects/<slug>` in `text-secondary`, weight `400`.
  - ` $ ` prompt glyph in `terminal` (green), weight `700`, with a single space on each side — the same glyph/weight treatment as the `#` in category headers, so the two components read as one visual system.
  - One-line title/summary after the prompt in `text-primary`, weight `500`.
- Body below the prompt line (role, stack tags, metric, links): `font-sans`, `body` size, `text-secondary` for supporting copy and `text-primary`/`accent` for the linked repo/demo text.
- Stack tags inside the card use `font-mono`, `caption` size, `text-secondary`, no colored background chips (keep the palette disciplined — a tag is just small mono text, not another surface color).
- Tier 2 (coursework/hackathon) entries use the identical structure at a visually lighter weight: same border/radius/font rules, but the outer container has no `surface` fill (transparent background, border only) to read as "lighter" than Tier 1 flagship cards without introducing a third color.

### Hover / focus states (required — accessibility is table stakes per requirements §6)

Every interactive terminal element (a clickable Project entry, a linked Stack tag) gets **matching** hover and focus-visible treatments — never a hover-only effect:

- **Hover:** `border-color` transitions from `border` token to `terminal` (green) token; `surface` background lightens by one step (light mode: `surface` → `#FFFFFF`; dark mode: `surface` → a 4–8% lighter tint, e.g. `#1E293B`). No movement/scale/shadow animation.
- **Focus-visible:** identical border-color change as hover, **plus** a visible outline: `outline: 2px solid` the `terminal` token, `outline-offset: 2px`. Use Tailwind's `focus-visible:` variant (never bare `focus:`, which would also fire on mouse click) paired 1:1 with every `hover:` utility used on the element.
- **Motion:** wrap the hover/focus transition in `transition-colors` only (color/border-color, not transform/opacity), and respect `prefers-reduced-motion` globally:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

- The site-wide skip-to-content link (required by requirements §6) uses the same `focus-visible` outline treatment (`outline: 2px solid` `terminal` token, `outline-offset: 2px`) so the very first thing a keyboard user sees on `Tab` is visually consistent with the rest of the system.

---

## 5. Tailwind config

Colors are wired through CSS variables (not raw hex directly in `theme.extend.colors`) so that `.dark` on `<html>` flips every token at once — components never need per-utility `dark:` prefixes.

`app/globals.css` (add near the top, before `@tailwind` layers or in the `:root`/`.dark` blocks):

```css
:root {
  --color-bg: 255 255 255;
  --color-surface: 241 245 249;
  --color-text-primary: 15 23 42;
  --color-text-secondary: 71 85 105;
  --color-accent: 37 99 235;
  --color-border: 203 213 225;
  --color-terminal: 21 128 61;
  --color-terminal-bright: 22 163 74;
}

.dark {
  --color-bg: 2 6 23;
  --color-surface: 15 23 42;
  --color-text-primary: 226 232 240;
  --color-text-secondary: 148 163 184;
  --color-accent: 96 165 250;
  --color-border: 51 65 85;
  --color-terminal: 74 222 128;
  --color-terminal-bright: 74 222 128; /* dark mode has no separate bright variant, see §2 */
}
```

`tailwind.config.ts` (`theme.extend` excerpt — ready to paste):

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        terminal: {
          DEFAULT: "rgb(var(--color-terminal) / <alpha-value>)",
          bright: "rgb(var(--color-terminal-bright) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        caption: ["0.75rem", { lineHeight: "1rem" }],
        body: ["1rem", { lineHeight: "1.5rem" }],
        lead: ["1.125rem", { lineHeight: "1.75rem" }],
        h3: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        h1: ["clamp(2.5rem, 1rem + 5vw, 3.5rem)", { lineHeight: "1.1", fontWeight: "700" }],
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
      },
    },
  },
};

export default config;
```

Usage examples once this is in place: `bg-bg text-text-primary`, `border border-border`, `text-terminal font-mono font-bold`, `hover:border-terminal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2` — no `dark:` prefix needed anywhere because the CSS variables already resolve per-mode.

---

## 6. Summary for implementation

- 2 font families (Inter sans, JetBrains Mono), 5 static weight files total, both Cyrillic-subset, self-hosted via `next/font/google`.
- 1 slate grayscale + 1 blue accent + 1 green terminal accent, defined once as CSS variables, flipped by `.dark`.
- 6-step type scale, Tailwind's default (unmodified) spacing scale.
- Terminal motif = sharp corners, monospace `#`/`$` glyph in the green token, border-only chrome, hover and focus-visible always paired, motion respects `prefers-reduced-motion`.
