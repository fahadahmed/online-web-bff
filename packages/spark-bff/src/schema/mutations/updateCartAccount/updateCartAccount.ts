import { mutationField, stringArg } from 'nexus';
import { CartChannel } from '../../common';
import { Cart } from '../../queries';

export const updateCartAccountMutation = mutationField('updateCartAccount', {
  type: Cart,
  description: 'Update the account associated with a cart',
  args: {
    accountNumber: stringArg(),
    cartId: stringArg(),
    channel: CartChannel,
  },

  async resolve(_, args, { dataSources: { cartAPI } }) {
    const { body } = await cartAPI.updateCartAccount(args);

    return body;
  },
});
