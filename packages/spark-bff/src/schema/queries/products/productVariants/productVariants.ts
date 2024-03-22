import { inputObjectType, objectType, queryField } from 'nexus';
import { Promotion, Image, Entitlement, Stock } from '../products';

export const ProductVariantSpecification = objectType({
  name: 'ProductVariantSpecification',
  definition(t) {
    t.implements('ProductSpecificationValue');
    t.string('name');
  },
});

export const ProductSpecificationGroup = objectType({
  name: 'ProductSpecificationGroup',
  definition(t) {
    t.string('group');
    t.list.field('specifications', {
      type: ProductVariantSpecification,
    });
  },
});

export const ProductVariantAssociatedPriceRule = objectType({
  name: 'ProductVariantAssociatedPriceRule',
  definition(t) {
    t.string('pricePointID');
    t.string('ruleType', {
      description:
        'Indication of a price rule type of the product, example : IFP, REGULAR',
    });
    t.string('description');
    t.string('priceType', {
      description:
        'Indication of a price type of the product, example : Recurring, OneOff',
    });
    t.list.field('sources', {
      // disable eslint-rule as associatedPriceRule source and offerDetails is in a circular relationship
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      type: ProductVariantOfferDetail,
      description: 'list of OfferDetail Object, associated price rule ',
    });
    t.nullable.float('basePrice', {
      description: 'The actual price of the product',
    });
    t.nullable.float('basePriceExcludingTax');
    t.nullable.string('priceFrequencyPeriod', {
      description:
        'Indicates the frequency of the price payment, e.g. Month, corresponding desl field: price.frequency.period',
    });
    t.nullable.int('priceFrequencyValue', {
      description:
        'Value of the frequency period, e.g. 1, indicates 1 Month if priceFrequencyPeriod is Month, corresponding desl field: price.frequency.value',
    });
    t.nullable.int('priceLength', {
      description:
        'The application duration of this price. only required if the price is applicable to a certain duration. like in ifp pricePoint’s applicationDuration. e.g 12 ',
    });
    t.nullable.float('effectivePrice', {
      description:
        'The price of the product in case a rule changes the base price. note: this effectivePrice field will only show under a associatedPriceRuleOffer object.',
    });
    t.nullable.float('effectivePriceExcludingTax');
  },
});

export const ProductVariantAssociatedPrices = objectType({
  name: 'ProductVariantAssociatedPrices',
  definition(t) {
    t.string('priceType');
    t.nullable.float('basePrice');
    t.nullable.float('basePriceExcludingTax');
    t.nullable.string('priceFrequencyPeriod');
    t.nullable.int('priceFrequencyValue');
    t.nullable.int('priceLength');
    t.nullable.float('effectivePrice');
    t.nullable.float('effectivePriceExcludingTax');
  },
});

export const PrimaryCategory = objectType({
  name: 'PrimaryCategory',
  definition(t) {
    t.string('id');
    t.string('name');
  },
});

export const ProductVariantOfferDetail = objectType({
  name: 'ProductVariantOfferDetail',
  description:
    'Offer detail objects of hardware product with payment product as associated price rules.',
  definition(t) {
    t.nullable.string('groupId', {
      description: 'An unique id of a product/offer group',
    });
    t.nullable.string('groupName', {
      description: 'Name of a product/offer group',
    });
    t.nullable.string('groupDescription', {
      description: 'Description of a product/offer group',
    });
    t.nullable.field('primaryCategory', { type: PrimaryCategory });
    t.nullable.boolean('isDefault', {
      description:
        'Identify if the offer is the default offer in an offer group',
    });
    t.string('id', { description: 'An unique id of a product/offer' });
    t.string('name', { description: 'Product/offer name' });
    t.string('description', { description: 'Description of a product/offer' });
    t.nullable.string('externalId');
    t.nullable.string('brand');
    t.nullable.string('color');
    t.nullable.string('colorHex');
    t.nullable.boolean('soldSeparately');
    t.nullable.boolean('isShippable');
    t.nullable.boolean('isDeferrable');
    t.nullable.boolean('isEligibilityCheckRequired');
    t.nullable.string('storage');
    t.nullable.string('priceType', {
      description:
        'Indication of a price type of the product, example : Recurring, OneOff',
    });
    t.nullable.string('priceFrequencyPeriod', {
      description:
        'Indicates the frequency of the price payment, e.g. Month, corresponding desl field: price.frequency.period',
    });
    t.nullable.int('priceFrequencyValue', {
      description:
        'Value of the frequency period, e.g. 1, indicates 1 Month if priceFrequencyPeriod is Month, corresponding desl field: price.frequency.value',
    });
    t.nullable.float('basePrice', {
      description: 'The actual price of the product',
    });
    t.nullable.float('basePriceExcludingTax');
    t.nullable.float('effectivePrice', {
      description:
        'The price of the product in case a rule changes the base price. note: this effectivePrice field will only show under a associatedPriceRuleOffer object.',
    });
    t.nullable.float('effectivePriceExcludingTax');
    t.nullable.int('priceLength', {
      description:
        'The application duration of this price. only required if the price is applicable to a certain duration. like in ifp pricePoint’s applicationDuration. e.g 12 ',
    });
    t.nullable.field('stock', {
      type: Stock,
    });
    t.nullable.list.field('entitlements', {
      type: Entitlement,
    });
    t.nullable.list.field('images', {
      type: Image,
    });
    t.nullable.list.field('promotions', {
      type: Promotion,
    });
    t.nullable.list.field('associatedPrices', {
      type: ProductVariantAssociatedPrices,
    });
    t.nullable.list.field('associatedPriceRules', {
      type: ProductVariantAssociatedPriceRule,
    });
    t.nullable.list.field('productSpecificationGroups', {
      type: ProductSpecificationGroup,
    });
  },
});

export const ProductVariantsInput = inputObjectType({
  name: 'ProductVariantsInput',
  description: 'Input for getting a list of product variants.',
  definition(t) {
    t.nullable.string('groupId');
    t.nullable.string('offerId');
  },
});

export const ProductVariantsResponse = objectType({
  name: 'ProductVariantsResponse',
  description:
    'An Object with group details of the given group ID and a list of variants of the product offer details.',
  definition(t) {
    t.list.field('offerDetails', {
      type: ProductVariantOfferDetail,
      description: 'List of product/offer details object',
    });
  },
});

export const ProductVariantsByGroupId = queryField('productVariantsByGroupId', {
  type: ProductVariantsResponse,
  args: { input: ProductVariantsInput },
  description:
    'This query gets back a list of offer detail variants of a given product group (e.g. iPhone 13 pro) by providing the group id. Related DESL API : GET /v1/products/group/{groupId}/variants ',

  async resolve(
    _root,
    { input: { groupId, offerId } },
    { dataSources: { productDetailsAPI } },
  ) {
    return productDetailsAPI.getProductVariantsByGroupId(groupId, offerId);
  },
});
