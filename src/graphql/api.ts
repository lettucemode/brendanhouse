/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFileInput = {
  id?: string | null,
  name: string,
  s3key: string,
};

export type ModelFileConditionInput = {
  name?: ModelStringInput | null,
  s3key?: ModelStringInput | null,
  and?: Array< ModelFileConditionInput | null > | null,
  or?: Array< ModelFileConditionInput | null > | null,
  not?: ModelFileConditionInput | null,
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

export type File = {
  __typename: "File",
  id?: string,
  name?: string,
  s3key?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateFileInput = {
  id: string,
  name?: string | null,
  s3key?: string | null,
};

export type DeleteFileInput = {
  id?: string | null,
};

export type ModelFileFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  s3key?: ModelStringInput | null,
  and?: Array< ModelFileFilterInput | null > | null,
  or?: Array< ModelFileFilterInput | null > | null,
  not?: ModelFileFilterInput | null,
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

export type ModelFileConnection = {
  __typename: "ModelFileConnection",
  items?:  Array<File | null > | null,
  nextToken?: string | null,
};

export type CreateFileMutationVariables = {
  input?: CreateFileInput,
  condition?: ModelFileConditionInput | null,
};

export type CreateFileMutation = {
  createFile?:  {
    __typename: "File",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFileMutationVariables = {
  input?: UpdateFileInput,
  condition?: ModelFileConditionInput | null,
};

export type UpdateFileMutation = {
  updateFile?:  {
    __typename: "File",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFileMutationVariables = {
  input?: DeleteFileInput,
  condition?: ModelFileConditionInput | null,
};

export type DeleteFileMutation = {
  deleteFile?:  {
    __typename: "File",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetFileQueryVariables = {
  id?: string,
};

export type GetFileQuery = {
  getFile?:  {
    __typename: "File",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFilesQueryVariables = {
  filter?: ModelFileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFilesQuery = {
  listFiles?:  {
    __typename: "ModelFileConnection",
    items?:  Array< {
      __typename: "File",
      id: string,
      name: string,
      s3key: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateFileSubscription = {
  onCreateFile?:  {
    __typename: "File",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFileSubscription = {
  onUpdateFile?:  {
    __typename: "File",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFileSubscription = {
  onDeleteFile?:  {
    __typename: "File",
    id: string,
    name: string,
    s3key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
