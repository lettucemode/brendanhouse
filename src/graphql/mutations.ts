/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFileRecord = /* GraphQL */ `
  mutation CreateFileRecord(
    $input: CreateFileRecordInput!
    $condition: ModelFileRecordConditionInput
  ) {
    createFileRecord(input: $input, condition: $condition) {
      id
      name
      s3key
      createdAt
      updatedAt
    }
  }
`;
export const updateFileRecord = /* GraphQL */ `
  mutation UpdateFileRecord(
    $input: UpdateFileRecordInput!
    $condition: ModelFileRecordConditionInput
  ) {
    updateFileRecord(input: $input, condition: $condition) {
      id
      name
      s3key
      createdAt
      updatedAt
    }
  }
`;
export const deleteFileRecord = /* GraphQL */ `
  mutation DeleteFileRecord(
    $input: DeleteFileRecordInput!
    $condition: ModelFileRecordConditionInput
  ) {
    deleteFileRecord(input: $input, condition: $condition) {
      id
      name
      s3key
      createdAt
      updatedAt
    }
  }
`;
