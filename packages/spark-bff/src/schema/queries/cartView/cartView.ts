import { objectType, queryField, stringArg, enumType } from 'nexus';
import { CartChannel } from '../../common';
import { Cart } from '../cart';
import { resolveCartView } from './cartView.resolver';

const CartViewScreen = enumType({
  name: 'CartViewScreen',
  members: ['EMPTY_SCREEN', 'OVERVIEW_SCREEN', 'NO_ACCOUNT_SCREEN'],
  description: 'Indicates which UI screen to show on the Cart page.',
});

const CartViewMandatoryAction = enumType({
  name: 'CartViewMandatoryAction',
  members: ['SIGN_IN', 'CHOOSE_ACCOUNT', 'CHOOSE_ELIGIBLE_IFP_PLAN'],
  description:
    'Indicates what action need to be done by the customer to proceed.',
});

export const CartView = objectType({
  name: 'CartView',
  description:
    'An representation of what should be shown on the Shop Cart page.',
  definition(t) {
    t.id('id');
    t.nullable.field('cart', {
      type: Cart,
    });
    t.field('screen', {
      type: CartViewScreen,
    });
    t.nullable.field('mandatoryAction', {
      type: CartViewMandatoryAction,
    });
  },
});

export const cartViewQuery = queryField('cartView', {
  type: CartView,
  args: { cartId: stringArg(), channel: CartChannel },
  description: 'Get list of cart items in a bundle in your cart',
  async resolve(_, { cartId, channel }, context) {
    const {
      dataSources: { cartAPI },
    } = context;
    const cart = await cartAPI.getCart({ cartId, channel }).catch(() => null);
    return resolveCartView({ cart, context, channel });
  },
});
