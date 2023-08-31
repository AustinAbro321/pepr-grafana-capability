import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';


const url = 'https://grafana.bigbang.dev/api/dashboards/db';
const bearerToken = 'eyJrIjoiZnozbjB3Y2szdlF6elE1NWNlQWlIN09nNGE2ellOMWEiLCJuIjoiYWRtaW4iLCJpZCI6MX0=';
const scriptDir = path.resolve(__dirname);  // Assuming your script is in the directory you want to reference
const metricJsonPath = path.join(scriptDir, 'metric.json');

const metricData = fs.readFileSync(metricJsonPath, 'utf8');

const metricJson = JSON.parse(metricData);

metricJson.dashboard.templating.list[0].allValue = "hello-world-dev"

console.log(metricJson.dashboard.templating.list[0].allValue)

fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
    },
    body: metricData
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There was an error:', error);
});