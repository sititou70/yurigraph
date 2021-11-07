#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/revengers/index.json"
export REACT_APP_NAME="RevengersGraph"
export REACT_APP_DESCRIPTION="東京卍リベンジャーズのカップリングを可視化"
export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
export REACT_APP_DEFAULT_FILTER_VALUE=300
export REACT_APP_MAIN_COLOR="#5fc7d4"
export REACT_APP_ACCENT_COLOR="#e50150"
export DEPLOY_REPOSITORY="git@github.com:sititou70/revengersmgraph.git"
export DEPLOY_BRANCH="gh-pages"
