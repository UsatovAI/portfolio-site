# Nginx and TLS bootstrap

The bootstrap installs Certbot, obtains a Let's Encrypt certificate for the apex and `www`
domains, installs the static-site Nginx vhost, and enables automatic renewal.
The HTTPS root URL redirects permanently to `/jvm`; `/default` keeps the complete portfolio.

Run on the VPS from this directory:

```bash
sudo ./bootstrap.sh
```

Defaults can be overridden with `DOMAIN`, `WWW_DOMAIN`, `LE_EMAIL`, and `WEB_ROOT` environment
variables. The previous Nginx site files are copied to `/etc/nginx/pavel-site-backups/` before
the active vhost is changed.
