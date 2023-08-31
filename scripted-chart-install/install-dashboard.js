"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var fs = require("fs");
var path = require("path");
var url = 'https://grafana.bigbang.dev/api/dashboards/db';
var bearerToken = 'eyJrIjoiZnozbjB3Y2szdlF6elE1NWNlQWlIN09nNGE2ellOMWEiLCJuIjoiYWRtaW4iLCJpZCI6MX0=';
var scriptDir = path.resolve(__dirname); // Assuming your script is in the directory you want to reference
var metricJsonPath = path.join(scriptDir, 'metric.json');
var metricData = fs.readFileSync(metricJsonPath, 'utf8');
var metricJson = JSON.parse(metricData);
metricJson.dashboard.templating.list[0].allValue = "hello-world-dev";
console.log(metricJson.dashboard.templating.list[0].allValue);
(0, node_fetch_1.default)(url, {
    method: 'POST',
    headers: {
        'Authorization': "Bearer ".concat(bearerToken),
        'Content-Type': 'application/json',
    },
    body: metricData
})
    .then(function (response) { return response.json(); })
    .then(function (data) {
    console.log(data);
})
    .catch(function (error) {
    console.error('There was an error:', error);
});
