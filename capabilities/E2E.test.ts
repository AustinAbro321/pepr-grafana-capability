import { execSync } from 'child_process';

describe('k3d Cluster Tests', () => {

  beforeAll(() => {
    execSync('k3d cluster create my-test-cluster');
  });

  afterAll(() => {
    execSync('k3d cluster delete my-test-cluster');
  });

  test('Get bigbang up', () => {
    const output = execSync('kubectl get nodes');
    expect(output.toString()).toContain('my-test-cluster');
  });


});