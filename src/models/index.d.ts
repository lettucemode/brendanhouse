import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class FileRecord {
  readonly id: string;
  readonly name: string;
  readonly s3key: string;
  constructor(init: ModelInit<FileRecord>);
  static copyOf(source: FileRecord, mutator: (draft: MutableModel<FileRecord>) => MutableModel<FileRecord> | void): FileRecord;
}