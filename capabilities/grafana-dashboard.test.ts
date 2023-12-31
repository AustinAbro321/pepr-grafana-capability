import { expect, test } from "@jest/globals";
import {createFolder,createDashboard, createTeam, getDataSourceUid} from './grafana-dashboard';


function getFoldersFakeApiCall() {
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
  expect(await createFolder("example-folder",createFolderHappyPath,getFoldersFakeApiCall)).toBe("uid-we-want");
});

test('Create folder that already exists', async () => {
  expect(await createFolder("example-folder",createFolderThatAlreadyExists,getFoldersFakeApiCall)).toBe("uid-that-we-want");
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



function createTeamApiCallHappyPath(method: string, path: string){
  if (method == "POST" && path == "api/teams"){
    return {
      data: { message: 'Team created', teamId: 2 },
      ok: true,
      status: 200,
      statusText: 'OK'
    }
  }
}

test('Create team happy path', async () => {
  expect(await createTeam("good-team",createTeamApiCallHappyPath)).toBe(2);
});

function createTeamConflict(method: string, path: string){
  if (method == "POST" && path == "api/teams"){
    return { status: 409, statusText: 'Conflict' }
  }
  if (method == "GET" && path == `api/teams/search?name=team-already-exists`){
    return {
      "data": {
        "teams": [
          {
            "id": 3,
            "orgId": 1,
            "name": "team-already-exists",
          }
        ]
      }
    }
  }
}

test('Create team conflict', async () => {
  expect(await createTeam("team-already-exists",createTeamConflict)).toBe(3);
});

function getDataSourceUidApiCall(method: string, path: string){
  return {
    "data": [
      {
        "uid": "uid-we-want",
        "name": "Prometheus",
      },
      {
        "uid": "uid-we-dont-want",
        "name": "datasource_elastic",
      }
    ]
  }
}

test('get data source uid', async () => {
  expect(await getDataSourceUid("Prometheus",getDataSourceUidApiCall)).toBe("uid-we-want");
});
