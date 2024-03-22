import isEmpty from 'lodash/isEmpty';
import { objectType, stringArg, queryField, list } from 'nexus';

export const MpdPromotionsArgs = {
  offerIds: list(stringArg()),
};

export const Discount = objectType({
  name: 'Discount',
  description: 'Discount related information for selected multi product',
  definition(t) {
    t.float('appliedValue');
    t.string('discountCategory');
    t.float('discountedValue');
  },
});

export const MpdPromotionsPrice = objectType({
  name: 'MpdPromotionsPrice',
  description: 'Price related information for selected multi product',
  definition(t) {
    t.float('basePrice');
    t.float('effectivePrice');
    t.nullable.field('discount', { type: Discount });
  },
});

export const MpdPromotionsBundleItem = objectType({
  name: 'MpdPromotionsBundleItem',
  description: 'Bundle Item related information for slected multi product',
  definition(t) {
    t.string('id');
    t.list.field('price', { type: MpdPromotionsPrice });
    t.string('productOfferingId');
  },
});

export const MpdPromotionsBundle = objectType({
  name: 'MpdPromotionsBundle',
  description: 'Bundle related information for slected multi product',
  definition(t) {
    t.string('id');
    t.list.field('items', { type: MpdPromotionsBundleItem });
  },
});

export const MpdPromotionsResponse = objectType({
  name: 'MpdPromotionsResponse',
  definition(t) {
    t.list.field('price', {
      type: MpdPromotionsPrice,
    });
    t.list.field('bundles', { type: MpdPromotionsBundle });
  },
});

export const MpdPromotions = queryField('mpdPromotions', {
  type: MpdPromotionsResponse,
  args: MpdPromotionsArgs,
  description:
    'Gets the list of discounts related to the currently selected multi products',
  async resolve(_, { offerIds }, { dataSources: { productPromotionsMPDAPI } }) {
    if (isEmpty(offerIds)) {
      return {
        price: [],
        bundles: [],
      };
    }

    return productPromotionsMPDAPI.getProductPromotionsMPD(offerIds);
  },
});
