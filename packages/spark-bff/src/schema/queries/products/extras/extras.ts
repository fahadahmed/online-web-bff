import { inputObjectType, objectType, queryField, stringArg } from 'nexus';
import { Notifications } from '../notifications';
import { ProductDetailsSubCategory } from '../productDetails';
import {
  Entitlement,
  OfferDetailCategory,
  Price,
  ProductCharacteristic,
  Promotion,
} from '../products';

export const ExtrasDetail = objectType({
  name: 'ExtrasDetail',
  description: 'Extras detail related information',
  definition(t) {
    t.string('id');
    t.string('name');
    t.nullable.string('contentKey');
    t.nullable.string('description');
    t.nullable.list.field('category', {
      type: OfferDetailCategory,
    });
    t.nullable.field('price', {
      type: Price,
    });
    t.nullable.field('productCharacteristics', {
      type: ProductCharacteristic,
    });
    t.nullable.list.field('entitlements', {
      type: Entitlement,
    });
    t.nullable.list.field('promotions', {
      type: Promotion,
    });
    t.nullable.list.string('supportedDestinations');
  },
});

export const ExtrasCategory = objectType({
  name: 'extrasCategory',
  definition(t) {
    t.string('id');
    t.string('name');
    t.nullable.string('description');
    t.nullable.boolean('isCategoryContainer');
    t.nullable.boolean('visibility');
    t.nullable.boolean('defaultSelected');
    t.nullable.int('sortOrder');
    t.nullable.list.field('subCategories', {
      type: ProductDetailsSubCategory,
    });
    t.nullable.list.field('offers', {
      type: ExtrasDetail,
    });
  },
});

export const ExtrasResponse = objectType({
  name: 'ExtrasResponse',
  definition(t) {
    t.nullable.list.field('extrasCategories', {
      type: ExtrasCategory,
    });
    t.nullable.list.field('notifications', {
      type: Notifications,
      description: 'Array of notifications to be presented to frontend.',
    });
  },
});

export const ExtrasInput = inputObjectType({
  name: 'ExtrasInput',
  definition(t) {
    t.string('lineNumber');
  },
});

export const ExtrasArgs = {
  lineNumber: stringArg(),
};

export const Extras = queryField('extras', {
  type: ExtrasResponse,
  args: ExtrasArgs,
  description: 'Extras',
  async resolve(_, args, { dataSources: { productOffersAPI } }) {
    return productOffersAPI.getExtras(args);
  },
});
