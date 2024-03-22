import {
  enumType,
  list,
  objectType,
  queryField,
  nullable,
  stringArg,
} from 'nexus';
import { definitions } from 'generated/typings/productDetailServiceV2';

type SubscriptionOfferCtaTypeEnum =
  definitions['Subscription']['ctas'][0]['type'];

const SubscriptionOfferCtaTypeMembers: SubscriptionOfferCtaTypeEnum[] = ['ADD'];
export const SubscriptionOfferCtaType = enumType({
  name: 'SubscriptionOfferCtaType',
  members: SubscriptionOfferCtaTypeMembers,
});

export const SubscriptionOfferCta = objectType({
  name: 'SubscriptionOfferCta',
  description: 'The available call to actions.',
  definition(t) {
    t.field('ctaType', {
      type: SubscriptionOfferCtaType,
    });
    t.string('label', {
      description: 'The formatted label of the Call to Action.',
    });
  },
});

export const SubscriptionOffer = objectType({
  name: 'SubscriptionOffer',
  description: 'subscription details.',
  definition(t) {
    t.string('name', {
      description: 'The title of subscription.',
    });
    t.list.field('offerDetails', {
      type: 'BaseOfferDetail',
      description: 'List of OfferDetail objects',
    });
    t.nullable.list.string('lineNumbers', {
      description: 'The lines that the product offer is eligible for.',
    });
    t.nullable.list.string('accountNumbers', {
      description: 'The accounts that the product offer is eligible for.',
    });
    t.nullable.list.field('ctas', {
      type: SubscriptionOfferCta,
      description: 'The Call to Action displayed to user.',
    });
  },
});

export const SubscriptionOffersArgs = {
  groupId: nullable(stringArg()),
};

export const SubscriptionOffersQuery = queryField('subscriptionOffers', {
  type: list(SubscriptionOffer),
  args: SubscriptionOffersArgs,
  description:
    'Retrieves the compatible grouped subscriptions products for the logged in user (includes all accounts and lines).',
  resolve(_, args, { dataSources: { productOffersAPI } }) {
    return productOffersAPI.getSubscriptionOffers(args);
  },
});
