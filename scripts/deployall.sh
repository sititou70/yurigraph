#!/bin/bash
set -eu

find ../envs -type f \
  | xargs -n 1 -Ixxx basename xxx .sh \
  | xargs -n 1 npm run deploy
