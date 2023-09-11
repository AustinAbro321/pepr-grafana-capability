import { expect, test } from "@jest/globals";
import {createFolder,createDashboard,createAlert,createDashboardGrafanaApi} from './grafana-dashboard';


function createFolderFakeApiCall() {
  return {
    data: [
      { id: 51, uid: 'nErXDvCkzz', title: 'example-team' },
      { id: 64, uid: 'O8SqTapWHm6z', title: 'example-team1' },
      { id: 78, uid: 'uid-that-we-want', title: 'example-folder' },
      { id: 86, uid: 'KYOgtoSwZtie', title: 'hello1' }
    ],
    ok: true,
    status: 200,
    statusText: 'OK'
  }
}

function createFolderThatAlreadyExists(){
  return { statusText: 'Conflict' }
}

function createFolderHappyPath(){
  return {
    data: {
      uid: 'uid-we-want',
    },
    ok: true,
    status: 200,
    statusText: 'OK'
  }
}

test('Create folder happy path', async () => {
  expect(await createFolder("example-folder",createFolderHappyPath,createFolderFakeApiCall)).toBe("uid-we-want");
});

test('Create folder that already exists', async () => {
  expect(await createFolder("example-folder",createFolderThatAlreadyExists,createFolderFakeApiCall)).toBe("uid-that-we-want");
});

const dashboardUid = 'dashboard-uid-we-want'

function createDashboardApi(){
  return {
    data: {
      id: 90,
      slug: 'hello-world-performance-metrics',
      status: 'success',
      uid: dashboardUid,
      url: '/d/kIjjsWSiZYKP/hello-world-performance-metrics',
      version: 4
    },
    ok: true,
    status: 200,
    statusText: 'OK'
  }
}

test("create dashboard", async () =>{
  expect(await createDashboard("hello-world-test","udeIeXhioW6i",createDashboardApi)).toBe(dashboardUid);
})

test("manual test: create dashboard", async () =>{
  await createDashboard("hello-world-test","udeIeXhioW6i",createDashboardGrafanaApi);
})

// {
//   data: {
//     id: 90,
//     slug: 'hello-world-performance-metrics',
//     status: 'success',
//     uid: 'kIjjsWSiZYKP',
//     url: '/d/kIjjsWSiZYKP/hello-world-performance-metrics',
//     version: 1
//   },
//   ok: true,
//   status: 200,
//   statusText: 'OK'
// }


test("create alert", async () => {
  await createAlert("MLGd8XYjK68B","udeIeXhioW6i")
})

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