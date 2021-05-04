import { S3Service, S3Key, S3Object } from './s3';
import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { listFileRecords } from '../graphql/queries';
import { createFileRecord } from '../graphql/mutations';
import {
  ListFileRecordsQuery,
  ModelFileRecordFilterInput,
  CreateFileRecordInput,
  CreateFileRecordMutation,
} from '../graphql/api';
import { FileRecord } from '../models';

export const FileService = {
  listPublicFiles: async function (): Promise<FileRecord[]> {
    let filter: ModelFileRecordFilterInput = {
      s3key: {
        beginsWith: 'public/',
      },
    };
    const apiData = (await API.graphql({
      query: listFileRecords,
      variables: { filter },
    })) as GraphQLResult<ListFileRecordsQuery>;
    return apiData.data?.listFileRecords?.items;
  },
  listUploadedFiles: async function (): Promise<FileRecord[]> {
    let filter: ModelFileRecordFilterInput = {
      s3key: {
        beginsWith: 'uploads/',
      },
    };
    const apiData = (await API.graphql({
      query: listFileRecords,
      variables: { filter },
    })) as GraphQLResult<ListFileRecordsQuery>;
    return apiData.data?.listFileRecords?.items;
  },
  addPublicFile: async function (file: File): Promise<FileRecord> {
    const key: S3Key = await S3Service.putFilePublic(file.name, file);
    let input: CreateFileRecordInput = {
      name: file.name,
      s3key: key.key,
    };
    const newFile = (await API.graphql({
      query: createFileRecord,
      variables: { input },
    })) as GraphQLResult<CreateFileRecordMutation>;
    return newFile.data?.createFileRecord;
  },
  uploadFile: async function (file: File): Promise<FileRecord> {
    const key: S3Key = await S3Service.putFileUpload(file.name, file);
    let input: CreateFileRecordInput = {
      name: file.name,
      s3key: key.key,
    };
    const newFile = (await API.graphql({
      query: createFileRecord,
      variables: { input },
    })) as GraphQLResult<CreateFileRecordMutation>;
    return newFile.data?.createFileRecord;
  },
};
