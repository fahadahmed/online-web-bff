import {
  objectType,
  enumType,
  stringArg,
  queryField,
  list,
  nullable,
  booleanArg,
} from 'nexus';
import {
  ContractTerm,
  Entitlement,
  Group,
  Image,
  OfferDetailCategory,
  ProductCharacteristic,
  ProductSpecification,
  Promotion,
  SegmentTypeMembers,
  StyleTypeMembers,
} from '../products';

export const ProductDetailsPlanPrice = objectType({
  name: 'ProductDetailsPlanPrice',
  description: 'Information on plan price',
  definition(t) {
    t.string('priceType');
    t.nullable.string('discountPrice');
    t.nullable.string('discountDiscription');
    t.nullable.string('pricePeriod');
    t.nullable.float('basePrice');
    t.nullable.float('basePriceExcludingTax');
    t.nullable.float('priceFrequency');
  },
});

export const ProductDetailsPlanDetail = objectType({
  name: 'ProductDetailsPlanDetail',
  description: 'Information on plan features',
  definition(t) {
    t.string('planName');
    t.string('planId');
    t.nullable.string('externalId');
    t.nullable.string('productType');
    t.nullable.string('description');
    t.nullable.string('contentKey');
    t.nullable.list.string('categoryIdentifiers', {
      description:
        'Array of destructured category.id strings, used to identify the product ex. endless_plan, primary_mobile_plan, mobile_neon',
    });
  },
});

export const ProductDetailsSubCategory = objectType({
  name: 'ProductDetailsSubCategory',
  description: 'Information on plan subcategories',
  definition(t) {
    t.string('id');
    t.string('name');
    t.nullable.boolean('visibility');
    t.nullable.boolean('defaultSelected');
    t.nullable.int('sortOrder');
    t.nullable.field('subCategories', {
      type: list(ProductDetailsSubCategory),
    });
  },
});

export const SegmentType = enumType({
  name: 'SegmentType',
  members: SegmentTypeMembers,
});

export const StyleType = enumType({
  name: 'StyleType',
  members: StyleTypeMembers,
});

export const CtaOverrideDetail = objectType({
  name: 'CtaOverrideDetail',
  description: '',
  definition(t) {
    t.string('type');
    t.nullable.string('label');
    t.nullable.field('segment', { type: SegmentType });
    t.nullable.string('data');
    t.nullable.string('relatesTo');
    t.nullable.int('sortOrder');
    t.nullable.field('style', { type: StyleType });
  },
});

export const ProductDetailsPlan = objectType({
  name: 'ProductDetailsPlan',
  description: 'A collection of plan details to be displayed via card',
  definition(t) {
    t.field('planDetails', {
      type: ProductDetailsPlanDetail,
    });
    t.nullable.list.field('planImages', {
      type: Image,
    });
    t.nullable.list.field('planCategories', {
      type: OfferDetailCategory,
    });
    t.field('price', {
      type: ProductDetailsPlanPrice,
    });
    t.nullable.field('group', {
      type: Group,
    });
    t.nullable.list.field('entitlements', {
      type: Entitlement,
    });
    t.nullable.list.field('promotions', {
      type: Promotion,
    });
    t.nullable.field('productCharacteristics', {
      type: ProductCharacteristic,
    });
    t.nullable.list.field('productSpecification', {
      type: ProductSpecification,
    });
    t.nullable.list.field('ctaOverrides', {
      type: CtaOverrideDetail,
    });
    t.nullable.field('contractTerm', {
      type: ContractTerm,
    });
  },
});

export const ProductDetailsResponse = objectType({
  name: 'ProductDetailsResponse',
  definition(t) {
    t.list.field('plans', {
      type: ProductDetailsPlan,
    });
    t.nullable.list.field('subCategories', {
      type: ProductDetailsSubCategory,
    });
    t.string('id');
    t.string('name');
    t.nullable.string('description');
    t.string('message');
    t.boolean('isCategoryContainer');
    t.int('code');
    t.boolean('success');
  },
});

export const ProductDetailsArgs = {
  categoryId: stringArg(),
  channel: stringArg(),
  recursiveSearch: nullable(booleanArg()),
};

export const PlanQuery = queryField('productDetails', {
  type: ProductDetailsResponse,
  args: ProductDetailsArgs,
  description:
    'Gets the list of products (plans) and their details to be displayed',
  async resolve(
    _,
    { categoryId, channel, recursiveSearch },
    { dataSources: { productDetailsAPI } },
  ) {
    return productDetailsAPI.getTransformedProductDetails(
      categoryId,
      channel,
      recursiveSearch,
    );
  },
});
