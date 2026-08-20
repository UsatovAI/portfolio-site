# Nginx, TLS and publishing

Two separate things. `bootstrap.sh` prepares the server once; publishing happens on every
change. Running only the first leaves whatever export is already in `WEB_ROOT` serving
forever, which is exactly how the live site fell behind `main`.

## 1. Server bootstrap (once)

Installs Certbot, obtains a Let's Encrypt certificate for the apex and `www` domains,
installs the static-site Nginx vhost and enables automatic renewal. The HTTPS root URL
redirects permanently to `/jvm`; `/default` keeps the complete portfolio.

```bash
sudo ./bootstrap.sh
```

Defaults can be overridden with `DOMAIN`, `WWW_DOMAIN`, `LE_EMAIL` and `WEB_ROOT`. The
previous Nginx site files are copied to `/etc/nginx/pavel-site-backups/` first. The script
refuses to run until an export exists at `$WEB_ROOT/index.html`, so publish once before the
first bootstrap.

## 2. Publishing by hand

The site is a static Next.js export (`output: "export"`), so publishing means building
`out/` and copying it to `WEB_ROOT`.

Credentials are **not** in this repository. Locally they sit in
`~/playground/pavel-usatov-site/.env` as `IPv4` and `VPS_PASSWORD`.

```bash
cd ~/playground/pavel-usatov-site && set -a && . ./.env && set +a
cd /path/to/portfolio-site
DEPLOY_HOST="root@$IPv4" DEPLOY_PASSWORD="$VPS_PASSWORD" ./nginx/deploy.sh
```

With a key instead of a password:

```bash
DEPLOY_HOST="root@$IPv4" DEPLOY_SSH_KEY_FILE=~/.ssh/id_deploy ./nginx/deploy.sh
```

## 3. Publishing from CI

`.github/workflows/deploy.yml` has two stages. `build` runs on every push to `main` and
uploads the export as an artifact; `deploy` takes that artifact and rsyncs it to the VPS.
It also runs from the Actions tab via `workflow_dispatch`.

Required repository secrets:

| Secret | Value |
|---|---|
| `DEPLOY_HOST` | `root@<IPv4 from .env>` |
| `DEPLOY_SSH_KEY` | private deploy key — **preferred**, see below |
| `DEPLOY_PASSWORD` | `VPS_PASSWORD` — fallback if no key is installed yet |

Set one of `DEPLOY_SSH_KEY` or `DEPLOY_PASSWORD`, not both; the key wins. Optional
repository variable `WEB_ROOT` overrides the default path.

The `deploy` job targets a `production` environment, so a required reviewer can be added
in repository settings if you want publishing to be approved rather than automatic.

### Move off the password

A root password in CI secrets is the weakest part of this setup: it grants full shell
access, it cannot be scoped to one task, and rotating it means touching every place it is
stored. Install a dedicated key once and the password stops being needed:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_deploy -C "github-deploy" -N ""
ssh-copy-id -i ~/.ssh/id_deploy.pub "root@$IPv4"          # asks for VPS_PASSWORD once
```

Then put the contents of `~/.ssh/id_deploy` into the `DEPLOY_SSH_KEY` secret, delete
`DEPLOY_PASSWORD`, and consider `PasswordAuthentication no` in `/etc/ssh/sshd_config`.

## 4. If the site still looks stale after publishing

`usatovpavel.ru` is served through Cloudflare, with the VPS Nginx as origin. A successful
rsync updates the origin, not the CDN. If the old page persists, purge the cache in the
Cloudflare dashboard — that is a separate cause from the missing deploy step and can hide
a correct deployment.
