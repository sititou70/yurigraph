#!/bin/bash
set -eu

cat ../env.sh \
  | grep '\")' \
  | sed -e 's/[ \")]//g' \
  | xargs -n 1 npm run deploy
