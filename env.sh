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
    export REACT_APP_MAIN_COLOR="#005693"
    export REACT_APP_ACCENT_COLOR="#ed246e"
    export DEPLOY_REPOSITORY="git@github.com:sititou70/imasgraph.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  "deremas")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/deremas/index.json"
    export REACT_APP_NAME="DereGraph"
    export REACT_APP_DESCRIPTION="アイドルマスターシンデレラガールズのカップリングを可視化"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
    export REACT_APP_DEFAULT_FILTER_VALUE=100
    export REACT_APP_MAIN_COLOR="#01baef"
    export REACT_APP_ACCENT_COLOR="#e32079"
    export DEPLOY_REPOSITORY="git@github.com:sititou70/deregraph.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  "touhou")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/touhou/index.json"
    export REACT_APP_NAME="TouhouMap"
    export REACT_APP_DESCRIPTION="東方Projectのカップリングを可視化"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
    export REACT_APP_DEFAULT_FILTER_VALUE=350
    export REACT_APP_MAIN_COLOR="#fef263"
    export REACT_APP_ACCENT_COLOR="#d7003a"
    export DEPLOY_REPOSITORY="git@github.com:sititou70/TouhouMap.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  "kancolle")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/kancolle/index.json"
    export REACT_APP_NAME="KancolleGraph"
    export REACT_APP_DESCRIPTION="艦隊これくしょんのカップリングを可視化"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
    export REACT_APP_DEFAULT_FILTER_VALUE=100
    export REACT_APP_MAIN_COLOR="#2b6a9e"
    export REACT_APP_ACCENT_COLOR="#f0c645"
    export DEPLOY_REPOSITORY="git@github.com:sititou70/kancollegraph.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  "lovelive")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/lovelive/index.json"
    export REACT_APP_NAME="LoveliveMap"
    export REACT_APP_DESCRIPTION="ラブライブ！シリーズのカップリングを可視化"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
    export REACT_APP_DEFAULT_FILTER_VALUE=876
    export REACT_APP_MAIN_COLOR="#384685"
    export REACT_APP_ACCENT_COLOR="#e4007f"
    export DEPLOY_REPOSITORY="git@github.com:sititou70/lovelivemap.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  "vocalo")
    export TARGET_COUPLINGS_JSON="scraping/target_couplings/vocalo/index.json"
    export REACT_APP_NAME="VocaloMap"
    export REACT_APP_DESCRIPTION="VOCALOID・VOICEROIDのカップリングを可視化"
    export REACT_APP_TITLE_TAG="$REACT_APP_NAME | $REACT_APP_DESCRIPTION"
    export REACT_APP_DEFAULT_FILTER_VALUE=291
    export REACT_APP_MAIN_COLOR="#3d9bab"
    export REACT_APP_ACCENT_COLOR="#b8396a"
    export DEPLOY_REPOSITORY="git@github.com:sititou70/vocalomap.git"
    export DEPLOY_BRANCH="gh-pages"
  ;;
  *)
    echo unknown TARGET_CONTENT name: $TARGET_CONTENT
    usage_exit
  ;;
esac

$EXEC
