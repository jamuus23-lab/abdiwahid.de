#!/usr/bin/env bash
# Helper script: manual steps to publish frontend to GitHub Pages (one-off)
# Usage: run from repo root: bash scripts/deploy-help.sh

set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
FRONTEND_DIST="$ROOT_DIR/frontend/dist"

if [ ! -d "$FRONTEND_DIST" ]; then
  echo "Frontend build not found. Building now..."
  (cd "$ROOT_DIR/frontend" && npm install && npm run build)
fi

echo "Publishing $FRONTEND_DIST to gh-pages branch (force)."
echo "This will create/overwrite the gh-pages branch with the built site."

read -p "Proceed? (y/N) " yn
if [[ "$yn" != "y" && "$yn" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

TMPDIR=$(mktemp -d)
git worktree add -B gh-pages "$TMPDIR" origin/gh-pages || git worktree add -B gh-pages "$TMPDIR"

rm -rf "$TMPDIR"/*
cp -a "$FRONTEND_DIST"/* "$TMPDIR/"

cd "$TMPDIR"
git add --all
git commit -m "Publish frontend (dist)" || true
git push origin gh-pages --force

cd "$ROOT_DIR"
git worktree remove "$TMPDIR" --force || true
rm -rf "$TMPDIR"

echo "Published to gh-pages. Enable GitHub Pages in repo settings if needed." 
