import { nullable, objectType, queryField, stringArg } from 'nexus';

export const ServiceProvider = objectType({
  name: 'ServiceProvider',
  description:
    'The service provider of a specific phone number e.g. 2 Degrees or Vodafone',
  definition(t) {
    t.string('serviceProviderId');
    t.string('name');
  },
});

export const serviceProviderQuery = queryField('serviceProvider', {
  type: nullable(ServiceProvider),
  args: { lineNumber: stringArg() },
  async resolve(_, { lineNumber }, { dataSources: { networkSettingsAPI } }) {
    return networkSettingsAPI.getServiceProvider(lineNumber);
  },
});
