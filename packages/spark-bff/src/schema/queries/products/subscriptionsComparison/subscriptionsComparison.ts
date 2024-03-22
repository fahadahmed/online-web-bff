import { enumType, objectType, queryField, stringArg } from 'nexus';
import { definitions } from 'generated/typings/productDetailServiceV2';
import { CartChannel } from '../../../common';
import { resolveSubscriptionsComparison } from './subscriptionsComparison.resolver';

export const SubscriptionsComparisonOfferPrice = objectType({
  name: 'SubscriptionsComparisonOfferPrice',
  definition(t) {
    t.nullable.float('basePrice');
    t.nullable.string('description');
    t.nullable.field('frequencyPeriod', {
      type: 'FrequencyPeriod',
    });
  },
});

export const SubscriptionComparisonOffer = objectType({
  name: 'SubscriptionComparisonOffer',
  definition(t) {
    t.string('offerId');
    t.string('offerName');
    t.nullable.string('brand');
    t.nullable.boolean('isIncluded');
    t.nullable.field('price', { type: SubscriptionsComparisonOfferPrice });
    t.nullable.string('iconUrl');
  },
});

type SubscriptionComparisonCTA =
  definitions['SubscriptionsComparisonResponse']['comparisons'][0]['ctas'][0]['type'];

const ctas: SubscriptionComparisonCTA[] = ['INFORM', 'KEEP', 'CANCEL'];

export const SubscriptionComparisonCTAType = enumType({
  name: 'SubscriptionComparisonCTAType',
  members: ctas,
});

export const SubscriptionsComparisonCtas = objectType({
  name: 'SubscriptionsComparisonCtas',
  definition(t) {
    t.field('type', { type: SubscriptionComparisonCTAType });
  },
});

export const SubscriptionsComparisonsWithOfferDetails = objectType({
  name: 'SubscriptionsComparisons',
  definition(t) {
    t.string('recommendationId');
    t.nullable.field('available', {
      type: SubscriptionComparisonOffer,
    });
    t.nullable.field('unavailable', {
      type: SubscriptionComparisonOffer,
    });
    t.nullable.list.field('ctas', { type: SubscriptionsComparisonCtas });
  },
});

export const SubscriptionsComparisonWithOfferDetailsResponse = objectType({
  name: 'SubscriptionsComparisonWithOfferDetailsResponse',
  definition(t) {
    t.list.field('comparisons', {
      type: SubscriptionsComparisonsWithOfferDetails,
    });
  },
});

export const SubscriptionsComparisonArgs = {
  cartId: stringArg(),
  bundleId: stringArg(),
  channel: CartChannel,
};

export const SubscriptionsComparisonQuery = queryField(
  'subscriptionsComparison',
  {
    type: SubscriptionsComparisonWithOfferDetailsResponse,
    args: SubscriptionsComparisonArgs,
    description:
      'Retrieves the Subscription changes between two plans within a cart, as part of a self service change plan/pack scenario.',
    resolve: resolveSubscriptionsComparison,
  },
);
