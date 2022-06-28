#!/bin/sh
set -eu
cd $(dirname $0)

cd ..

# utils
usage_exit() {
  set +u
  NPM_SCRIPT_NAME="[script name]"
  [ "$npm_lifecycle_event" ] && NPM_SCRIPT_NAME=$npm_lifecycle_event
  set -u

  AVAILABLE_TARGET_CONTENTS=$(
    find envs -type f |
      xargs -n 1 -Ixxx basename xxx .sh |
      xargs echo |
      sed -e "s/ / | /g"
  )
  echo usage: npm run $NPM_SCRIPT_NAME [TARGET_CONTENT]
  echo available TARGET_CONTENT: $AVAILABLE_TARGET_CONTENTS
  exit 0
}

get_repos_jsonl() {
  for env_file in $(find envs -type f); do
    (
      . $env_file
      echo "{ \
        \"content_name\": \"$REACT_APP_CONTENT_NAME\", \
        \"repo\": \"$DEPLOY_REPOSITORY\" \
      }" | tr -s " "
    )
  done
}

# process args
set +u
export TARGET_CONTENT="$1"
[ "$TARGET_CONTENT" = "" ] && echo TARGET_CONTENT is required! && usage_exit
set -u

# main
ENV_FILE="envs/${TARGET_CONTENT}.sh"
if [ ! -e $ENV_FILE ]; then
  echo unknown TARGET_CONTENT name: $TARGET_CONTENT
  usage_exit
fi

export REACT_APP_BUILD_DATE="$(date -I)"
export REACT_APP_REPOS_JSONL="$(get_repos_jsonl)"
. $ENV_FILE

$EXEC
