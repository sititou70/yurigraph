#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/imas/index.json"
export REACT_APP_NAME="ImasGraph"
export REACT_APP_DESCRIPTION="アイドルマスターのカップリングを可視化"
export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
export REACT_APP_DEFAULT_FILTER_VALUE=200
export REACT_APP_MAIN_COLOR="#005693"
export REACT_APP_ACCENT_COLOR="#ed246e"
export DEPLOY_REPOSITORY="git@github.com:sititou70/imasgraph.git"
export DEPLOY_BRANCH="gh-pages"
