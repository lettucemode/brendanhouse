import { Storage } from 'aws-amplify';

export interface S3Key {
  key: string;
}

export interface S3Object {
  eTag: string;
  key: string;
  lastModified: string;
  size: number;
}

export const S3Service = {
  putFileUpload: async function (key: string, object: any): Promise<S3Key> {
    const val = await Storage.put(key, object, { level: 'public', customPrefix: { public: 'uploads/' } });
    return val as S3Key;
  },
  putFilePublic: async function (key: string, object: any): Promise<S3Key> {
    const val = await Storage.put(key, object);
    return val as S3Key;
  },
  getPresignedUrl: async function (key: string): Promise<string> {
    const signedUrl = await Storage.get(key);
    return signedUrl.toString();
  },
  listFiles: async function (path: string): Promise<S3Object[]> {
    const data: any = await Storage.list(path, { level: 'public', customPrefix: { public: '' } });
    return data as S3Object[];
  },
  removeFile: async function (key: string): Promise<any> {
    const data: any = Storage.remove(key);
    return data;
  },
};
