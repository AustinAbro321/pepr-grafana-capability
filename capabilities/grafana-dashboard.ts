import {
  Capability,
  a,
  fetch,
  k8s,
} from "pepr";

import { Buffer } from "buffer";
import * as fs from 'fs';
import * as path from 'path';
import { FetchResponse } from "pepr/dist/lib/fetch";


export const Grafana = new Capability({
  name: "grafana",
  description: "A simple example capability to show how things work."
});

const { When } = Grafana;
const decode = (str: string):string => Buffer.from(str, 'base64').toString('binary');
const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');


export async function getGrafanaApiKey() : Promise<string> {
  //Future enhancement could be creating api key on the fly if the API allows it
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
  
  // const response = await k8sCoreApi.readNamespacedSecret("grafana-admin-api-key","admin-ns-devs-do-not-access");
  const response = await k8sCoreApi.readNamespacedSecret("monitoring","admin-ns-devs-do-not-access")
  return decode(response.body.data.value)
}

export async function getGrafanaAuthHeader() : Promise<string> {
  //Future enhancement could be creating api key on the fly if the API allows it
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
  
  // const response = await k8sCoreApi.readNamespacedSecret("grafana-admin-api-key","admin-ns-devs-do-not-access");
  const response = await k8sCoreApi.readNamespacedSecret("monitoring-grafana","monitoring")
  const adminPassword = decode(response.body.data["admin-password"])
  const adminUsername = decode(response.body.data["admin-user"])
  const authHeader = "Basic " + encode(`${adminUsername}:${adminPassword}`)
  return authHeader
}

function generateRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function getJsonFile(filename: string): any {
  const jsonPath = path.join(__dirname, "..", filename);
  const jsonData = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(jsonData);
}

interface GrafanaFolderData {
  id: number;
  uid: string;
  title: string;
}

export type GrafanaFolderDataArr = GrafanaFolderData[]

export async function grafanaApiCall<T>(method: string, path: string, body: string = null): Promise<FetchResponse<T>> {
  try{
    const response = await fetch<T>(
      `https://grafana.bigbang.dev/${path}`,
      { 
        method: `${method}`, 
        headers: {
          'Authorization': `${await getGrafanaAuthHeader()}`,
          'Content-Type': 'application/json',
        },
        body: body
      }
    );
    if (response.status == 403 || response.status == 401) {
      throw new Error(`Auth error! Status: ${JSON.stringify(response)}`);
    }
    return response;
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function createFolder(namespaceName: string, createFolderApiCall: Function = grafanaApiCall<GrafanaFolderData>,
  getFoldersApiCall: Function = grafanaApiCall<GrafanaFolderDataArr>) : Promise<string> {
  const folderJson = getJsonFile("folder.json")
  const folderUid = generateRandomString(12)
  folderJson.title = `${namespaceName}`
  folderJson.Uid = folderUid

  const folderJsonString = JSON.stringify(folderJson);
  const folderResponse = await createFolderApiCall("POST","api/folders",folderJsonString);
  console.log(`This is the folder response`)
  console.log(folderResponse)

  if (folderResponse.statusText == 'Conflict'){
    const getFolderResponse: FetchResponse<GrafanaFolderDataArr> = await getFoldersApiCall("GET","api/folders")
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

export async function createDashboard(namespaceName: string,folderUid: string,
  callCreateDashboardApi: Function = grafanaApiCall<GrafanaFolderDataArr>) : Promise<string> {
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
  const metricResponse = await callCreateDashboardApi("POST","api/dashboards/db",metricJsonString)

  console.log("this is the metric response")
  console.log(metricResponse)

  return metricResponse.data.uid
}

export async function createAlert(dashboardUid: string,folderUid: string){
  const alertJson = getJsonFile("alert.json")

  const alertUid = generateRandomString(12);
  alertJson.annotations.__dashboardUid__ = dashboardUid;
  alertJson.uid = alertUid;
  alertJson.folderUID = folderUid;

  const alertJsonString = JSON.stringify(alertJson);
  const alertResponse = await grafanaApiCall<GrafanaDashboardReturn>("POST","api/v1/provisioning/alert-rules/",alertJsonString)
  console.log(alertResponse)
}

interface GrafanaTeam {
  message: string;
  teamId: number;
}

export async function createTeam(teamName: string, apiCall: Function = grafanaApiCall<GrafanaTeam>) : Promise<number> {
  const team = {
    name: teamName,
    orgId: "1"
  };
  const teamJsonString = JSON.stringify(team);
  const createTeamResponse = await apiCall("POST","api/teams",teamJsonString)
  if (createTeamResponse.ok){
    return createTeamResponse.data.teamId
  }
  if (createTeamResponse.status == 409){
    const getTeams = await apiCall("GET",`api/teams/search?name=${teamName}`)
    return getTeams.data.teams[0].id
  }
  return -1;
}

export async function updatePermissions(folderUid: string, teamId: number,apiCall: Function = grafanaApiCall<GrafanaTeam>){
  const permissionsJson = {
    "items": [
      {
        "teamId": teamId,
        "permission": 2
      }
    ]  
  };
  const permissionJsonString = JSON.stringify(permissionsJson);
  await apiCall("POST",`api/folders/${folderUid}/permissions`,permissionJsonString)
}

When(a.Namespace)
  .IsCreatedOrUpdated()
  .WithLabel("pepr.dev/create-grafana-dashboard")
  .Mutate(async change => {
    const namespaceName = change.Raw.metadata.name
    const teamName = change.Raw.metadata.name
    const folderUid = await createFolder(namespaceName);
    const teamId = await createTeam(teamName);
    const dashboardUid = await createDashboard(namespaceName,folderUid);
    await createAlert(dashboardUid,folderUid)
    await updatePermissions(folderUid,teamId)
  });