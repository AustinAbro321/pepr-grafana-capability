#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

TOKEN="eyJrIjoiWDVqdk8wM1hwaDVtNHBQam40dEhUb3BZdVlTb1pKeFciLCJuIjoiYWRtaW4iLCJpZCI6MX0="

curl \
  -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @$SCRIPT_DIR/../folder.json https://grafana.bigbang.dev/api/folders


# curl \
#   -X POST \
#   -H "Authorization: Bearer $TOKEN" \
#   -H "Content-Type: application/json" \
#   -d @$SCRIPT_DIR/metric.json https://grafana.bigbang.dev/api/dashboards/db

# curl \
#   -X GET \
#   -H "Authorization: Bearer $TOKEN" \
#   -H "Content-Type: application/json" \
#   https://grafana.bigbang.dev/api/v1/provisioning/alert-rules/11ZwmB1UkSz1111

# curl \
#   -X POST \
#   -H "Authorization: Bearer $TOKEN" \
#   -H "Content-Type: application/json" \
#   -d @$SCRIPT_DIR/../alert.json https://grafana.bigbang.dev/api/v1/provisioning/alert-rules/