import { definitions } from 'generated/typings/productDetailServiceV2';
import { NexusGenRootTypes } from 'generated/nexusTypes';

type ProductOffersResponse = definitions['ProductDetailByOfferIdsResponse'];

const transformPriceFrequency = ({
  period,
  value,
}: definitions['Frequency']): NexusGenRootTypes['PriceFrequency'] => ({
  period,
  value,
});

const transformPrice = ({
  description,
  priceType,
  frequency,
  basePrice,
  effectivePrice,
  basePriceExcludingTax,
  effectivePriceExcludingTax,
  taxPercentage,
  length,
}: definitions['Price']): NexusGenRootTypes['Price'] => ({
  description,
  priceType,
  frequency: frequency ? transformPriceFrequency(frequency) : null,
  basePrice,
  effectivePrice,
  basePriceExcludingTax,
  effectivePriceExcludingTax,
  taxPercentage,
  length,
});

const transformProductCharacteristics = ({
  isShippable,
  isDeferrable,
  isFeatured,
  soldSeparately,
  // TODO: get typo in swagger corrected
  balanceManageMent,
  partnerId,
  entitledEntity,
  isIncluded,
}: definitions['ProductCharacteristic']): NexusGenRootTypes['ProductCharacteristic'] => ({
  isShippable,
  isDeferrable,
  isFeatured,
  soldSeparately,
  balanceManagement: balanceManageMent,
  partnerId,
  entitledEntity,
  isIncluded,
});

const transformAssociatedPriceRulesSources = ({
  id,
  name,
  description,
  category,
  price,
  group,
  images,
  entitlements,
  promotions,
  productFeatures,
  productCharacteristics,
  associatedPriceRules,
  stock,
}: definitions['OfferDetail']): NexusGenRootTypes['BaseOfferDetail'] => ({
  id,
  name,
  description,
  category,
  price,
  group,
  images,
  entitlements,
  promotions,
  productFeatures,
  productCharacteristics,
  associatedPriceRules,
  stock,
});

const transformAssociatedPriceRules = ({
  description,
  pricePointID,
  ruleType,
  sources,
  price,
}: definitions['AssociatedPriceRule']): NexusGenRootTypes['AssociatedPriceRule'] => ({
  description,
  pricePointID,
  ruleType,
  sources: sources.map(transformAssociatedPriceRulesSources),
  price,
});

const transformProductSpecifications = ({
  name,
  values,
  sortOrder,
}: definitions['ProductSpecification']): NexusGenRootTypes['ProductSpecification'] => ({
  name,
  values,
  sortOrder,
});

export const transformOfferDetails = ({
  id,
  grandFathered,
  name,
  description,
  contentKey,
  category,
  price,
  images,
  entitlements,
  promotions,
  group,
  productFeatures,
  productSpecifications,
  productCharacteristics,
  associatedPriceRules,
  stock,
  supportedDestinations,
}: definitions['OfferDetail']): NexusGenRootTypes['BaseOfferDetail'] => ({
  id,
  isGrandfathered: grandFathered,
  name,
  description,
  contentKey,
  category,
  price: price ? transformPrice(price) : null,
  images,
  entitlements,
  promotions,
  group,
  productFeatures,
  productSpecifications: productSpecifications?.map(
    transformProductSpecifications,
  ),
  productCharacteristics: productCharacteristics
    ? transformProductCharacteristics(productCharacteristics)
    : null,
  associatedPriceRules: associatedPriceRules?.map(
    transformAssociatedPriceRules,
  ),
  stock,
  supportedDestinations,
});

export const transformProductOffersById = (
  offerDetails: ProductOffersResponse['offerDetails'],
): NexusGenRootTypes['ProductOfferDetailsResponse'] => ({
  offerDetails: offerDetails.map(transformOfferDetails),
});
