# pavel-usatov-site

A single-page static business-card/resume site for Pavel Usatov
([github.com/UsatovPavel](https://github.com/UsatovPavel)), a 3rd-year Applied Mathematics &
Computer Science student at HSE University, Saint Petersburg.

Plain hand-written HTML/CSS with a small amount of vanilla JS (no build step, no framework,
no dependencies). Includes:

- Hero/intro, about, skills, projects, education, and contact sections with real content and
  links to Pavel's actual repositories (RIID, PRAssign, AsyncFactorial, SmartCalendar/server,
  Voevoda, QA_test_task).
- A responsive, accessible layout (semantic landmarks, visible focus states, no horizontal
  scroll at mobile/tablet/desktop widths, `prefers-reduced-motion` support).
- Dark/light mode via `prefers-color-scheme` (no JS toggle).
- SEO/social metadata (description, canonical link, Open Graph tags with a real 1200x630
  image) and a favicon.

## Running locally

No build step is required. From the repo root:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in a browser.

## Deployment

Served from a VPS as a static site behind a lightweight HTTP server, run as a systemd
service bound to a public port. See the canonical/`og:url` values in `index.html` for the
current live URL.

## License

MIT — see [LICENSE](LICENSE).
