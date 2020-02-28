#!/bin/bash
set -eu

# args
usage_exit () {
  set +u
  NPM_SCRIPT_NAME="[script name]"
  [ "$npm_lifecycle_event" ] && NPM_SCRIPT_NAME=$npm_lifecycle_event
  set -u
  echo usage: npm run $NPM_SCRIPT_NAME [TARGET_CONTENT]
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
    export REACT_APP_DESCRIPTION="アイドルマスターのカップリングを可視化"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
    export REACT_APP_DEFAULT_FILTER_VALUE=200
    export DEPLOY_REPOSITORY="git@github.com:sititou70/imasgraph.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  "deremas")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/deremas/index.json"
    export REACT_APP_NAME="DereGraph"
    export REACT_APP_DESCRIPTION="アイドルマスターシンデレラガールズのカップリングを可視化"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
    export REACT_APP_DEFAULT_FILTER_VALUE=100
    export DEPLOY_REPOSITORY="git@github.com:sititou70/deregraph.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  "touhou")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/touhou/index.json"
    export REACT_APP_NAME="TouhouMap"
    export REACT_APP_DESCRIPTION="東方Projectのカップリングを可視化"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
    export REACT_APP_DEFAULT_FILTER_VALUE=350
    export DEPLOY_REPOSITORY="git@github.com:sititou70/TouhouMap.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  "kancolle")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/kancolle/index.json"
    export REACT_APP_NAME="KancolleGraph"
    export REACT_APP_DESCRIPTION="艦隊これくしょんのカップリングを可視化"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
    export REACT_APP_DEFAULT_FILTER_VALUE=100
    export DEPLOY_REPOSITORY="git@github.com:sititou70/kancollegraph.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  *)
    echo unknown TARGET_CONTENT name: $TARGET_CONTENT
    usage_exit
  ;;
esac

$EXEC
