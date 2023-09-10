import {
  Capability,
  a,
  fetch,
} from "pepr";

import * as fs from 'fs';
import * as path from 'path';

const grafanaAPIKey = "eyJrIjoiWDVqdk8wM1hwaDVtNHBQam40dEhUb3BZdVlTb1pKeFciLCJuIjoiYWRtaW4iLCJpZCI6MX0="

export const HelloPepr = new Capability({
  name: "hello-pepr",
  description: "A simple example capability to show how things work.",
  namespaces: ["pepr-demo","hello-world-dev"]
});

const { When } = HelloPepr;

interface GrafanaReturn {
  id: string;
  slug: string;
  version: string;
  url: string;
  uid: string;
}

function generateRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function getJsonFile(filename: string): any {
  const jsonPath = path.join(__dirname, "..", filename);
  const jsonData = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(jsonData);

}

async function createFolder(namespaceName: string) {
  const folderJson = getJsonFile("folder.json")
  const folderUid = generateRandomString(12)
  folderJson.title = `${namespaceName}`
  folderJson.Uid = folderUid
  const folderJsonString = JSON.stringify(folderJson);

  const folderResponse = await fetch<GrafanaReturn>(
    "https://grafana.bigbang.dev/api/folders",
    { 
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${grafanaAPIKey}`,
        'Content-Type': 'application/json',
      },
      body: folderJsonString
    }
  );
  console.log("folder response")
  console.log(folderResponse)
}


// {
//   data: {
//     id: 64,
//     uid: 'O8SqTapWHm6z',
//     title: 'example-team1',
//     url: '/dashboards/f/O8SqTapWHm6z/example-team1',
//     hasAcl: false,
//     canSave: true,
//     canEdit: true,
//     canAdmin: true,
//     canDelete: true,
//     createdBy: 'Anonymous',
//     created: '2023-09-10T20:59:27.612269639Z',
//     updatedBy: 'Anonymous',
//     updated: '2023-09-10T20:59:27.612269719Z',
//     version: 1,
//     parentUid: ''
//   },
//   ok: true,
//   status: 200,
//   statusText: 'OK'
// }


async function applesauce(namespaceName: string) {
  const metricJsonPath = path.join(__dirname, "..", 'metric.json');
  const metricData = fs.readFileSync(metricJsonPath, 'utf8');
  const metricJson = JSON.parse(metricData);
  // Future enhancement get the number of namespaces with the same team or same dashboard enabled
  // Then add that to the dashboard
  // Future enhancement have the field to trigger this be pepr.io/grafana_app_name titles are based on that
  createFolder(namespaceName);
  const dashboardUid = generateRandomString(12)

  metricJson.dashboard.templating.list[0].allValue = namespaceName;
  metricJson.dashboard.templating.list[0].options[1].text = namespaceName;
  metricJson.dashboard.templating.list[0].options[1].value = namespaceName;
  metricJson.dashboard.templating.list[0].query = namespaceName;
  metricJson.dashboard.uid = dashboardUid;

  const metricJsonString = JSON.stringify(metricJson);

  const metricResponse = await fetch<GrafanaReturn>(
    "https://grafana.bigbang.dev/api/dashboards/db",
    { 
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${grafanaAPIKey}`,
        'Content-Type': 'application/json',
      },
      body: metricJsonString
    }
  );

  if (metricResponse.ok) {
    console.log("the response was ok")  
  }
  else{
    console.log("the response was not ok")
  }

  console.log("this is the response")
  console.log(metricResponse)

  const alertJsonPath = path.join(__dirname, "..", 'alert.json');
  const alertData = fs.readFileSync(alertJsonPath, 'utf8');
  const alertJson = JSON.parse(alertData);

  const alertUid = generateRandomString(12);
  // alertJson.annotations.__dashboardUid__ = dashboardUid;
  // alertJson.uid = alertUid;

  const alertJsonString = JSON.stringify(alertJson);

  //TODO I"M stupid and this is the wrong API request, why I need better testing
  const alertResponse = await fetch<GrafanaReturn>(
    "https://grafana.bigbang.dev/api/dashboards/db",
    { 
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${grafanaAPIKey}`,
        'Content-Type': 'application/json',
        'x-disable-provenance': 'true',
      },
      body: alertJsonString
    }
  );

  console.log("this is the response")
  console.log(alertResponse)
}

  

When(a.Namespace)
  .IsCreatedOrUpdated()
  .WithLabel("pepr.io/create-grafana-dashboard")
  .Mutate(async change => {
    //applesauce(change.Raw.metadata.name)
  });  