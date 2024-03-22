import { extendType, objectType, stringArg } from 'nexus';

export const LineSubscriptionActivation = objectType({
  name: 'LineSubscriptionActivation',
  definition(t) {
    t.string('activationUrl', {
      description:
        'The activation url to activate the product at partner site.',
    });
    t.nullable.int('lockTtl', {
      description:
        'The lock duration TTL (Time to Live) in seconds of the subscription type for the given product instance id if configured',
    });
  },
});

export const LineSubscriptionActivationQuery = extendType({
  type: 'Line',
  definition(t) {
    t.field('subscriptionActivation', {
      type: LineSubscriptionActivation,
      args: {
        productInstanceId: stringArg(),
      },
      description:
        'Query the activation url to activate the product at partner site.',
      resolve(
        { lineNumber },
        { productInstanceId },
        { dataSources: { subscriptionActivationAPI } },
      ) {
        return subscriptionActivationAPI.getActivationUrlForLineProduct(
          lineNumber,
          productInstanceId,
        );
      },
    });
  },
});
