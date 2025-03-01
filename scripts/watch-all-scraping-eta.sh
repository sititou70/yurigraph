#!/bin/sh
set -eu
cd $(dirname $0)

cd ..

# check
for command in grep cut sed cat jq sort uniq wc find date bc node sleep; do
  if ! type $command >/dev/null; then
    echo "$command not found !!!"
    exit 1
  fi
done

# main
fetch_interval_ms=$(
  grep <scraping/index.ts "const FETCH_INTERVAL =" |
    cut -d " " -f 4 |
    sed -e "s/;//"
)
fetch_interval_s=$(node -e "console.log($fetch_interval_ms / 1000);")

while :; do
  all_couplings=$(
    cat scraping/target_couplings/*/index.json |
      jq ".[].tags[].name" |
      sort |
      uniq |
      wc -l
  )

  fetched_couplings=$(
    find scraping/TEMP_CACHE/* |
      wc -l
  )

  estimated_fetch_response_time_ms=300
  left_ms=$(node -e "console.log(($all_couplings - $fetched_couplings) * ($fetch_interval_ms + $estimated_fetch_response_time_ms));")
  left_hours=$(node -e "console.log($left_ms / 1000 / 60 / 60);")
  eta=$(node -e "console.log(new Date(Date.now() + $left_ms).toLocaleString());")
  echo "ETA: $eta ($left_hours hours left)"

  sleep $fetch_interval_s
done
