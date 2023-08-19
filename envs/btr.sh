#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/btr/index.json"
export REACT_APP_APP_NAME="BTRMap"
export REACT_APP_CONTENT_NAME="ぼっち・ざ・ろっく！"
export REACT_APP_DEFAULT_FILTER_VALUE=150
export REACT_APP_MAIN_COLOR="#fff000"
export REACT_APP_ACCENT_COLOR="#ea608e"
export DEPLOY_REPOSITORY="git@github.com:sititou70/btrmap.git"
export DEPLOY_BRANCH="gh-pages"
