import isEmpty from 'lodash/isEmpty';
import camelCase from 'lodash/camelCase';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import flatMap from 'lodash/flatMap';
import sortBy from 'lodash/sortBy';
import { constructSuccessResponse } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';

type ProductDetailsResponse = definitions['ProductDetailByCategoryResponse'];
type EligibleLines = definitions['EligibleLines'];
type NexusPlanDetails = NexusGenRootTypes['ProductDetailsPlan'];
type NexusProductDetails = NexusGenRootTypes['ProductDetailsResponse'];

type OfferDetailsResponse = ProductDetailsResponse['category']['offerDetails'];

const transformProductCharacteristics = (
  productCharacteristics: definitions['ProductCharacteristic'],
) => {
  if (isEmpty(productCharacteristics)) {
    return null;
  }
  return {
    ...productCharacteristics,
    balanceManagement: productCharacteristics.balanceManageMent, // convert field name due to typos in DESL response and swagger file
  };
};

export const transformProductDetails = (
  productDetailsResponse: ProductDetailsResponse,
): NexusProductDetails => {
  const {
    category: {
      id,
      name,
      description,
      isCategoryContainer,
      offerDetails,
      subCategories,
    },
  } = productDetailsResponse;
  const constructedDESLResponse = constructSuccessResponse(
    productDetailsResponse,
  );
  const { message, code, success } = constructedDESLResponse;

  const mappedPlans: NexusPlanDetails[] = offerDetails.map((details) => {
    const {
      category,
      contractTerm,
      contentKey,
      ctaOverrides,
      description: planDescription,
      entitlements,
      externalId,
      group,
      id: planId,
      images,
      name: planName,
      price,
      productCharacteristics,
      productSpecifications,
      productType,
      promotions,
    } = details;

    const flattenedCategories = category?.map(
      (planCategory) => planCategory.id,
    );

    return {
      planDetails: {
        planId,
        contentKey,
        externalId,
        productType,
        description: planDescription,
        planName,
        categoryIdentifiers: flattenedCategories
          ? [...flattenedCategories]
          : null,
      },
      price: {
        priceType: price.priceType,
        pricePeriod: price.frequency?.period,
        priceFrequency: price.frequency?.value,
        basePrice: price.basePrice,
        basePriceExcludingTax: price.basePriceExcludingTax,
      },
      planImages: isEmpty(images) ? null : images,
      group: group || null,
      promotions: isEmpty(promotions) ? null : promotions,
      entitlements: isEmpty(entitlements) ? null : entitlements,
      productSpecifications: isEmpty(productSpecifications)
        ? null
        : productSpecifications,
      productCharacteristics: transformProductCharacteristics(
        productCharacteristics,
      ),
      ctaOverrides: isEmpty(ctaOverrides) ? null : ctaOverrides,
      contractTerm: contractTerm || null,
    };
  });

  return {
    id,
    name,
    description,
    isCategoryContainer,
    plans: mappedPlans,
    subCategories: isEmpty(subCategories) ? null : subCategories,
    message,
    code,
    success,
  };
};

const getAvailableColors = (
  offer: OfferDetailsResponse[0],
  offers: OfferDetailsResponse,
) => {
  if (offer.group?.id) {
    const availableColors = uniqBy(
      offers.filter(
        (offerObj) =>
          offerObj.group?.id === offer.group.id &&
          !!offerObj.productFeatures?.colorHex,
      ),
      'productFeatures.color',
    ).map((offerObj) => ({
      name: offerObj.productFeatures.color,
      value: offerObj.productFeatures.colorHex,
      primaryColor: camelCase(offerObj.productFeatures.primaryColor),
    }));

    return isEmpty(availableColors) ? null : availableColors;
  }

  return offer.productFeatures?.colorHex
    ? [
        {
          name: offer.productFeatures?.color,
          value: offer.productFeatures?.colorHex,
          primaryColor: camelCase(offer.productFeatures?.primaryColor),
        },
      ]
    : null;
};

const isHandsetOrTablet = (offer: OfferDetailsResponse[0]) =>
  offer.category.some((category) => {
    return category.id === 'handsets' || category.id === 'tablets';
  });

