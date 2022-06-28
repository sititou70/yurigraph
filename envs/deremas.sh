#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/deremas/index.json"
export REACT_APP_APP_NAME="DereGraph"
export REACT_APP_CONTENT_NAME="アイドルマスターシンデレラガールズ"
export REACT_APP_DEFAULT_FILTER_VALUE=100
export REACT_APP_MAIN_COLOR="#01baef"
export REACT_APP_ACCENT_COLOR="#e32079"
export DEPLOY_REPOSITORY="git@github.com:sititou70/deregraph.git"
export DEPLOY_BRANCH="gh-pages"
