#!/usr/bin/env bash
set -Eeuo pipefail

DOMAIN="${DOMAIN:-usatovpavel.ru}"
WWW_DOMAIN="${WWW_DOMAIN:-www.usatovpavel.ru}"
LE_EMAIL="${LE_EMAIL:-pvusatov@edu.hse.ru}"
WEB_ROOT="${WEB_ROOT:-/var/www/pavel-usatov-site/current}"

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE="$SCRIPT_DIR/site.conf.template"
AVAILABLE_CONF="/etc/nginx/sites-available/usatovpavel.conf"
ENABLED_CONF="/etc/nginx/sites-enabled/usatovpavel.conf"
ACME_ROOT="/var/www/certbot"
BACKUP_DIR="/etc/nginx/pavel-site-backups/$(date -u +%Y%m%dT%H%M%SZ)"

if [[ $EUID -ne 0 ]]; then
  printf 'Run this script as root.\n' >&2
  exit 1
fi

if [[ ! $DOMAIN =~ ^[A-Za-z0-9.-]+$ || ! $WWW_DOMAIN =~ ^[A-Za-z0-9.-]+$ ]]; then
  printf 'DOMAIN and WWW_DOMAIN must be DNS names.\n' >&2
  exit 1
fi

if [[ ! $WEB_ROOT =~ ^/[A-Za-z0-9._/-]+$ ]]; then
  printf 'WEB_ROOT must be an absolute path containing safe characters.\n' >&2
  exit 1
fi

if [[ ! -f $TEMPLATE ]]; then
  printf 'Missing Nginx template: %s\n' "$TEMPLATE" >&2
  exit 1
fi

if [[ ! -f $WEB_ROOT/index.html ]]; then
  printf 'Site export not found at %s/index.html\n' "$WEB_ROOT" >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends certbot python3-certbot-nginx ca-certificates

install -d -m 0755 \
  "$ACME_ROOT" \
  "$BACKUP_DIR/sites-available" \
  "$BACKUP_DIR/sites-enabled"

# Preserve the previous site configuration for manual rollback.
for path in /etc/nginx/sites-available/usatovpavel-proxy.conf \
  /etc/nginx/sites-available/usatovpavel-static.conf "$AVAILABLE_CONF"; do
  if [[ -e $path || -L $path ]]; then
    cp -a "$path" "$BACKUP_DIR/sites-available/"
  fi
done
for path in /etc/nginx/sites-enabled/usatovpavel-proxy.conf "$ENABLED_CONF"; do
  if [[ -e $path || -L $path ]]; then
    cp -a "$path" "$BACKUP_DIR/sites-enabled/"
  fi
done

# The current HTTP vhost already exposes this webroot. Certbot uses it without
# rewriting Nginx, so the repository template remains the source of truth.
certbot certonly \
  --webroot \
  --webroot-path "$ACME_ROOT" \
  --cert-name "$DOMAIN" \
  --domain "$DOMAIN" \
  --domain "$WWW_DOMAIN" \
  --email "$LE_EMAIL" \
  --agree-tos \
  --non-interactive \
  --keep-until-expiring \
  --deploy-hook "systemctl reload nginx"

rendered="$(mktemp)"
trap 'rm -f "$rendered"' EXIT
sed \
  -e "s|__DOMAIN__|$DOMAIN|g" \
  -e "s|__WWW_DOMAIN__|$WWW_DOMAIN|g" \
  -e "s|__WEB_ROOT__|$WEB_ROOT|g" \
  "$TEMPLATE" >"$rendered"

install -m 0644 "$rendered" "$AVAILABLE_CONF"

for path in /etc/nginx/sites-enabled/usatovpavel-proxy.conf "$ENABLED_CONF"; do
  if [[ -e $path && ! -L $path ]]; then
    printf 'Refusing to replace non-symlink: %s\n' "$path" >&2
    exit 1
  fi
  if [[ -L $path ]]; then
    unlink "$path"
  fi
done

ln -s "$AVAILABLE_CONF" "$ENABLED_CONF"

nginx -t
systemctl reload nginx
systemctl enable --now certbot.timer

printf 'TLS bootstrap complete for %s and %s.\n' "$DOMAIN" "$WWW_DOMAIN"
printf 'Previous configuration backup: %s\n' "$BACKUP_DIR"
certbot certificates
