#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/lovelive/index.json"
export REACT_APP_APP_NAME="LoveliveMap"
export REACT_APP_CONTENT_NAME="ラブライブ！シリーズ"
export REACT_APP_DEFAULT_FILTER_VALUE=876
export REACT_APP_MAIN_COLOR="#384685"
export REACT_APP_ACCENT_COLOR="#e4007f"
export DEPLOY_REPOSITORY="git@github.com:sititou70/lovelivemap.git"
export DEPLOY_BRANCH="gh-pages"
