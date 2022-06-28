#!/bin/bash
set -eu

export TARGET_COUPLINGS_JSON="scraping/target_couplings/vocalo/index.json"
export REACT_APP_APP_NAME="VocaloMap"
export REACT_APP_CONTENT_NAME="VOCALOID・VOICEROID"
export REACT_APP_DEFAULT_FILTER_VALUE=291
export REACT_APP_MAIN_COLOR="#3d9bab"
export REACT_APP_ACCENT_COLOR="#b8396a"
export DEPLOY_REPOSITORY="git@github.com:sititou70/vocalomap.git"
export DEPLOY_BRANCH="gh-pages"
