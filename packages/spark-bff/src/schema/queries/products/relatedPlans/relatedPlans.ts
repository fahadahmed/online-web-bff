import { objectType, queryField } from 'nexus';
import {
  CompatibleProductsInput,
  Entitlement,
  Image,
  OfferDetailCategory,
  Price,
  Promotion,
  ProductCharacteristic,
} from '../products';

export const PlanOfferDetail = objectType({
  name: 'PlanOfferDetail',
  description: 'Offer detail related information',
  definition(t) {
    t.string('id');
    t.string('name');
    t.nullable.string('description');
    t.nullable.list.field('images', {
      type: Image,
    });
    t.nullable.list.field('category', {
      type: OfferDetailCategory,
    });
    t.nullable.field('price', {
      type: Price,
    });
    t.nullable.list.field('entitlements', {
      type: Entitlement,
    });
    t.nullable.list.field('promotions', {
      type: Promotion,
    });
    t.nullable.field('productCharacteristics', {
      type: ProductCharacteristic,
    });
  },
});

export const RelatedPlansResponseBundle = objectType({
  name: 'RelatedPlansResponseBundle',
  description: 'Bundle related information',
  definition(t) {
    t.string('id');
    t.list.field('offerDetails', {
      type: PlanOfferDetail,
    });
  },
});

export const RelatedPlansResponse = objectType({
  name: 'RelatedPlansResponse',
  definition(t) {
    t.list.field('bundles', {
      type: RelatedPlansResponseBundle,
    });
  },
});

export const RelatedPlans = queryField('relatedPlans', {
  type: RelatedPlansResponse,
  args: { input: CompatibleProductsInput },
  description: 'Related Plans',
  async resolve(_, { input }, { dataSources: { productOffersAPI } }) {
    return productOffersAPI.getRelatedPlans(input);
  },
});
