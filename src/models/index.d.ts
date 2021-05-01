import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class File {
  readonly id: string;
  readonly name: string;
  readonly s3key: string;
  constructor(init: ModelInit<File>);
  static copyOf(source: File, mutator: (draft: MutableModel<File>) => MutableModel<File> | void): File;
}