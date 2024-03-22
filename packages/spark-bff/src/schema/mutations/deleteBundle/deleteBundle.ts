import { objectType, mutationField, inputObjectType } from 'nexus';
import { CartChannel } from '../../common';
import { Cart } from '../../queries';

export const DeleteBundleResponse = objectType({
  name: 'DeleteBundleResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.field('cart', {
      type: Cart,
    });
  },
});

export const DeleteCartBundleInput = inputObjectType({
  name: 'DeleteCartBundleInput',
  description: 'Input for delete cart bundle mutation',
  definition(t) {
    t.string('cartId');
    t.field('channel', {
      type: CartChannel,
    });
    t.string('bundleId');
  },
});

export const DeleteCartBundle = mutationField('deleteBundle', {
  type: DeleteBundleResponse,
  args: { input: DeleteCartBundleInput },

  async resolve(_, { input }, { dataSources: { cartAPI }, res }) {
    const { bundleId, cartId, channel } = input;

    const { headers, body: resBody } = await cartAPI.deleteBundle({
      cartId,
      channel,
      bundleId,
    });
    const setCookieHeader = headers?.get('set-cookie');

    if (resBody.success && setCookieHeader) {
      // Note: This is to handle multiple set-cookies seperated by comma
      res.setHeader('set-cookie', setCookieHeader.split(','));
    }

    return resBody;
  },
});
