// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Group } = initSchema(schema);

export {
  Group
};