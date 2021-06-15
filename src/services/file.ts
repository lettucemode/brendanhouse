import awsmobile from '../aws-exports';
import FileRecord from '../models/FileRecord';
import { Auth, Storage } from 'aws-amplify';
import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
  DeleteItemCommand,
  DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { Credentials } from '@aws-sdk/types';
import { ICredentials } from '@aws-amplify/core';

export interface S3Key {
  key: string;
}

export interface S3Object {
  eTag: string;
  key: string;
  lastModified: string;
  size: number;
}

export class FileService {
  private ddb: DynamoDBClient;

  TableName: string = 'files-prod';
  PublicPrefix: string = 'public/';
  UploadsPrefix: string = 'uploads/';

  async init() {
    let creds: ICredentials = await Auth.currentCredentials();
    this.ddb = new DynamoDBClient({
      region: awsmobile.aws_dynamodb_all_tables_region,
      credentials: {
        accessKeyId: creds.accessKeyId,
        secretAccessKey: creds.secretAccessKey,
        sessionToken: creds.sessionToken,
      } as Credentials,
    });
  }

  async listPublicFiles(): Promise<FileRecord[]> {
    return await this.listFiles(this.PublicPrefix);
  }

  async listUploadedFiles(): Promise<FileRecord[]> {
    return await this.listFiles(this.UploadsPrefix);
  }

  private async listFiles(prefix: string): Promise<FileRecord[]> {
    const params = {
      FilterExpression: 'begins_with (s3key, :prefix)',
      ExpressionAttributeValues: {
        ':prefix': { S: prefix },
      },
      TableName: this.TableName,
    };
    const results = await this.ddb.send(new ScanCommand(params));
    return results.Items.map((i: any) => ({ name: i.name.S, s3key: i.s3key.S } as FileRecord));
  }

  async savePublicFile(file: File): Promise<FileRecord> {
    return await this.saveFile(this.PublicPrefix, file);
  }

  async saveUploadFile(file: File): Promise<FileRecord> {
    return await this.saveFile(this.UploadsPrefix, file);
  }

  private async saveFile(prefix: string, file: File): Promise<FileRecord> {
    const s3key: S3Key = (await Storage.put(file.name, file, {
      level: 'public',
      customPrefix: { public: prefix },
    })) as S3Key;
    const params = {
      TableName: this.TableName,
      Item: {
        name: { S: file.name },
        s3key: { S: prefix + s3key.key },
      },
    };
    await this.ddb.send(new PutItemCommand(params));
    return { name: file.name, s3key: s3key.key } as FileRecord;
  }

  async getFileUrl(key: string): Promise<string> {
    return (await Storage.get(key, { level: 'public', customPrefix: { public: '' } })).toString();
  }

  async removeFile(fileRecord: FileRecord): Promise<boolean> {
    Storage.remove(fileRecord.s3key, { level: 'public', customPrefix: { public: '' } });
    const params = {
      TableName: this.TableName,
      Key: {
        name: { S: fileRecord.name },
        s3key: { S: fileRecord.s3key },
      },
    };
    const result: DeleteItemCommandOutput = await this.ddb.send(new DeleteItemCommand(params));
    console.log(result);
    return true;
  }
}

// async listFiles(path: string): Promise<S3Object[]> {
//   const data: any = await Storage.list(path, { level: 'public', customPrefix: { public: '' } });
//   return data as S3Object[];
// }

// async putFile(prefix: string, key: string, object: any): Promise<S3Key> {
//   const val = await Storage.put(key, object, { level: 'public', customPrefix: { public: prefix } });
//   return val as S3Key;
// }

// async getPresignedUrl(prefix: string, key: string): Promise<string> {
//   const signedUrl = await Storage.get(key, { level: 'public', customPrefix: { public: prefix } });
//   return signedUrl.toString();
// }

// async removeFile(prefix: string, key: string): Promise<any> {
//   const data: any = Storage.remove(key, { level: 'public', customPrefix: { public: prefix } });
//   return data;
// }
