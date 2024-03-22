import { objectType, queryField, stringArg } from 'nexus';
import { CartChannel } from '../../../common';

export const PlansMpdComparisonDiscount = objectType({
  name: 'PlansMpdComparisonDiscount',
  definition(t) {
    t.nullable.string('discountType');
    t.nullable.float('appliedValue');
  },
});

export const PlansMpdComparisonPrice = objectType({
  name: 'PlansMpdComparisonPrice',
  definition(t) {
    t.string('priceType');
    t.string('period');
    t.float('basePrice');
    t.float('effectivePrice');
    t.nullable.field('discount', { type: PlansMpdComparisonDiscount });
  },
});

export const PlansMpdComparisonItem = objectType({
  name: 'PlansMpdComparisonItem',
  definition(t) {
    t.string('productOfferingId');
    t.string('name');
    t.nullable.field('price', { type: PlansMpdComparisonPrice });
    t.string('action');
  },
});

export const PlansMpdComparisonBundle = objectType({
  name: 'PlansMpdComparisonBundle',
  definition(t) {
    t.nullable.string('lineNumber');
    t.string('id');
    t.list.field('items', { type: PlansMpdComparisonItem });
  },
});

export const PlansMpdComparisonExistingPlan = objectType({
  name: 'PlansMpdComparisonExistingPlan',
  definition(t) {
    t.string('productOfferingId');
    t.string('name');
    t.field('currentPrice', { type: PlansMpdComparisonPrice });
    t.field('updatedPrice', { type: PlansMpdComparisonPrice });
  },
});

export const PlansMpdComparisonResponse = objectType({
  name: 'PlansMpdComparisonResponse',
  definition(t) {
    t.string('cartId');
    t.nullable.list.field('bundles', { type: PlansMpdComparisonBundle });
    t.nullable.list.field('existingPlans', {
      type: PlansMpdComparisonExistingPlan,
    });
    t.boolean('discountChanged');
  },
});

export const PlansMpdComparisonArgs = {
  cartId: stringArg(),
  channel: CartChannel,
};

export const PlansMpdComparisonQuery = queryField('plansMpdComparison', {
  type: PlansMpdComparisonResponse,
  args: PlansMpdComparisonArgs,
  description:
    'Determines the MPD changes between two plans within a cart, as part of a self service change plan/pack scenario.',
  resolve(_, args, { dataSources: { productOffersAPI } }) {
    return productOffersAPI.getPlansMpdComparison(args);
  },
});
