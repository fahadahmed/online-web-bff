import { inputObjectType, mutationField, objectType } from 'nexus';
import { CartChannel } from '../../common';

export const InitiateCheckoutInput = inputObjectType({
  name: 'InitiateCheckoutInput',
  description: 'Input for initiating Checkout process for a specific Cart.',
  definition(t) {
    t.string('cartId');
    t.field('channel', {
      type: CartChannel,
    });
  },
});

export const InitiateCheckoutResponse = objectType({
  name: 'InitiateCheckoutResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const InitiateCheckout = mutationField('initiateCheckout', {
  type: InitiateCheckoutResponse,
  description:
    'Readies the Cart for the checkout process before loading the checkout pages',
  args: { input: InitiateCheckoutInput },
  async resolve(
    _,
    { input: { cartId, channel } },
    { dataSources: { cartAPI } },
  ) {
    const { body } = await cartAPI.initiateCheckout({ cartId, channel });
    return body;
  },
});
