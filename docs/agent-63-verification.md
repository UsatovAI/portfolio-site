# AGENT-63 — Cloudflare/DNS reachability verification

`usatovpavel.ru` (and `www`) is proxied through Cloudflare to origin `144.124.226.50`.
Verified live and healthy on 2026-08-09:

- Origin nginx: SNI stream routing on `:443` -> `127.0.0.1:9443`, Cloudflare Universal SSL
  cert present and valid (`CN=usatovpavel.ru`, SANs `usatovpavel.ru` + `*.usatovpavel.ru`,
  issued by Google Trust Services, not expired).
- `https://usatovpavel.ru/` and `https://www.usatovpavel.ru/` -> `200`, real page content.
- `http://usatovpavel.ru/` -> single `301` to `https`, no redirect loop.
- Independently confirmed via check-host.net probes (not the origin VPS) from Amsterdam (NL),
  Moscow (RU), and Saint Petersburg (RU) across three separate runs: all `200 OK`.

If a specific client still can't reach the site, the most likely remaining cause is
Cloudflare Bot Fight Mode / WAF scoring flagging that client's source IP (e.g. a
datacenter/VPS ASN) rather than a DNS, TLS, or origin problem.
