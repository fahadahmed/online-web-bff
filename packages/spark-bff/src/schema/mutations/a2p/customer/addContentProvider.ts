import { inputObjectType, mutationField, objectType } from 'nexus';
import { ContextType } from 'types';

export const A2PAddContentProviderRequest = inputObjectType({
  name: 'A2PAddContentProviderRequest',
  description: 'Request to create a new Content Provider for a given customer',
  definition(t) {
    t.string('customerNumber', { description: 'Customer number' });
    t.string('contentProviderName', { description: 'Content provider name' });
    t.nullable.string('helpdeskEmail', { description: 'Helpdesk email' });
    t.nullable.string('phoneNumber', { description: 'Phone number' });
    t.nullable.string('customerCareUrl', { description: 'Customer case url' });
  },
});

export const A2PAddContentProviderResponse = objectType({
  name: 'A2PAddContentProviderResponse',
  description: 'Response to create a new Content Provider for a given customer',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.string('contentProviderId');
  },
});

export const a2pAddContentProvider = mutationField('a2pAddContentProvider', {
  type: A2PAddContentProviderResponse,
  description: 'Create a new content provider for a given customer',
  args: {
    input: A2PAddContentProviderRequest,
  },
  resolve(_, { input }, { dataSources: { a2pCustomerAPI } }: ContextType) {
    return a2pCustomerAPI.addContentProvider(input);
  },
});
