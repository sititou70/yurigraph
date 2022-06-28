#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/hetalia/index.json"
export REACT_APP_APP_NAME="HetaGraph"
export REACT_APP_CONTENT_NAME="Axis Powers ヘタリア"
export REACT_APP_DEFAULT_FILTER_VALUE=900
export REACT_APP_MAIN_COLOR="#22add6"
export REACT_APP_ACCENT_COLOR="#fee502"
export DEPLOY_REPOSITORY="git@github.com:sititou70/hetagraph.git"
export DEPLOY_BRANCH="gh-pages"
