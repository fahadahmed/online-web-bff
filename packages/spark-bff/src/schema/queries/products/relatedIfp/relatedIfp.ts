import { inputObjectType, list, objectType, queryField } from 'nexus';
import { Promotion } from '../products';

export const IfpOfferDetail = objectType({
  name: 'IfpOfferDetail',
  description: 'Offer detail object for IFP products',
  definition(t) {
    t.string('id');
    t.string('name');
    t.nullable.string('description');
    t.nullable.list.field('promotions', {
      type: Promotion,
    });
  },
});

export const RelatedProductBundleItemInput = inputObjectType({
  name: 'RelatedProductBundleItemInput',
  definition(t) {
    t.string('id');
  },
});

export const RelatedProductBundleInput = inputObjectType({
  name: 'RelatedProductBundleInput',
  definition(t) {
    t.string('id');
    t.list.field('items', { type: RelatedProductBundleItemInput });
  },
});

export const RelatedProductInput = inputObjectType({
  name: 'RelatedProductInput',
  description: 'Query inputs to be passed into DESL POST request body.',
  definition(t) {
    t.nullable.string('cartId');
    t.list.field('bundles', { type: RelatedProductBundleInput });
  },
});

export const RelatedIfp = queryField('relatedIfp', {
  type: list(IfpOfferDetail),
  args: { input: RelatedProductInput },
  description:
    'Fetching a list of eligible/related ifp products of the given products in cart(simulated/real cart)',
  async resolve(_, { input }, { dataSources: { productOffersAPI } }) {
    return productOffersAPI.getRelatedIfp(input);
  },
});
