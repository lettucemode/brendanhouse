import { S3Service, S3Key, S3Object } from './s3';
import awsmobile from '../aws-exports';
import FileRecord from '../models/FileRecord';
import { Auth } from 'aws-amplify';
import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Credentials } from '@aws-sdk/types';

// todo: change this into a class and useEffect in the components that need it
export const FileService = {
  listPublicFiles: async function (): Promise<FileRecord[]> {
    const params = {
      FilterExpression: 'begins_with (s3key, :prefix)',
      ExpressionAttributeValues: {
        ':prefix': { S: 'public/' },
      },
      TableName: 'files-prod',
    };
    let creds = await Auth.currentCredentials();
    const ddb = new DynamoDBClient({
      region: awsmobile.aws_dynamodb_all_tables_region,
      credentials: {
        accessKeyId: creds.accessKeyId,
        secretAccessKey: creds.secretAccessKey,
        sessionToken: creds.sessionToken,
      } as Credentials,
    });
    const results = await ddb.send(new ScanCommand(params));
    return results.Items.map((i: any) => ({ name: i.name.S, s3key: i.s3key.S } as FileRecord));
  },
  listUploadedFiles: async function (): Promise<FileRecord[]> {
    const params = {
      FilterExpression: 'begins_with (s3key, :prefix)',
      ExpressionAttributeValues: {
        ':prefix': { S: 'uploads/' },
      },
      TableName: 'files-prod',
    };
    let creds = await Auth.currentCredentials();
    const ddb = new DynamoDBClient({
      region: awsmobile.aws_dynamodb_all_tables_region,
      credentials: {
        accessKeyId: creds.accessKeyId,
        secretAccessKey: creds.secretAccessKey,
        sessionToken: creds.sessionToken,
      } as Credentials,
    });
    const results = await ddb.send(new ScanCommand(params));
    return results.Items.map((i: any) => ({ name: i.name.S, s3key: i.s3key.S } as FileRecord));
  },
};
