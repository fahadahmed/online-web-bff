import { inputObjectType, objectType, mutationField } from 'nexus';
import { BundleAction } from '../../common/bundleTypes';
import { CartChannel } from '../../common';

export const AddItem = inputObjectType({
  name: 'AddItem',
  description: 'Individual item input to add to existing bundle',
  definition(t) {
    t.string('itemId');
    t.nullable.int('quantity');
    t.field('action', {
      type: BundleAction,
    });
  },
});

export const AddItemsToBundleInput = inputObjectType({
  name: 'AddItemsToBundleInput',
  description:
    'Input for adding items in the new bundle when cart id is unknown.',
  definition(t) {
    t.string('bundleId');
    t.string('cartId');
    t.list.field('items', {
      type: AddItem,
    });
    t.field('channel', {
      type: CartChannel,
    });
  },
});

export const AddItemsToBundleResponse = objectType({
  name: 'AddItemsToBundleResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const AddItemsToBundle = mutationField('addItemsToBundle', {
  type: AddItemsToBundleResponse,
  description: 'Add items to existing bundle',
  args: { input: AddItemsToBundleInput },

  async resolve(_, { input }, { dataSources: { cartAPI }, res }) {
    const { headers, body } = await cartAPI.addItemsToBundle(input);

    const setCookieHeader = headers?.get('set-cookie');

    if (body.success && setCookieHeader) {
      res.setHeader('set-cookie', setCookieHeader.split(','));
    }

    return body;
  },
});
