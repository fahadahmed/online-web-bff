import { objectType } from 'nexus';

export const A2PStatusResponse = objectType({
  name: 'A2PStatusResponse',
  description: 'Response with status',
  definition(t) {
    t.boolean('status', { description: 'Status' });
    t.implements('GenericMutationResponse');
  },
});
