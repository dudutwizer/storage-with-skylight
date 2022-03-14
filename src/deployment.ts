import { aws_ec2, Stack, Stage, StageProps } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import * as skylight from 'cdk-skylight';
import { Construct } from 'constructs';

export interface IStorageProps extends StageProps {
  vpcId?: string;
  multiAz?: boolean;
  fileSystemSize?: number;
  throughputMbps?: number;
  directoryParameters?: {
    directoryId: string;
    directoryDomain: string;
    directorySecretName: string;
  };
}

export class Storage extends Stage {
  readonly fsxWindows: skylight.storage.FSxWindows;
  readonly fsxManagedBox: skylight.compute.DomainWindowsNode;

  constructor(scope: Construct, id: string, props: IStorageProps) {
    super(scope, id, props);
    props.multiAz = props.multiAz ?? false;
    props.fileSystemSize = props.fileSystemSize ?? 200;
    props.throughputMbps = props.throughputMbps ?? 64;

    const stateful = new Stack(this, 'Stateful', {});

    const vpc = props.vpcId
      ? aws_ec2.Vpc.fromLookup(stateful, 'Vpc', { vpcId: props.vpcId })
      : new aws_ec2.Vpc(stateful, 'Vpc', { maxAzs: 2 });

    if (!props.directoryParameters) {
      const newDirectory = new skylight.authentication.AwsManagedMicrosoftAd(
        stateful,
        'AwsManagedMicrosoftAd',
        {
          vpc: vpc,
        },
      );
      props.directoryParameters = {
        directoryDomain: newDirectory.props.domainName!,
        directoryId: newDirectory.microsoftAD.ref,
        directorySecretName: newDirectory.secret.secretName,
      };
    }

    this.fsxWindows = new skylight.storage.FSxWindows(stateful, 'FSxWindows', {
      directoryId: props.directoryParameters.directoryId,
      vpc: vpc,
      multiAZ: props.multiAz,
      fileSystemSize: props.fileSystemSize,
      throughputMbps: props.throughputMbps,
    });

    // Creates CDK Object of the provided Secret (Without verifing the secret exist or not)
    const secretObject = Secret.fromSecretNameV2(
      stateful,
      'secret',
      props.directoryParameters.directorySecretName,
    );

    this.fsxManagedBox = this.fsxWindows.createWorker(
      props.directoryParameters.directoryDomain,
      secretObject,
    );
  }
}
