import { inputObjectType, mutationField } from 'nexus';
import { ContextType } from 'types';
import { A2PStatusResponse } from '../shared/statusResponse';

export const A2PModifyContentProviderRequest = inputObjectType({
  name: 'A2PModifyContentProviderRequest',
  description: 'Request to modify a content provider for a given customer',
  definition(t) {
    t.string('customerNumber', { description: 'Customer number' });
    t.int('contentProviderId', { description: 'Content provider Id' });
    t.string('contentProviderName', { description: 'Content provider name' });
    t.nullable.string('helpdeskEmail', { description: 'Helpdesk email' });
    t.nullable.string('phoneNumber', { description: 'Phone number' });
    t.nullable.string('customerCareUrl', { description: 'Customer case url' });
  },
});

export const a2pModifyContentProvider = mutationField(
  'a2pModifyContentProvider',
  {
    type: A2PStatusResponse,
    description: 'Modify a content provider for a given customer',
    args: {
      input: A2PModifyContentProviderRequest,
    },
    resolve(_, { input }, { dataSources: { a2pCustomerAPI } }: ContextType) {
      return a2pCustomerAPI.modifyContentProvider(input);
    },
  },
);
