import { expect, test } from "@jest/globals";
import {createFolder,createFolderGrafanaApi,getFoldersGrafanaApi} from './grafana-dashboard';


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
  return { data: undefined, ok: false, status: 409, statusText: 'Conflict' }
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