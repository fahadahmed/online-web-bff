import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';

type Price =
  definitions['FetchCustomerLevelMultiProductDiscountResponse']['cart']['bundles'][0]['items'][0]['price'];

const transformPrice = (price: Price) => {
  return {
    priceType: price.priceType,
    period: price.frequency.period,
    basePrice: price.basePrice,
    effectivePrice: price.effectivePrice,
    discount: price.discount
      ? {
          discountType: price.discount?.discountType,
          appliedValue: price.discount?.appliedValue,
        }
      : null,
  };
};

const checkPriceDataPresence = (price: Price) => {
  return (
    price &&
    price.effectivePrice &&
    price.discount &&
    price.discount.appliedValue &&
    price.discount.discountType
  );
};

const transformExistingPlanData = (
  existingPlans: definitions['ExistingPlanDetails'][],
) => {
  return existingPlans?.map((existingPlan) => {
    if (
      !checkPriceDataPresence(existingPlan.currentPrice) &&
      !checkPriceDataPresence(existingPlan.updatedPrice)
    ) {
      throw new Error('mpd discount data is null-ish');
    }
    const currentPrice = transformPrice(existingPlan.currentPrice);
    const existingPrice = transformPrice(existingPlan.updatedPrice);
    return {
      lineNumber: '••• ••• ••••',
      currentPrice: currentPrice.effectivePrice,
      updatedPrice: existingPrice.effectivePrice,
      currentDiscountPercentage: {
        appliedValue: currentPrice.discount.appliedValue,
        discountCategory: currentPrice.discount.discountType,
        discountedValue: null,
      },
      existingDiscountPercentage: {
        appliedValue: existingPrice.discount.appliedValue,
        discountCategory: existingPrice.discount.discountType,
        discountedValue: null,
      },
      description: existingPlan.name,
    };
  });
};

export const transformExistingMpdLines = (
  plansComparisonResponse: definitions['FetchCustomerLevelMultiProductDiscountResponse'],
): NexusGenRootTypes['CartExistingMpdLine'][] => {
  const { existingPlans } = plansComparisonResponse;
  return transformExistingPlanData(existingPlans);
};

export const transformPlansComparison = (
  plansComparisonResponse: definitions['FetchCustomerLevelMultiProductDiscountResponse'],
): NexusGenRootTypes['PlansMpdComparisonResponse'] => {
  const { cart, existingPlans, messages } = plansComparisonResponse;

  return {
    cartId: cart.cartId,
    bundles: cart.bundles?.map((bundle) => {
      return {
        lineNumber: bundle.lineNumber,
        id: bundle.id,

        items: bundle.items.map((item) => {
          return {
            productOfferingId: item.productOfferingId,
            name: item.name,
            price: item.price ? transformPrice(item.price) : null,
            action: item.action,
          };
        }),
      };
    }),
    existingPlans: existingPlans?.map((existingPlan) => {
      return {
        productOfferingId: existingPlan.productOfferingId,
        name: existingPlan.name,
        currentPrice: transformPrice(existingPlan.currentPrice),
        updatedPrice: transformPrice(existingPlan.updatedPrice),
      };
    }),
    discountChanged: messages[0].code !== 2101,
  };
};
