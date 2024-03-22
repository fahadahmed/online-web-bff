import {
  booleanArg,
  list,
  objectType,
  stringArg,
  nullable,
  queryField,
} from 'nexus';
import { BaseOfferDetail } from '../products';

const ProductOfferDetailsResponse = objectType({
  name: 'ProductOfferDetailsResponse',
  definition(t) {
    t.list.field('offerDetails', {
      type: BaseOfferDetail,
      description:
        'Returns eligible subscription offers from BlueMarble for a given line.',
    });
  },
});

export const ProductOfferDetailsArgs = {
  offerIds: nullable(list(stringArg())),
  externalIds: nullable(list(stringArg())),
  includePriceRules: nullable(booleanArg()),
};

export const ProductOfferDetailsQuery = queryField('productOfferDetails', {
  type: ProductOfferDetailsResponse,
  args: ProductOfferDetailsArgs,
  description:
    'Retrieves product offer details from Blue Marble based on offerIds or externalId.',
  resolve(
    _,
    { offerIds, externalIds, includePriceRules },
    { dataSources: { productOffersAPI } },
  ) {
    return productOffersAPI.getProductOffersByOfferIds(
      offerIds,
      externalIds,
      includePriceRules,
    );
  },
});
