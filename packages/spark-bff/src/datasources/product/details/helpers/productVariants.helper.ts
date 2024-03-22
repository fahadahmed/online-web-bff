import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { NexusGenRootTypes, NexusGenFieldTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';

type DESLProductVariantResponse = definitions['ProductVariantResponse'];
type DESLOfferDetailType = definitions['OfferDetail'];
type ProductVariantOfferDetail =
  NexusGenFieldTypes['ProductVariantOfferDetail'];
type BFFProductVariantResponse = NexusGenRootTypes['ProductVariantsResponse'];

/**  
DESL and BM don't have a primary category as part of the payload. The solution is still pending. 
Primary category is needed for breadcrumb navigation, routing and tracking. In the meantime, agree
to have the following workaround in BFF , finding the primary category from the categories array
of the product. Categories array only contain one of the following six primary categories (provided by DESL developer)
*/

export const PRIMARY_CATEGORIES = [
  {
    id: 'handset',
    name: 'Mobile Phones',
  },
  {
    id: 'wearables',
    name: 'Watches',
  },
  {
    id: 'tablet',
    name: 'Tablets',
  },
  {
    id: 'accessories',
    name: 'Accessories',
  },
  {
    id: 'data_devices',
    name: 'Data Devices',
  },
  {
    id: 'sims',
    name: 'SIM',
  },
];

export const getPrimaryCategory = (
  categories: DESLOfferDetailType['category'],
): ProductVariantOfferDetail['primaryCategory'] => {
  const primaryCategories = PRIMARY_CATEGORIES.find((primaryCategory) =>
    categories?.find((category) => category.id === primaryCategory.id),
  );

  return isEmpty(primaryCategories) ? null : primaryCategories;
};

export const transformPrice = (
  price: definitions['Price'],
): NexusGenFieldTypes['ProductVariantAssociatedPrices'] => {
  return {
    priceType: price?.priceType,
    priceFrequencyPeriod: price?.frequency?.period,
    priceFrequencyValue: price?.frequency?.value,
    basePrice: price?.basePrice,
    basePriceExcludingTax: price?.basePriceExcludingTax,
    effectivePrice: price?.effectivePrice,
    effectivePriceExcludingTax: price?.effectivePriceExcludingTax,
    priceLength: price?.length,
  };
};

export const transformAssociatedPriceRule = (
  rule: definitions['AssociatedPriceRule'],
): NexusGenFieldTypes['ProductVariantAssociatedPriceRule'] => {
  const { description, pricePointID, ruleType, price, sources } = rule;

  return {
    description,
    pricePointID,
    ruleType,
    // disable eslint-rule as associatedPriceRule source and offerDetails is in a circular relationship
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    sources: sources?.map(transformOfferDetails),
    ...transformPrice(price),
  };
};

const sortByOrder = <T>(attributes: T[]): T[] => {
  return sortBy(attributes, 'sortOrder');
};

export const transformProductSpecs = (
  specs: definitions['ProductSpecification'][],
): NexusGenFieldTypes['ProductVariantOfferDetail']['productSpecificationGroups'] => {
  // TODO : update this, once Chris McKay confirms the use case of multiple specification values / example response is provided.
  const flattenSpecs = specs.map((spec) => ({
    name: spec.name,
    group: spec.values.find((value) => !!value.group)?.group || 'Others',
    value: spec.values.map((value) => value.value).join(', '),
    sortOrder: spec.sortOrder,
  }));

  const specsByGroup = Object.entries(groupBy(flattenSpecs, 'group')).map(
    (specificationGroup) => ({
      group: specificationGroup[0],
      specifications: sortByOrder(specificationGroup[1]),
    }),
  );

  return specsByGroup.sort((a, b) => a.group.localeCompare(b.group));
};

export const transformOfferDetails = (
  offer: DESLOfferDetailType,
): ProductVariantOfferDetail => {
  const {
    id,
    category,
    description,
    name,
    associatedPrices,
    associatedPriceRules,
    entitlements,
    externalId,
    group,
    images,
    price,
    productCharacteristics,
    productFeatures,
    promotions,
    productSpecifications,
    stock,
  } = offer;

  const eligiblilityCheckBrands = ['Apple', 'Samsung'];

  const isEligibilityCheckRequired =
    getPrimaryCategory(category)?.id === 'wearables' &&
    eligiblilityCheckBrands.includes(productFeatures?.brand);

  return {
    id,
    name,
    description: description || '',
    primaryCategory: getPrimaryCategory(category),
    stock,
    brand: productFeatures?.brand,
    color: productFeatures?.color,
    colorHex: productFeatures?.colorHex,
    externalId,
    isDefault: group?.isDefault,
    isShippable: productCharacteristics?.isShippable,
    isDeferrable: productCharacteristics?.isDeferrable,
    groupId: group?.id,
    groupName: group?.name,
    groupDescription: group?.description,
    soldSeparately: productCharacteristics?.soldSeparately,
    storage: productFeatures?.storage,
    ...transformPrice(price),
    images: isEmpty(images) ? null : sortByOrder(images),
    productSpecificationGroups: isEmpty(productSpecifications)
      ? null
      : transformProductSpecs(productSpecifications),
    promotions: isEmpty(promotions) ? null : sortByOrder(promotions),
    entitlements: isEmpty(entitlements) ? null : sortByOrder(entitlements),
    associatedPrices: associatedPrices?.map(transformPrice) || null,
    associatedPriceRules:
      associatedPriceRules?.map(transformAssociatedPriceRule) || null,
    isEligibilityCheckRequired,
  };
};

export const transformProductVariants = (
  productVariants: DESLProductVariantResponse,
): BFFProductVariantResponse => {
  const { offerDetails } = productVariants;

  return {
    offerDetails: offerDetails.map(transformOfferDetails),
  };
};
