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

const S3Service = {
  putFileUpload: function (key: string, object: any): Promise<S3Key> {
    return Storage.put(key, object, { level: 'public', customPrefix: { public: 'uploads/' } }).then(
      (val: Object) => val as S3Key
    );
  },
  putFilePublic: function (key: string, object: any): Promise<S3Key> {
    return Storage.put(key, object).then((val: Object) => val as S3Key);
  },
  getPresignedUrl: function (key: string): Promise<string> {
    return Storage.get(key).then((signedUrl: Object | string) => {
      return signedUrl.toString();
    });
  },
  listFiles: function (path: string): Promise<S3Object[]> {
    return Storage.list(path, { level: 'public', customPrefix: { public: '' } });
  },
  removeFile: function (key: string): Promise<any> {
    return Storage.remove(key);
  },
};

export default S3Service;
