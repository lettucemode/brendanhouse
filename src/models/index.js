// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FileRecord } = initSchema(schema);

export {
  FileRecord
};