#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/umamusume/index.json"
export REACT_APP_APP_NAME="UmaMusumeGraph"
export REACT_APP_CONTENT_NAME="ウマ娘 プリティーダービー"
export REACT_APP_DEFAULT_FILTER_VALUE=100
export REACT_APP_MAIN_COLOR="#fcccc1"
export REACT_APP_ACCENT_COLOR="#f15187"
export DEPLOY_REPOSITORY="git@github.com:sititou70/umamusumegraph.git"
export DEPLOY_BRANCH="gh-pages"
