import { expect, test } from "@jest/globals";
import {createFolder,createDashboard,createAlert,createDashboardGrafanaApi,getFoldersGrafanaApi} from './grafana-dashboard';


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

