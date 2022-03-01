#!/bin/bash
set -eu
cd $(dirname $0)

find ../envs -type f |
  xargs -n 1 -Ixxx basename xxx .sh |
  xargs -n 1 npm run scraping
