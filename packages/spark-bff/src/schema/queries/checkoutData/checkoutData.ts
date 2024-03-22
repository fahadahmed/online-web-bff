import { objectType, queryField, inputObjectType } from 'nexus';
import { CartChannel } from '../../common';

export const CheckoutDataFieldEntry = objectType({
  name: 'CheckoutDataFieldEntry',
  definition(t) {
    t.string('name');
    t.nullable.string('value');
  },
});

export const CheckoutDataStep = objectType({
  name: 'CheckoutDataStep',
  definition(t) {
    t.string('stepId');
    t.nullable.string('offerContainerId');
    t.string('stepPath');
    t.list.field('entries', { type: CheckoutDataFieldEntry });
  },
});

export const CheckoutDataSection = objectType({
  name: 'CheckoutDataSection',
  definition(t) {
    t.string('sectionId');
    t.list.field('steps', { type: CheckoutDataStep });
  },
});

export const CheckoutDataResponse = objectType({
  name: 'CheckoutDataResponse',
  definition(t) {
    t.id('id');
    t.list.field('sections', { type: CheckoutDataSection });
  },
});

export const CheckoutDataInput = inputObjectType({
  name: 'CheckoutDataInput',
  definition(t) {
    t.string('cartId');
    t.field('channel', {
      type: CartChannel,
    });
  },
});

export const checkoutData = queryField('checkoutData', {
  type: CheckoutDataResponse,
  args: { input: CheckoutDataInput },
  description: 'Gets the saved checkout form state',
  async resolve(_, { input }, { dataSources: { checkoutAPI } }) {
    return checkoutAPI.getCheckoutData(input);
  },
});
