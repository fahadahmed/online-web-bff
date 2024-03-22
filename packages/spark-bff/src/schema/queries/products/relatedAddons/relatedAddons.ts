import { enumType, list, objectType, queryField, stringArg } from 'nexus';
import isEmpty from 'lodash/isEmpty';
import { CartChannel } from '../../../common';
import { BaseOfferDetailInterface } from '../products';

const addonActionMembers = [
  'navigateBack',
  'redirect',
  'showErrorScreen',
  'displayProducts',
];

export const AddonAction = enumType({
  name: 'AddonAction',
  members: addonActionMembers,
});

export const AddonOfferDetail = objectType({
  name: 'AddonOfferDetail',
  description:
    'A collection of product details with bundleId and isAccountLevel',
  definition(t) {
    t.implements(BaseOfferDetailInterface);
    t.string('bundleId');
    t.boolean('isAccountLevel');
    t.nullable.string('categoryIdentifier');
  },
});

export const AddonsProducts = objectType({
  name: 'AddonsProducts',
  description: 'Offered products',
  definition(t) {
    t.nullable.list.field('accessoryBundles', {
      type: 'AddonOfferDetail',
    });
    t.nullable.list.field('vasBundles', {
      type: 'AddonOfferDetail',
    });
    t.nullable.list.field('insuranceBundles', {
      type: 'AddonOfferDetail',
    });
  },
});

export const RelatedAddonsResponse = objectType({
  name: 'RelatedAddonsResponse',
  description: 'Bundle related information',
  definition(t) {
    t.nullable.field('addonsProducts', {
      type: AddonsProducts,
    });
    t.nullable.field('addonsCart', {
      type: 'Cart',
    });
    t.field('addonAction', { type: AddonAction });
  },
});

const RelatedProductsArgs = {
  bundleId: stringArg(),
  cartId: stringArg(),
  channel: CartChannel,
  itemIds: list(stringArg()),
};

export const RelatedAddons = queryField('relatedAddons', {
  type: RelatedAddonsResponse,
  args: RelatedProductsArgs,
  description: 'Related Device Addons',

  async resolve(_, args, { dataSources: { productOffersAPI, cartAPI } }) {
    const { cartId, channel } = args;
    async function getAddonsCart() {
      try {
        return await cartAPI.getCart({ cartId, channel });
      } catch {
        return null;
      }
    }
    const addonsCart = await getAddonsCart();

    if (!addonsCart)
      return {
        addonCart: null,
        addonProducts: null,
        addonAction: 'showErrorScreen',
      };

    async function getRelatedAddons() {
      try {
        return await productOffersAPI.getRelatedAddons(args);
      } catch {
        return null;
      }
    }
    const addonsProducts = await getRelatedAddons();
    if (!addonsProducts) {
      const selectedBundle = addonsCart.bundles?.find(
        (bundle) => bundle.bundleId === args.bundleId,
      );

      const cartContainsBundleId = Boolean(selectedBundle);

      const cartBundleContainsItemId =
        selectedBundle &&
        selectedBundle.items?.some((item) =>
          args.itemIds.includes(item.itemId),
        );

      return {
        addonsProducts: null,
        addonsCart,
        addonAction:
          cartContainsBundleId && cartBundleContainsItemId
            ? 'showErrorScreen'
            : 'navigateBack',
      };
    }

    const { vasBundles, insuranceBundles, accessoryBundles } = addonsProducts;

    const noDisplayableProducts =
      isEmpty(vasBundles) &&
      isEmpty(accessoryBundles) &&
      isEmpty(insuranceBundles);

    return {
      addonsProducts,
      addonsCart,
      addonAction: noDisplayableProducts ? 'redirect' : 'displayProducts',
    };
  },
});
