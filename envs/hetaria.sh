#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/hetaria/index.json"
export REACT_APP_NAME="HetaGraph"
export REACT_APP_DESCRIPTION="Axis Powers ヘタリアのカップリングを可視化"
export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
export REACT_APP_DEFAULT_FILTER_VALUE=900
export REACT_APP_MAIN_COLOR="#86d63f"
export REACT_APP_ACCENT_COLOR="#eb141a"
export DEPLOY_REPOSITORY="git@github.com:sititou70/hetagraph.git"
export DEPLOY_BRANCH="gh-pages"
