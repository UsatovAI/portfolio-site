# AGENT-64 — implemented site features

## Resume sections

- Page order starts with the grouped Stack section, followed by Experience, Projects,
  Educational Projects, and Additional Activities.
- RIID is part of Experience; Scanovich, PRAssign, TimeTamer, population forecasting, and Voevoda
  are regular projects.
- Educational projects use compact content-height cards in a two-column desktop grid.
- Additional Activities contains the downloadable Yandex EdTech Agents Week certificate, teaching,
  and an accessible event-photo reveal for JVM Subbotnik, Sezon Koda SPb, and Code Retreat.
- Project wording and metrics come from the `resumeJavaML2026-07.tex` attachment in AGENT-64.
- The hero uses the HH positioning copy: `JVM backend developer`, two short backend/infra paragraphs,
  and a hover/focus disclosure from `JVM` to `Java · Kotlin · Scala`.

## Portfolio variants

- `/default` renders the complete portfolio; `/` keeps the same complete version for backwards
  compatibility.
- `/jvm` reuses the same components with JVM-specific content shaping: TypeScript is removed,
  Go/C++ are visually secondary, the ML stack is shorter, and AI/ML project descriptions are compact.
- `/backend` prioritizes backend/infrastructure stack categories and backend projects; `/ml`
  prioritizes ML/Python skills and ML projects.
- Both variants are exported by one Next.js build and served by the same Nginx deployment.

## Background and selection motion

## Requirements derived from the review

- Replace the flat page color with a custom background, using the visual density of the referenced
  Ammy Ogunbiyi portfolio as inspiration without copying its palette or component structure.
- Keep the result specific to Pavel's backend/infra positioning. The background therefore combines
  a deployment-style grid with animated network routes and service nodes.
- Animate selection similarly to the referenced hackathon site: the current navigation item must have
  one shared indicator that visibly travels between sections instead of switching color abruptly.
- Give project and stack cards a lightweight selection response while keeping the content itself still.
- Preserve readability in dark and light themes and avoid horizontal overflow at mobile widths.
- All ambient motion must be decorative, non-interactive, and excluded from the accessibility tree.
- Honor `prefers-reduced-motion`: moving grid, routes, nodes, glows, scans, and cursor animation stop.
- Content must never depend on animation JavaScript to become visible.

## Implementation

- `components/background/AmbientBackground.tsx` contains the decorative SVG network layer.
- `app/globals.css` contains the grid, glow, route, node, cursor, and card-selection animations.
- `components/nav/Nav.tsx` measures the active link and moves a single shared indicator to it.
- Stack cards have no particle/spark effect. Selection uses a thicker luminous segment that travels
  around the full card outline.
- No animation dependency is shipped; the implementation uses CSS plus the existing navigation client
  component.
