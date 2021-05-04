/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFileRecord = /* GraphQL */ `
  query GetFileRecord($id: ID!) {
    getFileRecord(id: $id) {
      id
      name
      s3key
      createdAt
      updatedAt
    }
  }
`;
export const listFileRecords = /* GraphQL */ `
  query ListFileRecords(
    $filter: ModelFileRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFileRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        s3key
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