const constructAssociatedPriceInfo = (offer: OfferDetailsResponse[0]) => {
  const { defaultPlan, defaultTerm, defaultPrice, price, associatedPrices } =
    offer;

  const lowestAssociatedPrice = isEmpty(associatedPrices)
    ? null
    : associatedPrices.reduce((prev, curr) =>
        curr.basePrice < prev.basePrice ? curr : prev,
      );

  const ifpTerm = defaultTerm?.value || lowestAssociatedPrice?.length;

  const ifpDescription = defaultPlan?.name
    ? `on a ${defaultPlan.name}`
    : `available for customers with a Spark account`;

  const displayPrice =
    isHandsetOrTablet(offer) && defaultPrice ? defaultPrice : price;

  return {
    description: ifpTerm
      ? `Interest free over ${ifpTerm} months ${ifpDescription}`
      : '',
    planId: defaultPlan?.id,
    ifpId: defaultTerm?.value ? String(defaultTerm.value) : null,
    discountText: defaultPrice?.description,
    basePrice: displayPrice?.basePrice,
    basePriceExcludingTax: displayPrice?.basePriceExcludingTax,
    effectivePrice: displayPrice?.effectivePrice,
    effectivePriceExcludingTax: displayPrice?.effectivePriceExcludingTax,
    priceType: displayPrice?.priceType,
  };
};

type OfferWithStartPricePonit = OfferDetailsResponse[0] & {
  startPricePoint?: number;
};

const getDefaultImage = (images: definitions['Image'][]) => {
  return images.find((image) => image.type === 'FEATURED') || images[0];
};

const PLACEHOLDER_IMAGE_URL = '/content/dam/shop-journeys/addons/no-image.png';

const getProductImageUrl = (offer: OfferWithStartPricePonit) => {
  if (!isEmpty(offer?.group?.images)) {
    return getDefaultImage(offer.group.images).defaultUrl;
  }
  if (!isEmpty(offer?.images)) {
    return getDefaultImage(offer.images).defaultUrl;
  }
  // TODO: return fallback image placeholder url once image is available in DAM.
  return PLACEHOLDER_IMAGE_URL;
};

const transformProductOffer = (
  offer: OfferWithStartPricePonit,
  offers: OfferDetailsResponse,
): NexusGenRootTypes['DeviceGalleryProduct'] => {
  const formattedOffer = {
    groupId: offer.group?.id || null,
    offerId: offer.id,
    name: offer.group?.name || offer.name,
    description: offer.group?.description || offer.description || '',
    brand: offer.productFeatures?.brand,
    colors: getAvailableColors(offer, offers),
    imageUrl: getProductImageUrl(offer),
    isFeatured: offer.productCharacteristics?.isFeatured ?? null,
    launchDate: offer.launchDate,
    startPricePoint: offer.startPricePoint ?? offer.price?.basePrice,
    tag: offer.productFeatures?.band,
    ...constructAssociatedPriceInfo(offer),
  };

  return formattedOffer;
};

const groupProductsByGroupId = (offers: OfferDetailsResponse) => {
  const productGroups = groupBy(
    offers.filter((offer) => !!offer.group),
    'group.id',
  );

  const uniqueGroupedProductsWithStartPricePoint = Object.values(
    productGroups,
  ).map((productVariants) => {
    const defaultOffer =
      productVariants.find((variant) => variant.group.isDefault) ||
      productVariants[0];

    const startPricePoint =
      Math.min(...productVariants.map((variant) => variant.price?.basePrice)) ||
      null;

    return transformProductOffer({ ...defaultOffer, startPricePoint }, offers);
  });

  return uniqueGroupedProductsWithStartPricePoint;
};

export const transformProductGalleryDetails = (
  productDetailResponse: ProductDetailsResponse,
): NexusGenRootTypes['DeviceGalleryProduct'][] => {
  const productOffers = productDetailResponse.category.offerDetails;

  const individualProducts = productOffers
    .filter((offer) => !offer.group)
    .map((offer) => transformProductOffer(offer, productOffers));

  const groupedProducts = groupProductsByGroupId(productOffers);

  return [...groupedProducts, ...individualProducts];
};

export const transformEligibleLines = (
  eligibleLinesResponse: EligibleLines,
): NexusGenRootTypes['EligibleLine'][] => {
  return eligibleLinesResponse.eligibleLines;
};

export function transformSubcategoriesResponseBody(
  productDetailsResponse: ProductDetailsResponse,
): NexusGenRootTypes['Subcategory'][] {
  if (!productDetailsResponse.category.subCategories) {
    // NOTE: category.subCategories only comes from DESL for anchor categories
    throw new Error('category.subCategories is null-ish');
  }

  const flattenedCategories = flatMap(
    productDetailsResponse.category.subCategories,
    'subCategories',
  ).filter(Boolean);
  const allCategories = [
    ...productDetailsResponse.category.subCategories,
    ...flattenedCategories,
  ];

  return sortBy(allCategories, 'sortOrder').map(({ id, name, visibility }) => ({
    categoryId: id,
    name,
    visibility,
  }));
}
