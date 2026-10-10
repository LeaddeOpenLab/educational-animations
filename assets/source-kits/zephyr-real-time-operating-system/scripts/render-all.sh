#!/bin/sh
# Compatibility entry: optional first argument remains the output directory.
set -eu
cd "$(dirname "$0")/.."
exec node scripts/render.mjs "$@"
