import { inputObjectType, mutationField } from 'nexus';
import { ContextType } from 'types';
import { A2PStatusResponse } from '../shared/statusResponse';

export const A2PDeleteContentProviderRequest = inputObjectType({
  name: 'A2PDeleteContentProviderRequest',
  description: 'Request to delete a content provider for a given customer',
  definition(t) {
    t.string('customerNumber', { description: 'Customer number' });
    t.int('contentProviderId', { description: 'Content provider Id' });
  },
});

export const a2pDeleteContentProvider = mutationField(
  'a2pDeleteContentProvider',
  {
    type: A2PStatusResponse,
    description: 'Delete a content provider for a given customer',
    args: {
      input: A2PDeleteContentProviderRequest,
    },
    resolve(_, { input }, { dataSources: { a2pCustomerAPI } }: ContextType) {
      return a2pCustomerAPI.deleteContentProvider(input);
    },
  },
);
