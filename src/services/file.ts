import { Storage } from "aws-amplify";

export interface S3File {
  s3Obj?: any;
  level?: string;
  signedUrl?: string;
}

export interface S3Object extends S3Key {
  eTag: string;
  lastModified: string;
  size: number;
}

export interface S3Key {
  key: string;
}

export class FileService {
  TableName: string = "files-prod";
  PublicPrefix: string = "public/";
  ProectedPrefix: string = "protected/";
  UploadsPrefix: string = "uploads/";

  async listV1UploadFiles(cohort: number): Promise<S3File[]> {
    const data = await Storage.list(`v1/Cohort ${cohort}/`, {
      level: "public",
      customPrefix: {
        public: this.UploadsPrefix,
      },
    });
    return Promise.all(
      data.results.map(async (value) => {
        value.key = value.key.substr(3);
        return {
          s3Obj: value,
          level: "public",
          signedUrl: await Storage.get("v1/" + value.key, {
            level: "public",
            customPrefix: {
              public: this.UploadsPrefix,
            },
          }),
        } as S3File;
      })
    );
  }

  async listUserFiles(): Promise<S3File[]> {
    const data = await Storage.list("", {
      level: "protected",
    });
    return Promise.all(
      data.results.map(async (value) => {
        return {
          s3Obj: value,
          level: "protected",
          signedUrl: await Storage.get(value.key, { level: "protected" }),
        } as S3File;
      })
    );
  }

  async listSiteFiles(): Promise<S3File[]> {
    const data = await Storage.list("site/", {
      level: "public",
    });
    return Promise.all(
      data.results.map(async (value) => {
        return {
          s3Obj: value,
          level: "public",
          signedUrl: await Storage.get(value.key, { level: "public" }),
        } as S3File;
      })
    );
  }

  async saveV1UploadFile(key: string, file: File): Promise<S3Key> {
    const val = await Storage.put("v1/" + key, file, {
      level: "public",
      customPrefix: { public: this.UploadsPrefix },
    });
    return val as S3Key;
  }

  async saveUserFile(key: string, file: File): Promise<S3Key> {
    const val = await Storage.put(key, file, { level: "protected" });
    return val as S3Key;
  }

  async deleteV1UploadFile(key: string): Promise<any> {
    const data: any = await Storage.remove("v1/" + key, {
      level: "public",
      customPrefix: { public: this.UploadsPrefix },
    });
    return data;
  }

  //   async listPublicFiles(): Promise<FileRecord[]> {
  //     return await this.listFiles('', { level: 'public' });
  //   }

  //   async listUploadedFiles(): Promise<FileRecord[]> {
  //     return await this.listFiles(this.UploadsPrefix);
  //   }

  //   async savePublicFile(file: File): Promise<FileRecord> {
  //     return await this.saveFile(this.PublicPrefix, file);
  //   }

  //   async saveUserFile(file: File): Promise<FileRecord> {
  //     return await this.saveFile(this.ProectedPrefix, file);
  //   }

  //   async saveUploadFile(file: File): Promise<FileRecord> {
  //     return await this.saveFile(this.UploadsPrefix, file);
  //   }

  //   private async saveFile(prefix: string, file: File): Promise<FileRecord> {
  //     const s3key: S3Key = (await Storage.put(file.name, file, {
  //       level: 'protected',
  //     })) as S3Key;
  //     const params = {
  //       TableName: this.TableName,
  //       Item: {
  //         name: { S: file.name },
  //         s3key: { S: prefix + s3key.key },
  //       },
  //     };
  //     await this.ddb.send(new PutItemCommand(params));
  //     return { name: file.name, s3key: s3key.key } as FileRecord;
  //   }

  //   async getFileUrl(key: string): Promise<string> {
  //     return (await Storage.get(key, { level: 'public', customPrefix: { public: '' } })).toString();
  //   }

  //   async removeFile(fileRecord: FileRecord): Promise<boolean> {
  //     Storage.remove(fileRecord.s3key, { level: 'public', customPrefix: { public: '' } });
  //     const params = {
  //       TableName: this.TableName,
  //       Key: {
  //         name: { S: fileRecord.name },
  //         s3key: { S: fileRecord.s3key },
  //       },
  //     };
  //     const result: DeleteItemCommandOutput = await this.ddb.send(new DeleteItemCommand(params));
  //     console.log(result);
  //     return true;
  //   }
  // }

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
}
