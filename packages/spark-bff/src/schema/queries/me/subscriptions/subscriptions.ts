import { extendType, objectType } from 'nexus';
import { LineSubscriptionStatus } from '../line';

const LineSubscriptionsOffer = objectType({
  name: 'LineSubscriptionsOffer',
  definition(t) {
    t.string('offerId', {
      description:
        'The BlueMarble unique identifier of the subscription component.	',
    });
    t.string('name', {
      description: 'The BlueMarble offer name of the subscription component.',
    });
    t.string('productInstanceId', {
      description: 'The Siebel product instance id of the offer.',
    });
  },
});

const LineSubscriptionsBundleOffer = objectType({
  name: 'LineSubscriptionsBundleOffer',
  definition(t) {
    t.string('bundleOfferId', {
      description: 'The BlueMarble unique identifier of the bundle.',
    });
    t.nullable.string('name', {
      description: 'The BlueMarble offer name of the bundle.',
    });
    t.string('productInstanceId', {
      description: 'The Siebel product instance id of the bundle.',
    });
  },
});

const LineSubscriptionsStatus = objectType({
  name: 'LineSubscriptionsStatus',
  definition(t) {
    t.field('type', {
      type: LineSubscriptionStatus,
      description: 'The status of the subscription.',
    });
    t.nullable.string('label', {
      description: 'The label of the subscription.',
    });
  },
});

export const LineSubscriptions = objectType({
  name: 'LineSubscriptions',
  definition(t) {
    t.field('offer', {
      type: LineSubscriptionsOffer,
    });
    t.nullable.field('bundleOffer', {
      type: LineSubscriptionsBundleOffer,
    });
    t.string('assetStartDate', {
      description: 'The date-time the asset was initially active in Siebel.	',
    });
    t.string('accountNumber', {
      description:
        'The Siebel account number of which the Subscription product is associated with.',
    });
    t.string('lineNumber', {
      description:
        'The Siebel line number of which the Subscription product is associated to.',
    });
    t.field('status', {
      type: LineSubscriptionsStatus,
      description: 'The status of the subscription',
    });
  },
});

export const LineSubscriptionsQuery = extendType({
  type: 'User',
  definition(t) {
    t.list.field('subscriptions', {
      type: LineSubscriptions,
      description: 'Query all the eligble subscriptions for the current user.',
      resolve(_, __, { dataSources: { lineSubscriptionsServiceAPI } }) {
        return lineSubscriptionsServiceAPI.getAllEligibleSubscriptions();
      },
    });
  },
});
