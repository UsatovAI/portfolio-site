# AGENT-64 — background and selection motion

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
- No animation dependency is shipped; the implementation uses CSS plus the existing navigation client
  component.
