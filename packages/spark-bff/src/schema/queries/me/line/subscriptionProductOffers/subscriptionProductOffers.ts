import { extendType, objectType, stringArg, nullable } from 'nexus';
import { BaseOfferDetail, Notifications } from '../../../products';

export const SubscriptionProductOffers = objectType({
  name: 'SubscriptionProductOffers',
  definition(t) {
    t.list.field('offerDetails', {
      type: BaseOfferDetail,
      description:
        'Returns eligible subscription offers from BlueMarble for a given line.',
    });
    t.nullable.list.field('notifications', {
      type: Notifications,
      description: 'Array of notifications to be presented to frontend.',
    });
  },
});

export const SubscriptionProductOffersArgs = {
  productInstanceId: nullable(stringArg()),
};

export const SubscriptionProductOffersQuery = extendType({
  type: 'Line',
  definition(t) {
    t.field('subscriptionProductOffers', {
      type: SubscriptionProductOffers,
      args: SubscriptionProductOffersArgs,
      description:
        'Returns eligible subscription offers from BlueMarble for a given line.',
      resolve(
        { lineNumber },
        { productInstanceId },
        { dataSources: { productOffersAPI } },
      ) {
        return productOffersAPI.getSubscriptionProductOffers(
          lineNumber,
          productInstanceId,
        );
      },
    });
  },
});
