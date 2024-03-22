import { enumType, inputObjectType, interfaceType, objectType } from 'nexus';
import { definitions } from 'generated/typings/productDetailServiceV2';
import { CartChannel } from '../../common';

export const SegmentTypeMembers: definitions['CtaOverride']['segment'][] = [
  'CONSUMER',
  'BUSINESS',
];
export const StyleTypeMembers: definitions['CtaOverride']['style'][] = [
  'PRIMARY',
  'SECONDARY',
];

const ProductTypes: definitions['Promotion']['productType'][] = [
  'CHARACTERISTIC',
  'DEAL',
  'FEATURE',
  'MARKETING',
];

const PostpaidManagementType: definitions['BundleEntry']['balanceManagement'][] =
  ['POSTPAID', 'PREPAID'];

const ProductEntitledEntityType: definitions['ProductCharacteristic']['entitledEntity'][] =
  ['ACCOUNT', 'LINE'];

const AssociateRuleType: definitions['AssociatedPriceRule']['ruleType'][] = [
  'IFP',
  'REGULAR',
];

const StockStatus: definitions['StockStatus'][] = ['IN_STOCK', 'OUT_OF_STOCK'];

const ImageTypeMembers: definitions['Image']['type'][] = [
  'BACKGROUND',
  'FEATURED',
  'GALLERY',
  'LOGO',
  'OTHER',
  'PRODUCT',
  'SHOWCASE',
];

const ContractTermUnitMembers: definitions['Term']['unit'][] = [
  'Hour',
  'Day',
  'Week',
  'Month',
  'Year',
];

export const PriceFrequency = objectType({
  name: 'PriceFrequency',
  description: 'Information on price frequency',
  definition(t) {
    t.field('period', {
      type: 'FrequencyPeriod',
    });
    t.int('value');
  },
});

const ContractTermUnit = enumType({
  name: 'ContractTermUnit',
  members: ContractTermUnitMembers,
});

export const ContractTerm = objectType({
  name: 'ContractTerm',
  description: 'Information on contract term',
  definition(t) {
    t.nullable.string('name');
    t.nullable.string('description');
    t.int('value');
    t.field('unit', {
      type: ContractTermUnit,
    });
  },
});

export const Price = objectType({
  name: 'Price',
  description: 'Information on pricing',
  definition(t) {
    t.string('priceType'); // TBC - This will need to be changed to ENUM type later
    t.nullable.field('frequency', {
      type: PriceFrequency,
    });
    t.nullable.float('basePrice');
    t.nullable.float('effectivePrice');
    t.nullable.float('basePriceExcludingTax');
    t.nullable.float('effectivePriceExcludingTax');
    t.nullable.string('taxPercentage');
    t.nullable.int('length');
    t.nullable.string('description');
  },
});

const ImageType = enumType({
  name: 'ImageType',
  members: ImageTypeMembers,
});

export const Image = objectType({
  name: 'Image',
  description: 'Information on product images',
  definition(t) {
    t.nullable.string('imageId', {
      description: 'the unique identifier of the image',
    });
    t.nullable.string('description');
    t.nullable.string('id', {
      deprecation: 'Use the image id instead',
    });
    t.nullable.int('sortOrder');
    t.nullable.string('defaultUrl');
    t.nullable.string('zoomUrl');
    t.nullable.string('standardUrl');
    t.nullable.string('thumbnailUrl');
    t.nullable.string('tinyUrl');
    t.nullable.field('type', { type: ImageType });
  },
});

export const Group = objectType({
  name: 'Group',
  description: 'Product group information',
  definition(t) {
    t.string('id');
    t.nullable.string('groupId');
    t.string('name');
    t.nullable.string('description');
    t.nullable.int('sortOrder');
    t.nullable.list.field('groupImages', {
      type: Image,
    });
    t.nullable.list.field('images', {
      type: Image,
    });
    t.nullable.boolean('isDefault');
  },
});

export const Entitlement = objectType({
  name: 'Entitlement',
  description: 'Information on product entitlements',
  definition(t) {
    t.string('name');
    t.nullable.string('type');
    t.nullable.string('shortDescription');
    t.nullable.string('longDescription');
    t.nullable.string('iconUrl');
    t.nullable.string('quantity');
    t.nullable.int('sortOrder');
    t.nullable.string('contentKey');
  },
});

const ProductType = enumType({
  name: 'ProductType',
  members: ProductTypes,
  description: 'Indicates type of promotion',
});

export const Promotion = objectType({
  name: 'Promotion',
  description: 'Information on marketing promotions',
  definition(t) {
    t.string('name');
    t.field('productType', {
      type: ProductType,
    });
    t.nullable.string('shortDescription');
    t.nullable.string('longDescription');
    t.nullable.int('sortOrder');
    t.nullable.string('iconUrl');
    t.nullable.string('contentKey');
  },
});

