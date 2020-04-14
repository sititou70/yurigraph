#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/lovelive/index.json"
export REACT_APP_NAME="LoveliveMap"
export REACT_APP_DESCRIPTION="ラブライブ！シリーズのカップリングを可視化"
export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
export REACT_APP_DEFAULT_FILTER_VALUE=876
export REACT_APP_MAIN_COLOR="#384685"
export REACT_APP_ACCENT_COLOR="#e4007f"
export DEPLOY_REPOSITORY="git@github.com:sititou70/lovelivemap.git"
export DEPLOY_BRANCH="gh-pages"
