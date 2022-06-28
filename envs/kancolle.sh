#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/kancolle/index.json"
export REACT_APP_APP_NAME="KancolleGraph"
export REACT_APP_CONTENT_NAME="艦隊これくしょん"
export REACT_APP_DEFAULT_FILTER_VALUE=100
export REACT_APP_MAIN_COLOR="#0779e4"
export REACT_APP_ACCENT_COLOR="#f0c645"
export DEPLOY_REPOSITORY="git@github.com:sititou70/kancollegraph.git"
export DEPLOY_BRANCH="gh-pages"
