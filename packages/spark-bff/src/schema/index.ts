import path from 'path';
import { makeSchema } from 'nexus';
import * as common from './common';
import * as queries from './queries';
import * as mutations from './mutations';

const types = {
  ...common,
  ...queries,
  ...mutations,
};

const schema = makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  outputs: {
    schema: path.resolve(
      __dirname,
      '../../../spark-graphql-schema/schema.graphql',
    ),
    typegen: path.resolve(__dirname, '../generated/nexusTypes.ts'),
  },
  prettierConfig: path.resolve(__dirname, '../../../../.prettierrc.json'),
  nonNullDefaults: { output: true, input: true },
  contextType: {
    module: path.resolve(__dirname, '../types.ts'), // path.resolve is needed here to only make the path, not to load the file before generate:schema has built it
    export: 'ContextType',
  },
});

export default schema;
