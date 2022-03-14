import { pipelines, Stack, StackProps } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { constants } from './constants';
import { Storage } from './deployment';

export class Toolchain extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const codepipeline = new pipelines.CodePipeline(this, 'CodePipeline', {
      synth: new ShellStep('ShellStep', {
        input: pipelines.CodePipelineSource.connection(
          `${constants.GITHUB_REPO_OWNER}/${constants.GITHUB_REPO_NAME}`,
          constants.GITHUB_REPO_BRANCH,
          { connectionArn: constants.GITHUB_CONNECTION_ARN }
        ),
        commands: ['npm install', 'npm run build', 'npx cdk synth'],
      }),
    });

    const storage = new Storage(this, `${constants.APP_NAME}-Prod`, {
      vpcId: constants.PROD_VPC_ID,
      env: constants.PROD_ENV,
      multiAz: constants.PROD_MultiAz,
      fileSystemSize: constants.PROD_fileSystemSize,
      throughputMbps: constants.PROD_throughputMbps,
    });

    codepipeline.addStage(storage);
  }
}
