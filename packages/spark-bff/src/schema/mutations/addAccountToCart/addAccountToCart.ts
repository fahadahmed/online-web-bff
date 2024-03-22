import { inputObjectType, objectType, mutationField } from 'nexus';
import { CartChannel } from '../../common';

export const AddAccountToCartInput = inputObjectType({
  name: 'AddAccountToCartInput',
  description: 'Input for associating account to cart',
  definition(t) {
    t.string('cartId', {
      description: 'Cart unique identitier',
    });
    t.string('accountNumber', {
      description: 'account number that you want to associated to cart',
    });
    t.field('channel', {
      type: CartChannel,
    });
  },
});

export const AddAccountToCartResponse = objectType({
  name: 'AddAccountToCartResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const AddAccountToCart = mutationField('addAccountToCart', {
  type: AddAccountToCartResponse,
  description: 'Add account to cart',
  deprecation: 'use updateCartAccount instead',
  args: { input: AddAccountToCartInput },

  async resolve(_, params, { dataSources: { cartAPI } }) {
    const { input } = params;

    const { body } = await cartAPI.addCartAccount(input);

    return body;
  },
});
