import { aws_ec2, Stack, Stage, StageProps } from 'aws-cdk-lib';
import * as skylight from 'cdk-skylight';
import { Construct } from 'constructs';
import { constants } from './constants';

export interface IStorageProps extends StageProps {
  vpcId?: string;
}

export class Storage extends Stage {
  readonly fsxWindows: skylight.storage.FSxWindows;

  constructor(scope: Construct, id: string, props: IStorageProps) {
    super(scope, id, props);

    const stateful = new Stack(this, 'Stateful', {});

    const vpc = props.vpcId
      ? aws_ec2.Vpc.fromLookup(stateful, 'Vpc', { vpcId: props.vpcId })
      : new aws_ec2.Vpc(stateful, 'Vpc', { maxAzs: 2 });

    const directoryId =
      constants.PROD_DIRECTORY_ID ??
      new skylight.authentication.AwsManagedMicrosoftAd(
        this,
        'AwsManagedMicrosoftAd',
        {
          vpc: vpc,
        },
      ).microsoftAD.ref;

    this.fsxWindows = new skylight.storage.FSxWindows(stateful, 'FSxWindows', {
      directoryId: directoryId,
      vpc: vpc,
    });
  }
}
