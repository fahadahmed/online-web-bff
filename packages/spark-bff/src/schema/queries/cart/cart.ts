import {
  objectType,
  queryField,
  stringArg,
  nullable,
  list,
  enumType,
} from 'nexus';
import { definitions } from 'generated/typings/cartServiceV2';
import { CartChannel } from '../../common';
import { getCartImages } from './cart.helper';

const cartItemActionMembers: definitions['CartBundle']['items'][0]['action'][] =
  ['keep', 'add', 'delete', 'modify'];

export const CartItemAction = enumType({
  name: 'CartItemAction',
  members: cartItemActionMembers,
});

export const BillingFrequency = enumType({
  name: 'BillingFrequency',
  members: ['ONE_OFF', 'MONTHLY', 'EVERY_28_DAYS'],
  description: 'Billing frequency',
});

export const CartPrice = objectType({
  name: 'CartPrice',
  description: 'Cart Price object',
  definition(t) {
    t.float('value');
    t.float('taxExclusiveValue');
  },
});

export const Item = objectType({
  name: 'Item',
  description: 'An item in a bundle could be plan or addon or accessory',
  definition(t) {
    t.string('itemId');
    t.string('productOfferingId');
    t.string('title');
    t.nullable.field('action', { type: CartItemAction });
    t.nullable.string('description');
    t.nullable.boolean('isIncluded');
    t.nullable.boolean('shouldHide');
    t.nullable.string('imageUrl');
    t.int('quantity');
    t.nullable.field('basePrice', { type: CartPrice });
    t.nullable.field('billingFrequency', { type: BillingFrequency });
    t.nullable.int('frequencyValue');
    t.nullable.field('frequencyPeriod', { type: 'FrequencyPeriod' });
    t.nullable.field('frequencyType', { type: 'FrequencyType' });
    t.string('dealText');
    t.nullable.field('discountPrice', { type: CartPrice });
    t.nullable.field('effectivePrice', { type: CartPrice });
    t.string('offerId');
    t.list.string('categories');
    t.nullable.field('balanceManagement', { type: 'BalanceManagement' });
    t.nullable.field('contractTerm', {
      type: 'ContractTerm',
    });
    t.nullable.boolean('removable');
  },
});

export const Bundle = objectType({
  name: 'Bundle',
  description: 'An array of items either',
  definition(t) {
    t.string('bundleId');
    t.nullable.string('categoryId');
    t.list.string('offerIds');
    t.nullable.list.field('items', { type: Item });
    t.list.field('filteredItems', {
      args: { actions: nullable(list(CartItemAction)) },
      type: Item,
      async resolve(parent, { actions }) {
        return parent?.items.filter(({ action }) => {
          return actions.includes(action);
        });
      },
    });
    t.nullable.string('lineNumber');
    t.nullable.boolean('isLineNumberRequired');
  },
});

export const Summary = objectType({
  name: 'Summary',
  description: 'Pricing Summary for the cart',
  definition(t) {
    t.nullable.field('billingFrequency', { type: BillingFrequency });
    t.nullable.int('frequencyValue');
    t.nullable.field('frequencyPeriod', { type: 'FrequencyPeriod' });
    t.field('frequencyType', { type: 'FrequencyType' });
    t.float('subtotal');
    t.float('taxExclusiveSubtotal');
    t.nullable.float('discount');
    t.nullable.float('taxExclusiveDiscount');
    t.float('total');
    t.float('taxExclusiveTotal');
    t.float('gst');
  },
});

export const ProductOfferImage = objectType({
  name: 'ProductOfferImage',
  description: 'Cart images from Product Offers',
  definition(t) {
    t.string('offerId');
    t.nullable.string('url');
  },
});

export const Auth = objectType({
  name: 'Auth',
  description: 'Authentication information by guest or self service',
  definition(t) {
    t.boolean('isAuthenticated');
    t.boolean('isGuest');
  },
});

export const Cart = objectType({
  name: 'Cart',
  description: 'An list of bundles which is in your cart',
  definition(t) {
    t.string('id');
    t.string('cartId');
    t.nullable.string('accountNumber');
    t.boolean('isAccountNumberRequired');
    t.nullable.list.field('shippableItems', { type: Item });
    t.nullable.list.field('bundles', { type: Bundle });
    t.nullable.list.field('summaries', { type: Summary });
    t.nullable.list.field('productOfferImages', {
      type: ProductOfferImage,
      async resolve(parent, _, { dataSources: { productOffersAPI } }) {
        // Get flat array of all offerIds from all bundles
        const allOfferIds = parent.bundles
          .map((bundle) => {
            return bundle.offerIds;
          })
          .flat();

        const uniqueOfferIds = new Set(allOfferIds);

        if (uniqueOfferIds.size === 0) {
          return null;
        }

        const offerIdParam = Array.from(uniqueOfferIds);

        const productOffers = await productOffersAPI.getProductOffersByOfferIds(
          offerIdParam,
        );

        return getCartImages(productOffers);
      },
    });
    t.field('auth', { type: Auth });
    t.nullable.string('segment');
  },
});

export const CartQuery = queryField('cart', {
  type: Cart,
  args: { cartId: nullable(stringArg()), channel: CartChannel },
  description: 'Get list of cart items in a bundle in your cart',
  async resolve(_, { cartId, channel }, { dataSources: { cartAPI } }) {
    const resBody = cartAPI.getCart({ cartId, channel });
    return resBody;
  },
});
