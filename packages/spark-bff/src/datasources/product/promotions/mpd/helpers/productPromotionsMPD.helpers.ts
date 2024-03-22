import { definitions } from 'generated/typings/productDetailServiceV2';
import { NexusGenRootTypes } from 'generated/nexusTypes';

const transformDiscount = (
  discount: definitions['FetchMultipleProductDiscountPromotionsDetailsResponse']['price'][0]['discount'],
) => {
  if (!discount) return null;

  return {
    appliedValue: discount?.appliedValue,
    discountCategory: discount?.discountCategory,
    discountedValue: discount?.discountedValue,
  };
};

const transformPrice = (
  price: definitions['FetchMultipleProductDiscountPromotionsDetailsResponse']['price'],
) => {
  return price.map((priceObj) => {
    return {
      basePrice: priceObj.basePrice,
      effectivePrice: priceObj.effectivePrice,
      discount: transformDiscount(priceObj.discount),
    };
  });
};

const transformItems = (
  items: definitions['FetchMultipleProductDiscountPromotionsDetailsResponse']['bundles'][0]['items'],
) => {
  return items.map((item) => {
    return {
      id: item.id,
      price: transformPrice(item.price),
      productOfferingId: item.productOfferingId,
    };
  });
};

const transformBundles = (
  bundles: definitions['FetchMultipleProductDiscountPromotionsDetailsResponse']['bundles'],
) => {
  return bundles.map((bundle) => {
    return {
      id: bundle.id,
      items: transformItems(bundle.items),
    };
  });
};

export const transformProductPromotionsMPD = (
  productPromotionsMPDResponse: definitions['FetchMultipleProductDiscountPromotionsDetailsResponse'],
): NexusGenRootTypes['MpdPromotionsResponse'] => {
  const { bundles, price } = productPromotionsMPDResponse;

  return {
    bundles: transformBundles(bundles),
    price: transformPrice(price),
  };
};

export const constructProductPromotionsMPDRequestBody = (
  offerIds: string[],
) => {
  return {
    simulated: true,
    bundles: offerIds.map((offerId) => {
      return {
        categoryId: 'mobile',
        items: [
          {
            offeringId: offerId,
          },
        ],
      };
    }),
  };
};
