#!/bin/bash
set -eu

# args
usage_exit () {
  echo usage: [TARGET_CONTENT] commands...
  exit 0
}

set +u
export TARGET_CONTENT="$1"
[ "$TARGET_CONTENT" = "" ] && echo TARGET_CONTENT is required! && usage_exit
set -u

# main
## env
case "$TARGET_CONTENT" in
  "imas")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/imas/index.json"
    export REACT_APP_NAME="ImasGraph"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME - アイドルマスターのカップリングを可視化"
    export DEPLOY_REPOSITORY="git@github.com:sititou70/imasgraph.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  "deremas")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/deremas/index.json"
    export REACT_APP_NAME="DereGraph"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME - アイドルマスターシンデレラガールズのカップリングを可視化"
    export DEPLOY_REPOSITORY="git@github.com:sititou70/deregraph.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  *)
    echo unknown TARGET_CONTENT name: $TARGET_CONTENT
    usage_exit
  ;;
esac

${@:2}
