#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/touhou/index.json"
export REACT_APP_NAME="TouhouMap"
export REACT_APP_DESCRIPTION="東方Projectのカップリングを可視化"
export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
export REACT_APP_DEFAULT_FILTER_VALUE=350
# 天色 https://www.colordic.org/colorsample/2312
export REACT_APP_MAIN_COLOR="#2ca9e1"
# 紅 https://www.colordic.org/colorsample/2014
export REACT_APP_ACCENT_COLOR="#d7003a"
export DEPLOY_REPOSITORY="git@github.com:sititou70/TouhouMap.git"
export DEPLOY_BRANCH="gh-pages"
