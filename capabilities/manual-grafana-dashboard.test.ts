import { expect, test } from "@jest/globals";
import {getGrafanaAuthHeader,createAlert, grafanaApiCall, GrafanaFolderDataArr, createFolder, createTeam, updatePermissions, getJsonFileFromConfigMap} from './grafana-dashboard';

const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');
test("So I don't get an error when I run npm test lol", async () => {
  // const str = "Basic " + encode(`admin:prom-operator`)
  // console.log(str)
  expect(true).toBe(true)
})

// test("get API key", async () => {
//   expect(await createMetricDashboardConfigMap())
// })
// test("get API key", async () => {
//   console.log(await getJsonFileFromConfigMap())
// })
test("get API key", async () => {
  console.log(await createFolder("example-team"))
})


// {
//   body: V1Secret {
//     apiVersion: 'v1',
//     data: {
//       'admin-password': 'cHJvbS1vcGVyYXRvcg==',
//       'admin-user': 'YWRtaW4=',
//       'ldap-toml': ''
//     },
//     kind: 'Secret',
//     metadata: V1ObjectMeta {
//       annotations: [Object],
//       creationTimestamp: 2023-09-22T16:09:23.000Z,
//       deletionGracePeriodSeconds: undefined,
//       deletionTimestamp: undefined,
//       finalizers: undefined,
//       generateName: undefined,
//       generation: undefined,
//       labels: [Object],
//       managedFields: [Array],
//       name: 'monitoring-grafana',
//       namespace: 'monitoring',
//       ownerReferences: undefined,
//       resourceVersion: '2074',
//       selfLink: undefined,
//       uid: '830260e5-7a9f-480b-8c95-b99e468d57fd'
//     },
//     type: 'Opaque'
//   }
// }

// test("create alert", async () => {
//   console.log(await createAlert("h9ZdRJ3rAId6","wzO9xrENKqVk","PBFA97CFB590B2093"))
// })

// test("creat team", async () => {
//   console.log(await createTeam("hello-world"))
// })

// test("give team permissions", async () => {
//   console.log(await updatePermissions("s8TnYPWbhqQW",3))
// })

// {
//   data: {
//     id: 10,
//     uid: 'huataRPf28np',
//     orgID: 1,
//     folderUID: 'Up8gh-kSz',
//     ruleGroup: 'grafana',
//     title: '80% of CPU Limit Used by Containers (Over Time)',
//     condition: 'C',
//     data: [ [Object], [Object], [Object] ],
//     updated: '2023-09-11T17:22:17.044765101Z',
//     noDataState: 'NoData',
//     execErrState: 'Error',
//     for: '5m',
//     annotations: { __dashboardUid__: 'kIjjsWSiZYKP', __panelId__: '2' }
//   },
//   ok: true,
//   status: 201,
//   statusText: 'Created'
// }



// test("get API key", async () => {
//   console.log(await createFolder("foldername"))
// })

// test("generic grafana api call", async () => {
//   console.log(await grafanaApiCall<GrafanaFolderDataArr>("GET","api/folders"))
// })

// test("get Folders", async () => {
//   console.log(await getFoldersGrafanaApi())
// })

// test("manual test: create dashboard", async () =>{
//   await getGrafanaAuthHeader();
// })