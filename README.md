# Storage Component

![](https://img.shields.io/badge/Developer%20Preview-orange.svg?style=for-the-badge)

An example of stateful Storage (Amazon FSx for Windows) layer implemented using AWS CDK.

This example utilizes the [CDK-Skylight](https://github.com/cdklabs/cdk-skylight) [storage library](https://github.com/cdklabs/cdk-skylight/blob/main/src/skylight-storage/fsx-windows.ts) to follow the best practices of Amazon FSx for Windows File System with Active Directory.

The example also contains recommended AWS CDK project structure for a realistic Infrastructure-As-Code component decoupled from other parts. It is also designed to be used with other components to deliver a business value (Aka Workload).

## How to use

Production use-case

```bash
cdk deploy Storage-Toolchain
```

Development use-case

```bash
cdk deploy Storage-Dev/Stateful
```
