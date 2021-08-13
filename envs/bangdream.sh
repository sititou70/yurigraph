#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/bangdream/index.json"
export REACT_APP_NAME="BangDreamGraph"
export REACT_APP_DESCRIPTION="BanG Dream!のカップリングを可視化"
export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
export REACT_APP_DEFAULT_FILTER_VALUE=100
export REACT_APP_MAIN_COLOR="#5fc7d4"
export REACT_APP_ACCENT_COLOR="#e50150"
export DEPLOY_REPOSITORY="git@github.com:sititou70/bangdreamgraph.git"
export DEPLOY_BRANCH="gh-pages"
