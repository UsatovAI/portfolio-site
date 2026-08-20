# Nginx, TLS and publishing

Two separate steps. `bootstrap.sh` prepares the server once; `deploy.sh` publishes the
site every time it changes. Running only the first one leaves whatever export is already
in `WEB_ROOT` serving forever, which is exactly how the live site fell behind `main`.

## 1. Server bootstrap (once)

Installs Certbot, obtains a Let's Encrypt certificate for the apex and `www` domains,
installs the static-site Nginx vhost and enables automatic renewal. The HTTPS root URL
redirects permanently to `/jvm`; `/default` keeps the complete portfolio.

Run on the VPS from this directory:

```bash
sudo ./bootstrap.sh
```

Defaults can be overridden with `DOMAIN`, `WWW_DOMAIN`, `LE_EMAIL` and `WEB_ROOT`. The
previous Nginx site files are copied to `/etc/nginx/pavel-site-backups/` before the active
vhost is changed. The script refuses to run until an export already exists at
`$WEB_ROOT/index.html`, so publish once before the first bootstrap.

## 2. Publishing (every change)

The site is a static Next.js export (`output: "export"`), so publishing means building
`out/` and copying it to `WEB_ROOT`. Nothing does this automatically unless the workflow
below is configured.

From a machine with the repository checked out:

```bash
DEPLOY_HOST=user@usatovpavel.ru ./nginx/deploy.sh
```

`WEB_ROOT` defaults to `/var/www/pavel-usatov-site/current`, matching `bootstrap.sh`.
`SSH_OPTS` is passed to both `ssh` and `rsync` if you need a specific key or port.

## 3. Automatic publishing

`.github/workflows/deploy.yml` runs the same build and rsync on every push to `main`, and
can be triggered by hand from the Actions tab. It stays inert until these are set in the
repository settings:

| Secret | Value |
|---|---|
| `DEPLOY_HOST` | `user@usatovpavel.ru` |
| `DEPLOY_SSH_KEY` | private key whose public half is in the server's `authorized_keys` |
| `DEPLOY_KNOWN_HOSTS` | output of `ssh-keyscan usatovpavel.ru` |

Optional repository variable `WEB_ROOT` overrides the default path.

Until the secrets exist the workflow fails on the publish step; the build steps before it
still run, so a broken `main` is caught either way.
