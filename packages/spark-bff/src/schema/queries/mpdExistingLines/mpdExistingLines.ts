import { list, objectType, queryField, stringArg } from 'nexus';
import { CartChannel } from '../../common';

export const CartExistingMpdLine = objectType({
  name: 'CartExistingMpdLine',
  definition(t) {
    t.string('lineNumber');
    t.string('description');
    t.float('currentPrice');
    t.float('updatedPrice');
    t.field('currentDiscountPercentage', { type: 'Discount' });
    t.field('existingDiscountPercentage', { type: 'Discount' });
  },
});

export const MpdExistingLinesQuery = queryField('existingMpdLines', {
  type: list(CartExistingMpdLine),
  args: { cartId: stringArg(), channel: CartChannel },
  description: 'An list of existing mpd lines',
  async resolve(_, { cartId, channel }, { dataSources: { productOffersAPI } }) {
    return productOffersAPI.getExistingMpdLines({
      cartId,
      channel,
    });
  },
});
