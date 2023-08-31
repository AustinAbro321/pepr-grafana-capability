#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

curl \
  -X POST \
  -H "Authorization: Bearer eyJrIjoiZnozbjB3Y2szdlF6elE1NWNlQWlIN09nNGE2ellOMWEiLCJuIjoiYWRtaW4iLCJpZCI6MX0=" \
  -H "Content-Type: application/json" \
  -d @$SCRIPT_DIR/metric.json https://grafana.bigbang.dev/api/dashboards/db
