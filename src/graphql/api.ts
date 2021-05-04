/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFileRecordInput = {
  id?: string | null,
  name: string,
  s3key: string,
};

export type ModelFileRecordConditionInput = {
  name?: ModelStringInput | null,
  s3key?: ModelStringInput | null,
  and?: Array< ModelFileRecordConditionInput | null > | null,
  or?: Array< ModelFileRecordConditionInput | null > | null,
  not?: ModelFileRecordConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type FileRecord = {
  __typename: "FileRecord",
  id?: string,
  name?: string,
  s3key?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateFileRecordInput = {
  id: string,
  name?: string | null,
  s3key?: string | null,
};

export type DeleteFileRecordInput = {
  id?: string | null,
};

export type ModelFileRecordFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  s3key?: ModelStringInput | null,
  and?: Array< ModelFileRecordFilterInput | null > | null,
  or?: Array< ModelFileRecordFilterInput | null > | null,
  not?: ModelFileRecordFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelFileRecordConnection = {
  __typename: "ModelFileRecordConnection",
  items?:  Array<FileRecord | null > | null,
  nextToken?: string | null,
};

export type CreateFileRecordMutationVariables = {
  input?: CreateFileRecordInput,
  condition?: ModelFileRecordConditionInput | null,
};

export type CreateFileRecordMutation = {
  createFileRecord?:  {
    __typename: "FileRecord",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFileRecordMutationVariables = {
  input?: UpdateFileRecordInput,
  condition?: ModelFileRecordConditionInput | null,
};

export type UpdateFileRecordMutation = {
  updateFileRecord?:  {
    __typename: "FileRecord",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFileRecordMutationVariables = {
  input?: DeleteFileRecordInput,
  condition?: ModelFileRecordConditionInput | null,
};

export type DeleteFileRecordMutation = {
  deleteFileRecord?:  {
    __typename: "FileRecord",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetFileRecordQueryVariables = {
  id?: string,
};

export type GetFileRecordQuery = {
  getFileRecord?:  {
    __typename: "FileRecord",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFileRecordsQueryVariables = {
  filter?: ModelFileRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFileRecordsQuery = {
  listFileRecords?:  {
    __typename: "ModelFileRecordConnection",
    items?:  Array< {
      __typename: "FileRecord",
      id: string,
      name: string,
      s3key: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateFileRecordSubscription = {
  onCreateFileRecord?:  {
    __typename: "FileRecord",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFileRecordSubscription = {
  onUpdateFileRecord?:  {
    __typename: "FileRecord",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFileRecordSubscription = {
  onDeleteFileRecord?:  {
    __typename: "FileRecord",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
