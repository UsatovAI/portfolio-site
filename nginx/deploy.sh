#!/usr/bin/env bash
# Build the static export and publish it to the VPS.
#
#   DEPLOY_HOST=user@usatovpavel.ru ./nginx/deploy.sh
#
# bootstrap.sh only configures Nginx and TLS; it expects the export to already
# be at WEB_ROOT. This is the step that puts it there.
set -Eeuo pipefail

DEPLOY_HOST="${DEPLOY_HOST:?set DEPLOY_HOST, e.g. DEPLOY_HOST=user@usatovpavel.ru}"
WEB_ROOT="${WEB_ROOT:-/var/www/pavel-usatov-site/current}"
SSH_OPTS="${SSH_OPTS:-}"

if [[ ! $WEB_ROOT =~ ^/[A-Za-z0-9._/-]+$ ]]; then
  printf 'WEB_ROOT must be an absolute path containing safe characters.\n' >&2
  exit 1
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd -- "$SCRIPT_DIR/.."

if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi
npm run build

if [[ ! -f out/index.html ]]; then
  printf 'Build produced no out/index.html; refusing to publish.\n' >&2
  exit 1
fi

# shellcheck disable=SC2086
ssh $SSH_OPTS "$DEPLOY_HOST" "mkdir -p -- '$WEB_ROOT'"
# shellcheck disable=SC2086
rsync -az --delete --checksum -e "ssh $SSH_OPTS" out/ "$DEPLOY_HOST:$WEB_ROOT/"

printf 'Published %s to %s:%s\n' "$(git rev-parse --short HEAD)" "$DEPLOY_HOST" "$WEB_ROOT"
