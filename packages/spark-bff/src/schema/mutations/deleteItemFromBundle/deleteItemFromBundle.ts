import { inputObjectType, objectType, mutationField } from 'nexus';
import { CartChannel } from '../../common';

export const DeleteItemFromBundleInput = inputObjectType({
  name: 'DeleteItemFromBundleInput',
  description: 'Input for deleting an item from an existing bundle.',
  definition(t) {
    t.string('bundleId');
    t.string('cartId');
    t.field('channel', {
      type: CartChannel,
    });
    t.string('itemId');
  },
});

export const DeleteItemFromBundleResponse = objectType({
  name: 'DeleteItemFromBundleResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const DeleteItemFromBundle = mutationField('deleteItemFromBundle', {
  type: DeleteItemFromBundleResponse,
  description: 'Add items to existing bundle',
  args: { input: DeleteItemFromBundleInput },

  async resolve(_, { input }, { dataSources: { cartAPI }, res }) {
    const { headers, body: resBody } = await cartAPI.deleteItemFromBundle(
      input,
    );

    const setCookieHeader = headers?.get('set-cookie');

    if (resBody.success && setCookieHeader) {
      res.setHeader('set-cookie', setCookieHeader.split(','));
    }

    return resBody;
  },
});
