export const constants = {
  APP_NAME: 'Storage',

  GITHUB_REPO_OWNER: 'dudutwizer',
  GITHUB_REPO_NAME: 'storage-with-skylight',
  GITHUB_REPO_BRANCH: 'main',
  GITHUB_CONNECTION_ARN:
    'arn:aws:codestar-connections:us-east-1:117923233529:connection/ad346622-f9a0-4c53-90a2-f6220123678b',

  TOOLCHAIN_ENV: {
    account: '117923233529',
    region: 'us-east-1',
  },

  DEV_ENV: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },

  PROD_ENV: {
    account: '117923233529',
    region: 'us-east-1',
  },
  PROD_VPC_ID: 'vpc-08a1f9f43269a7e2f',
  PROD_DIRECTORY_ID: 'd-906743935f',
  PROD_DOMAIN_NAME: 'skylight.aws',
  PROD_DOMAIN_SECRETNAME: 'skylight.aws-secret',
  PROD_MultiAz: true,
  PROD_fileSystemSize: 500,
  PROD_throughputMbps: 64,
} as const;
