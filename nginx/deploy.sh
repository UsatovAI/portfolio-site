#!/usr/bin/env bash
# Build the static export and publish it to the VPS.
#
#   DEPLOY_HOST=root@203.0.113.10 DEPLOY_PASSWORD=... ./nginx/deploy.sh
#   DEPLOY_HOST=root@203.0.113.10 DEPLOY_SSH_KEY_FILE=~/.ssh/id_deploy ./nginx/deploy.sh
#
# bootstrap.sh only configures Nginx and TLS; it expects the export to already
# be at WEB_ROOT. This is the step that puts it there.
#
# Credentials live outside the repository. Locally they are in
# ~/playground/pavel-usatov-site/.env (IPv4, VPS_PASSWORD); in CI they come
# from repository secrets. Never commit them.
set -Eeuo pipefail

DEPLOY_HOST="${DEPLOY_HOST:?set DEPLOY_HOST, e.g. DEPLOY_HOST=root@203.0.113.10}"
WEB_ROOT="${WEB_ROOT:-/var/www/pavel-usatov-site/current}"

if [[ ! $WEB_ROOT =~ ^/[A-Za-z0-9._/-]+$ ]]; then
  printf 'WEB_ROOT must be an absolute path containing safe characters.\n' >&2
  exit 1
fi

# Key auth is preferred; password auth is the fallback for the current server.
if [[ -n ${DEPLOY_SSH_KEY_FILE:-} ]]; then
  SSH_BASE=(ssh -i "$DEPLOY_SSH_KEY_FILE" -o StrictHostKeyChecking=accept-new)
  RUN=()
elif [[ -n ${DEPLOY_PASSWORD:-} ]]; then
  command -v sshpass >/dev/null || { printf 'DEPLOY_PASSWORD is set but sshpass is not installed.\n' >&2; exit 1; }
  SSH_BASE=(ssh -o StrictHostKeyChecking=accept-new -o PreferredAuthentications=password -o PubkeyAuthentication=no)
  RUN=(sshpass -e)
  export SSHPASS="$DEPLOY_PASSWORD"
else
  printf 'Set DEPLOY_SSH_KEY_FILE or DEPLOY_PASSWORD.\n' >&2
  exit 1
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd -- "$SCRIPT_DIR/.."

if [[ -f package-lock.json ]]; then npm ci; else npm install; fi
npm run build

if [[ ! -f out/index.html ]]; then
  printf 'Build produced no out/index.html; refusing to publish.\n' >&2
  exit 1
fi

"${RUN[@]}" "${SSH_BASE[@]}" "$DEPLOY_HOST" "mkdir -p -- '$WEB_ROOT'"
"${RUN[@]}" rsync -az --delete --checksum -e "$(printf '%q ' "${SSH_BASE[@]}")" out/ "$DEPLOY_HOST:$WEB_ROOT/"

printf 'Published %s to %s:%s\n' "$(git rev-parse --short HEAD)" "$DEPLOY_HOST" "$WEB_ROOT"
