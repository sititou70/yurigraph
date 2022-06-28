#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/imas/index.json"
export REACT_APP_APP_NAME="ImasGraph"
export REACT_APP_CONTENT_NAME="アイドルマスター"
export REACT_APP_DEFAULT_FILTER_VALUE=200
export REACT_APP_MAIN_COLOR="#005693"
export REACT_APP_ACCENT_COLOR="#ed246e"
export DEPLOY_REPOSITORY="git@github.com:sititou70/imasgraph.git"
export DEPLOY_BRANCH="gh-pages"
