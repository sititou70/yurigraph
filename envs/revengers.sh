#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/revengers/index.json"
export REACT_APP_APP_NAME="RevengersGraph"
export REACT_APP_CONTENT_NAME="東京卍リベンジャーズ"
export REACT_APP_DEFAULT_FILTER_VALUE=300
export REACT_APP_MAIN_COLOR="#5fc7d4"
export REACT_APP_ACCENT_COLOR="#e50150"
export DEPLOY_REPOSITORY="git@github.com:sititou70/revengersmgraph.git"
export DEPLOY_BRANCH="gh-pages"
