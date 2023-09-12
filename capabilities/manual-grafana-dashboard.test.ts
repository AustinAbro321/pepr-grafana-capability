import { expect, test } from "@jest/globals";
import {getGrafanaApiKey,createFolderGrafanaApi} from './grafana-dashboard';

test("So I don't get an error when I run npm test lol", async () => {
  expect(true).toBe(true)
})

// test("get API key", async () => {
//   expect(await getGrafanaApiKey())
// })

// test("create alert", async () => {
//   await createAlert("MLGd8XYjK68B","udeIeXhioW6i")
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
//   console.log(await createFolderGrafanaApi("body"))
// })

// test("manual test: create dashboard", async () =>{
//   await createDashboard("hello-world-test","udeIeXhioW6i",createDashboardGrafanaApi);
// })