#!/usr/bin/env bash
#
# Usage: scripts/link-modules.sh <package>...
#
# Links sibling checkouts (../<package>, i.e. ~/Projects/<package>) into
# ./node_modules, so this project builds and runs against library source.
# Run by `npm run link` / `postinstall`. Safe to re-run.

set -eu

[ $# -gt 0 ] || { echo "usage: $0 <package>..." >&2; exit 1; }

mkdir -p node_modules .packages

for pkg in "$@"; do
  if [ -d "../$pkg" ]; then
    ln -sfn "../../$pkg" ".packages/$pkg"
    ln -sfn "../../$pkg" "node_modules/$pkg"
    echo "linked package: $pkg"
  else
    echo "skipped $pkg: no checkout at ../$pkg" >&2
  fi
done
