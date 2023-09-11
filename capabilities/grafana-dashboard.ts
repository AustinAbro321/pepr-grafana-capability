import {
  Capability,
  a,
  fetch,
  PeprMutateRequest,
  Log,
} from "pepr";

import * as fs from 'fs';
import * as path from 'path';
import { FetchResponse } from "pepr/dist/lib/fetch";

const grafanaAPIKey = "eyJrIjoiWDVqdk8wM1hwaDVtNHBQam40dEhUb3BZdVlTb1pKeFciLCJuIjoiYWRtaW4iLCJpZCI6MX0="

export const HelloPepr = new Capability({
  name: "hello-pepr",
  description: "A simple example capability to show how things work.",
  namespaces: ["pepr-demo","hello-world-dev"]
});

const { When } = HelloPepr;

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

export async function createFolderGrafanaApi(body: string){
  return fetch<GrafanaFolderData>(
    "https://grafana.bigbang.dev/api/folders",
    { 
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${grafanaAPIKey}`,
        'Content-Type': 'application/json',
      },
      body: body
    }
  );
}

interface GrafanaFolderData {
  id: number;
  uid: string;
  title: string;
}

type GrafanaFolderDataArr = GrafanaFolderData[]

export async function getFoldersGrafanaApi(){
  return fetch<GrafanaFolderDataArr>(
    "https://grafana.bigbang.dev/api/folders",
    { 
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${grafanaAPIKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function createFolder(namespaceName: string, createFolderApiCall: Function,
  getFoldersApiCall: Function) : Promise<string> {
  const folderJson = getJsonFile("folder.json")
  const folderUid = generateRandomString(12)
  folderJson.title = `${namespaceName}`
  folderJson.Uid = folderUid

  const folderJsonString = JSON.stringify(folderJson);
  const folderResponse = await createFolderApiCall(folderJsonString);
  console.log(folderResponse)

  if (folderResponse.statusText == 'Conflict'){
    const getFolderResponse: FetchResponse<GrafanaFolderDataArr> = await getFoldersApiCall()
    const correctFolder = getFolderResponse.data.find(entry => entry.title === folderJson.title)
    return correctFolder.uid
  }
  return folderResponse.data.uid;
}

interface GrafanaDashboardReturn {
  id: string;
  slug: string;
  version: string;
  url: string;
  uid: string;
}

async function createDashboardGrafanaApi(jsonBody: string){
  return fetch<GrafanaDashboardReturn>(
    "https://grafana.bigbang.dev/api/dashboards/db",
    { 
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${grafanaAPIKey}`,
        'Content-Type': 'application/json',
      },
      body: jsonBody
    }
  );
}

export async function createDashboard(namespaceName: string,folderUid: string,
  callCreateDashboardApi) : Promise<string> {
  const metricJson = getJsonFile("metric.json")
  const dashboardUid = generateRandomString(12)

  // Future enhancement get the number of namespaces with the same team or same dashboard enabled
  // Then add that to the dashboard
  // Future enhancement have the field to trigger this be pepr.io/grafana_app_name titles are based on that
  metricJson.dashboard.templating.list[0].allValue = namespaceName;
  metricJson.dashboard.templating.list[0].options[1].text = namespaceName;
  metricJson.dashboard.templating.list[0].options[1].value = namespaceName;
  metricJson.dashboard.templating.list[0].query = namespaceName;
  metricJson.folderUid = folderUid;
  metricJson.dashboard.uid = dashboardUid;

  const metricJsonString = JSON.stringify(metricJson);

  const metricResponse = await callCreateDashboardApi(metricJsonString)

  return metricResponse.data.uid
}



async function createAlert(dashboardUid: string){
  const alertJson = getJsonFile("alert.json")

  const alertUid = generateRandomString(12);
  // alertJson.annotations.__dashboardUid__ = dashboardUid;
  // alertJson.uid = alertUid;

  const alertJsonString = JSON.stringify(alertJson);

  //TODO I"M stupid and this is the wrong API request, why I need better testing
  const alertResponse = await fetch<GrafanaDashboardReturn>(
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


async function applesauce(namespace: PeprMutateRequest<a.Namespace>) {

  const namespaceName = namespace.Raw.metadata.name
  const folderUid = await createFolder(namespaceName,createFolderGrafanaApi,getFoldersGrafanaApi);
  createDashboard(namespaceName,folderUid,createDashboardGrafanaApi);
  
}

  

When(a.Namespace)
  .IsCreatedOrUpdated()
  .WithLabel("pepr.io/create-grafana-dashboard")
  .Mutate(async change => {
    applesauce(change)
  });  