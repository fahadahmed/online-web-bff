import { inputObjectType, objectType, mutationField, stringArg } from 'nexus';
import { CartChannel } from '../../common';
import { Cart } from '../../queries/cart';
import { CheckoutDataResponse } from '../../queries/checkoutData';
import { CheckoutStructureQueryResponse } from '../../queries/checkoutStructure';

export const SaveCheckoutStepFieldInput = inputObjectType({
  name: 'SaveCheckoutStepFieldInput',
  definition(t) {
    t.string('name');
    t.string('value');
  },
});

export const SaveCheckoutStepOptionInput = inputObjectType({
  name: 'SaveCheckoutStepOptionInput',
  definition(t) {
    t.string('name');
    t.string('value');
    t.list.field('fields', {
      type: SaveCheckoutStepFieldInput,
    });
    t.nullable.field('parentOption', {
      type: SaveCheckoutStepFieldInput,
    });
  },
});

export const SaveCheckoutStepInput = inputObjectType({
  name: 'SaveCheckoutStepInput',
  description: 'Input for saving the field values of a Checkout step',
  definition(t) {
    t.nullable.string('bundleId');
    t.string('cartId');
    t.field('channel', {
      type: 'CartChannel',
    });
    t.list.field('rootFields', {
      type: SaveCheckoutStepFieldInput,
    });
    t.list.field('options', {
      type: SaveCheckoutStepOptionInput,
    });
    t.nullable.string('itemId');
    t.string('sectionId', {
      description: 'Identifies which section to save to',
    });
    t.string('stepId', {
      description: 'Identifies which step to save to',
    });
  },
});

export const SaveCheckoutStepResponse = objectType({
  name: 'SaveCheckoutStepResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.field('cart', {
      type: Cart,
      args: {
        cartId: stringArg(),
        channel: CartChannel,
      },
      resolve(_, args, { dataSources: { cartAPI } }) {
        return cartAPI.getCart(args);
      },
    });
    t.field('checkoutData', {
      type: CheckoutDataResponse,
      args: {
        cartId: stringArg(),
        channel: CartChannel,
      },
      resolve(_, args, { dataSources: { checkoutAPI } }) {
        return checkoutAPI.getCheckoutData(args);
      },
    });
    t.field('checkoutStructure', {
      args: {
        cartId: stringArg(),
        channel: CartChannel,
      },
      type: CheckoutStructureQueryResponse,
      resolve(_, { cartId, channel }, { dataSources: { checkoutAPI } }) {
        return checkoutAPI.getCheckoutStructure({
          cartId,
          channel,
        });
      },
    });
  },
});

export const SaveCheckoutStep = mutationField('saveCheckoutStep', {
  type: SaveCheckoutStepResponse,
  description: 'Saves the field values of a Checkout step',
  args: { input: SaveCheckoutStepInput },
  resolve(_, { input }, { dataSources: { checkoutAPI } }) {
    return checkoutAPI.saveCheckoutStep(input);
  },
});
