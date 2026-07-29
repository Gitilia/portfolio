#!/usr/bin/env bash
# Create the Gitea repo for this project with gates preconfigured:
#   private repo, delete-branch-after-merge, branch protection on main
#   requiring the CI contexts, initial push.
#
# Usage: ./bootstrap.sh <repo-name> <python|node> [--public]
set -euo pipefail

NAME="${1:?usage: bootstrap.sh <repo-name> <python|node> [--public]}"
LANE="${2:?usage: bootstrap.sh <repo-name> <python|node> [--public]}"
PRIVATE=true
[[ "${3:-}" == "--public" ]] && PRIVATE=false

GITEA="https://git.levkin.ca"
OWNER="ilia"
# shellcheck disable=SC1090
source "$HOME/.config/hermes/gitea.env"   # provides GITEA_TOKEN

api() {
  local method="$1" path="$2" body="${3:-}"
  curl -sf -X "$method" -H "Authorization: token ${GITEA_TOKEN}" \
    -H "Content-Type: application/json" ${body:+-d "$body"} "${GITEA}/api/v1${path}"
}

case "$LANE" in
  python) CONTEXTS='["CI / python-ci (pull_request)","CI / secret-scan (pull_request)"]' ;;
  node)   CONTEXTS='["CI / node-ci (pull_request)","CI / secret-scan (pull_request)"]' ;;
  *) echo "lane must be python or node" >&2; exit 1 ;;
esac

if [[ ! -f ".gitea/workflows/ci.yml" ]]; then
  echo "ERROR: .gitea/workflows/ci.yml missing — copy one from ci-templates/ first." >&2
  exit 1
fi

echo "Creating ${OWNER}/${NAME} (private=${PRIVATE})..."
api POST /user/repos "{\"name\":\"${NAME}\",\"private\":${PRIVATE},\"default_branch\":\"main\"}" >/dev/null

echo "Enabling delete-branch-after-merge..."
api PATCH "/repos/${OWNER}/${NAME}" '{"default_delete_branch_after_merge": true}' >/dev/null

echo "Pushing main..."
git remote add origin "${GITEA}/${OWNER}/${NAME}.git" 2>/dev/null || true
git push "https://${OWNER}:${GITEA_TOKEN}@git.levkin.ca/${OWNER}/${NAME}.git" main

echo "Adding branch protection (required contexts: ${CONTEXTS})..."
api POST "/repos/${OWNER}/${NAME}/branch_protections" \
  "{\"branch_name\":\"main\",\"rule_name\":\"main\",\"enable_push\":false,\"enable_status_check\":true,\"status_check_contexts\":${CONTEXTS},\"required_approvals\":0}" >/dev/null

echo "Done: ${GITEA}/${OWNER}/${NAME}"
echo "Work via PRs from now on; merge with:"
echo "  GITEA_REPO=${NAME} bash ~/Documents/code/hermes/scripts/gitea-merge-when-green.sh <pr>"
