import { App } from 'aws-cdk-lib';
import { constants } from '../src/constants';
import { Storage } from '../src/deployment';
test('StorageComponent', () => {
  const app = new App();
  const stack = new Storage(app, 'storage-dev-test', {
    vpcId: constants.PROD_VPC_ID,
    env: constants.PROD_ENV,
  });

  expect(stack).toHaveProperty(
    'fsxWindows.fsxObject.cfnResourceType',
    'AWS::FSx::FileSystem'
  );
});
