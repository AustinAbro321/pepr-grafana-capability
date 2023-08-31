import {
  Capability,
  a,
  fetch,
  fetchStatus,
} from "pepr";

import * as fs from 'fs';
import * as path from 'path';

export const HelloPepr = new Capability({
  name: "hello-pepr",
  description: "A simple example capability to show how things work.",
  namespaces: ["pepr-demo","hello-world-dev"]
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
  

const grafanaAPIKey = "eyJrIjoiZnozbjB3Y2szdlF6elE1NWNlQWlIN09nNGE2ellOMWEiLCJuIjoiYWRtaW4iLCJpZCI6MX0="
When(a.Namespace)
  .IsCreatedOrUpdated()
  .WithLabel("pepr.io")
  .Mutate(async change => {
    const metricJsonPath = path.join(__dirname, "..", 'metric.json');
    
    const metricData = fs.readFileSync(metricJsonPath, 'utf8');
    
    const metricJson = JSON.parse(metricData);
    
    metricJson.dashboard.templating.list[0].allValue = change.Raw.metadata.name


    const response = await fetch<GrafanaReturn>(
      "https://grafana.bigbang.dev/api/dashboards/db",
      { 
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${grafanaAPIKey}`,
          'Content-Type': 'application/json',
        },
        body: metricData
      }
    );

    if (response.ok) {
      console.log("the response was ok")
      console.log(response)
    }
    else{
      console.log(response)
    }

  });  