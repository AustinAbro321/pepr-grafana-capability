import {
  Capability,
  a,
  fetch,
  fetchStatus,
} from "pepr";

export const HelloPepr = new Capability({
  name: "hello-pepr",
  description: "A simple example capability to show how things work.",
  namespaces: ["pepr-demo"]
});

const { When } = HelloPepr;

When(a.Namespace)
  .IsCreated()
  .Mutate(ns => ns.RemoveLabel("remove-me"));

interface GrafanaReturn {
  id: string;
  slug: string;
  version: string;
  url: string;
  uid: string;
}
  

import grafanaMetricDashboard from '../scripted-chart-install/metric.json';
const grafanaAPIKey = "eyJrIjoiZnozbjB3Y2szdlF6elE1NWNlQWlIN09nNGE2ellOMWEiLCJuIjoiYWRtaW4iLCJpZCI6MX0="
When(a.Namespace)
  .IsCreated()
  .WithLabel("pepr.io/grafana-metric-dashboard-enabled")
  .Mutate(async change => {
    
    const scriptDir = path.resolve(__dirname);  // Assuming your script is in the directory you want to reference
    const metricJsonPath = path.join("__dirname", scriptDir, 'metric.json');
    
    const metricData = fs.readFileSync(metricJsonPath, 'utf8');
    
    const metricJson = JSON.parse(metricData);
    
    metricJson.dashboard.templating.list[0].allValue = "hello-world-dev"

    const response = await fetch<GrafanaReturn>(
      "https://grafana.bigbang.dev/api/dashboards/db",
      { 
        method: 'POST', 
        headers: {Authorization: `Bearer ${grafanaAPIKey}`},
        body: metricData
      }
    );

  //   url, {
  //     method: 'POST',
  //     headers: {
  //         'Authorization': `Bearer ${bearerToken}`,
  //         'Content-Type': 'application/json',
  //     },
  //     body: metricData
  // }

    // Instead, check the `response.ok` field
    if (response.ok) {
      // Add the Chuck Norris joke to the configmap
      // change.Raw.data["chuck-says"] = response.data.value;
      console.log("the response was ok")
      return;
    }

    // You can also assert on different HTTP response codes
    if (response.status === fetchStatus.NOT_FOUND) {
      // Do something else
      console.log("the response was not ok")
      return;
    }
  });  