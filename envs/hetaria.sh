#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/hetaria/index.json"
export REACT_APP_NAME="HetariaGraph"
export REACT_APP_DESCRIPTION="ヘタリアシリーズのカップリングを可視化"
export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
export REACT_APP_DEFAULT_FILTER_VALUE=900
export REACT_APP_MAIN_COLOR="#5bc382"
export REACT_APP_ACCENT_COLOR="#c01a1e"
export DEPLOY_REPOSITORY="git@github.com:sititou70/hetagraph.git"
export DEPLOY_BRANCH="gh-pages"
