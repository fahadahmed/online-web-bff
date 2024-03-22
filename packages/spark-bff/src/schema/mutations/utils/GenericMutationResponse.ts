import { interfaceType } from 'nexus';

export const GenericMutationResponse = interfaceType({
  name: 'GenericMutationResponse',
  description: 'Generic mutation response',
  definition(t) {
    t.boolean('success');
    t.string('message');
    t.int('code');
  },
  resolveType() {
    return null;
  },
});