export const ProductFeature = objectType({
  name: 'ProductFeature',
  description: 'Information on product features',
  definition(t) {
    t.nullable.string('color');
    t.nullable.string('primaryColor');
    t.nullable.string('colorHex');
    t.nullable.string('brand');
    t.nullable.string('band');
    t.nullable.string('storage');
  },
});

const ProductBalanaceManagementType = enumType({
  name: 'ProductBalanaceManagementType',
  members: PostpaidManagementType,
  description: 'Indicates price type',
});

const EntitledEntityType = enumType({
  name: 'EntitledEntityType',
  members: ProductEntitledEntityType,
  description: 'Indicates price type',
});

export const ProductCharacteristic = objectType({
  name: 'ProductCharacteristic',
  description: 'Information on product characteristics',
  definition(t) {
    t.nullable.boolean('addedInCart');
    t.nullable.field('balanceManagement', {
      type: ProductBalanaceManagementType,
    });
    t.nullable.string('basePlanOfferId');
    t.nullable.field('entitledEntity', {
      type: EntitledEntityType,
    });
    t.nullable.boolean('isDeferrable');
    t.nullable.boolean('isFeatured');
    t.nullable.boolean('isIncluded');
    t.nullable.boolean('isShippable');
    t.nullable.string('partnerId');
    t.nullable.boolean('soldSeparately');
  },
});

const RuleType = enumType({
  name: 'RuleType',
  members: AssociateRuleType,
  description: 'Indicates type of rule',
});

export const AssociatedPriceRule = objectType({
  name: 'AssociatedPriceRule',
  definition(t) {
    t.string('description');
    t.string('pricePointID');
    t.field('ruleType', {
      type: RuleType,
    });
    t.list.field('sources', {
      type: 'BaseOfferDetail',
    });
    t.field('price', {
      type: Price,
    });
  },
});

const StatusType = enumType({
  name: 'StatusType',
  members: StockStatus,
});

export const Stock = objectType({
  name: 'Stock',
  description: 'Information on product stock',
  definition(t) {
    t.field('status', {
      type: StatusType,
    });
    t.field('storeStatus', {
      type: StatusType,
    });
    t.field('warehouseStatus', {
      type: StatusType,
    });
  },
});

export const ProductSpecificationValue = interfaceType({
  name: 'ProductSpecificationValue',
  description:
    'Product specification detail object, indicates specific group value and sort order',
  resolveType: () => {
    return null;
  },
  definition(t) {
    t.string('value');
    t.nullable.string('group');
    t.nullable.int('sortOrder');
  },
});

export const ProductSpecification = objectType({
  name: 'ProductSpecification',
  description: 'Information on display specs, camera specs etc',
  definition(t) {
    t.string('name');
    t.nullable.int('sortOrder');
    t.list.field('values', { type: ProductSpecificationValue });
  },
});

export const CompatibleProductsInput = inputObjectType({
  name: 'CompatibleProductsInput',
  definition(t) {
    t.string('categoryId');
    t.list.string('offerIds');
    t.field('channel', {
      type: CartChannel,
    });
  },
});

export const OfferDetailCategory = objectType({
  name: 'OfferDetailCategory',
  description: 'Category related information',
  definition(t) {
    t.string('id');
    t.nullable.string('categoryId');
  },
});

export const BaseOfferDetailInterface = interfaceType({
  name: 'BaseOfferDetailInterface',
  description: 'An interface for a collection of product details',
  resolveType: () => {
    return null;
  },
  definition(t) {
    t.string('id', {
      deprecation: 'Use offerId instead',
    });
    t.nullable.boolean('isGrandfathered');
    t.nullable.string('offerId');
    t.string('name');
    t.nullable.string('description');
    t.nullable.string('externalId');
    t.nullable.string('contentKey');
    t.nullable.string('productType');
    t.nullable.list.field('category', {
      type: OfferDetailCategory,
    });
    t.nullable.field('contractTerm', {
      type: ContractTerm,
    });
    t.nullable.field('price', {
      type: Price,
    });
    t.nullable.field('group', {
      type: Group,
    });
    t.nullable.list.field('images', {
      type: Image,
    });
    t.nullable.list.field('entitlements', {
      type: Entitlement,
    });
    t.nullable.list.field('promotions', {
      type: Promotion,
    });
    t.nullable.field('productFeatures', {
      type: ProductFeature,
    });
    t.nullable.field('productCharacteristics', {
      type: ProductCharacteristic,
    });
    t.nullable.list.field('associatedPriceRules', {
      type: AssociatedPriceRule,
    });
    t.nullable.field('stock', {
      type: Stock,
    });
    t.nullable.list.field('productSpecifications', {
      type: ProductSpecification,
    });
    t.nullable.list.string('supportedDestinations');
  },
});

export const BaseOfferDetail = objectType({
  name: 'BaseOfferDetail',
  description: 'A collection of product details',
  definition(t) {
    t.implements(BaseOfferDetailInterface);
  },
});
