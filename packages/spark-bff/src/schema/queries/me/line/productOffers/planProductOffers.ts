import { extendType, list, objectType, stringArg, nullable } from 'nexus';
import { BaseOfferDetail, Notifications } from '../../../products';

const PlanProductOffers = objectType({
  name: 'PlanProductOffers',
  definition(t) {
    t.field('offerDetails', {
      type: list(BaseOfferDetail),
      description:
        'Returns eligible subscription offers from BlueMarble for a given line.',
    });
    t.nullable.list.field('notifications', {
      type: Notifications,
      description: 'Array of notifications to be presented to frontend.',
    });
  },
});

export const PlanProductOffersArgs = {
  packInstanceId: nullable(stringArg()),
};

export const PlanProductOffersQuery = extendType({
  type: 'Line',
  definition(t) {
    t.field('planProductOffers', {
      type: PlanProductOffers,
      args: PlanProductOffersArgs,
      description: 'Retrieve eligible plans or packs for Line Number.',
      resolve(
        { lineNumber },
        { packInstanceId },
        { dataSources: { productOffersAPI } },
      ) {
        return productOffersAPI.getEligiblePlansByLineNumber(
          lineNumber,
          packInstanceId,
        );
      },
    });
  },
});
