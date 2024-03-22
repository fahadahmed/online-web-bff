import { enumType, extendType, objectType } from 'nexus';
import { ContextType } from 'types';

export const A2PCustomerContentProviderCTA = enumType({
  name: 'A2PCustomerContentProviderCTA',
  members: ['EDIT', 'DELETE'],
  description: 'Content provider CTA',
});

export const A2PCustomerContentProvider = objectType({
  name: 'A2PCustomerContentProvider',
  description: 'Return all Content Providers for a given Customer',
  definition(t) {
    t.string('customerNumber', {
      description: 'Customer number',
    });
    t.string('customerName', {
      description: 'Customer name',
    });
    t.int('contentProviderId', {
      description: 'Content provider id',
    });
    t.string('contentProviderName', {
      description: 'Content provider name',
    });
    t.nullable.string('helpdeskEmail', {
      description: 'Helpdesk email',
    });
    t.nullable.string('phoneNumber', {
      description: 'Phone number',
    });
    t.nullable.string('customerCareUrl', {
      description: 'Customer care url',
    });
    t.list.field('ctas', {
      type: A2PCustomerContentProviderCTA,
    });
  },
});

export const A2PCustomerContentProviderQuery = extendType({
  type: 'A2POrganisationDetails',
  definition(t) {
    t.list.field('contentProviders', {
      type: A2PCustomerContentProvider,
      resolve(
        { customerNumber },
        __,
        { dataSources: { a2pCustomerAPI } }: ContextType,
      ) {
        return a2pCustomerAPI.getContentProviders(customerNumber);
      },
    });
  },
});
