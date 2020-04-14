#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/kancolle/index.json"
export REACT_APP_NAME="KancolleGraph"
export REACT_APP_DESCRIPTION="艦隊これくしょんのカップリングを可視化"
export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
export REACT_APP_DEFAULT_FILTER_VALUE=100
export REACT_APP_MAIN_COLOR="#2b6a9e"
export REACT_APP_ACCENT_COLOR="#f0c645"
export DEPLOY_REPOSITORY="git@github.com:sititou70/kancollegraph.git"
export DEPLOY_BRANCH="gh-pages"
