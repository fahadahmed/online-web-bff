import countBy from 'lodash/countBy';
import { definitions } from 'generated/typings/cartServiceV2';
import { NexusGenRootTypes, NexusGenEnums } from 'generated/nexusTypes';

type Price = definitions['Price'];

function getBillingFrequency(price: Price): NexusGenEnums['BillingFrequency'] {
  if (price) {
    const { frequency, priceType } = price;
    if (frequency?.period === 'Day' && frequency?.value === 28) {
      return 'EVERY_28_DAYS';
    }
    if (frequency?.period === 'Month') {
      return 'MONTHLY';
    }
    if (!frequency && priceType === 'OneOff') {
      return 'ONE_OFF';
    }
  }
  return null;
}

function getFrequency(price: Price) {
  const frequencyType = price?.priceType;

  return {
    frequencyPeriod: price?.frequency?.period,
    frequencyValue: price?.frequency?.value,
    frequencyType,
    billingFrequency: getBillingFrequency(price),
  };
}

function transformItem(
  item: definitions['BundleEntry'],
): NexusGenRootTypes['Item'] {
  const price = item.price[0];

  return {
    action: item.action,
    itemId: item.id,
    productOfferingId: item.productOfferingId,
    title: item.name,
    description: item.description,
    dealText: item.summary ?? '',
    imageUrl: item.entryImageUrl,
    quantity: item.quantity,
    ...getFrequency(price),
    basePrice: price
      ? {
          value: price.basePrice,
          taxExclusiveValue: price.basePriceExcludingTax,
        }
      : null,
    discountPrice: price?.discount
      ? {
          value: price.discount.discountedValue ?? 0,
          taxExclusiveValue: 0, // @TODO once DESL implements this
        }
      : null,
    effectivePrice: price
      ? {
          value: price.effectivePrice,
          taxExclusiveValue: price.effectivePriceExcludingTax,
        }
      : null,
    offerId: item.productOfferingId,
    categories: item.category ?? [],
    contractTerm: item.contractTerm ? item.contractTerm : null,
    balanceManagement: item.balanceManagement,
    isIncluded: item?.isIncluded,
    removable: item.removable,
    shouldHide: price == null, // TODO: Temporary, replace with shouldHide from backend when available
  };
}

function transformBundle(bundle: definitions['CartBundle']) {
  return {
    bundleId: bundle.id,
    categoryId: bundle.category?.id,
    offerIds: bundle.items.map((item) => item.productOfferingId),
    items: bundle.items.map(transformItem),
    lineNumber: bundle.lineNumber ?? null,
    isLineNumberRequired: bundle.lineRequired ?? false,
  };
}

function buildSummaries(
  prices: definitions['Price'][],
): NexusGenRootTypes['Summary'][] {
  return prices?.map((price) => {
    return {
      ...getFrequency(price),
      discount: price.discount?.discountedValue ?? 0,
      taxExclusiveDiscount: price.discount?.discountedValueExcludingTax ?? 0,
      subtotal: price.basePrice,
      taxExclusiveSubtotal: price.basePriceExcludingTax,
      total: price.effectivePrice,
      taxExclusiveTotal: price.effectivePriceExcludingTax,
      gst: price.basePriceTax ?? 0,
    };
  });
}

function buildAuth(
  cartData: definitions['CartData'],
): NexusGenRootTypes['Auth'] {
  return {
    isAuthenticated: Boolean(cartData?.authenticated),
    isGuest: Boolean(cartData?.guest),
  };
}

function mergeSameOfferIdItems(
  items: definitions['BundleEntry'][],
): NexusGenRootTypes['Item'][] {
  const countedOfferIds = countBy(items, (item) => item.productOfferingId);
  const offerIds = Object.keys(countedOfferIds);

  return offerIds.map((offerId) => {
    const matchingItem = items.find(
      (item) => item.productOfferingId === offerId,
    );

    return {
      ...transformItem(matchingItem),
      quantity: countedOfferIds[offerId],
    };
  });
}

function buildShippableItems(
  bundles: definitions['CartBundle'][],
): NexusGenRootTypes['Item'][] {
  const shippableItems = bundles
    .map((bundle) => bundle.items?.filter((item) => item.shippable))
    .flat();

  return mergeSameOfferIdItems(shippableItems);
}

export const transformCart = (
  cartResponse: definitions['CartResponse'],
): NexusGenRootTypes['Cart'] => {
  const {
    price: prices,
    bundles,
    cartId,
    accountNumber,
    accountRequired,
    segment,
  } = cartResponse;
  return {
    id: cartId,
    cartId,
    accountNumber: accountNumber ?? null,
    isAccountNumberRequired: accountRequired ?? false,
    segment,
    shippableItems: buildShippableItems(bundles),
    bundles: bundles.map(transformBundle),
    summaries: buildSummaries(prices),
    auth: buildAuth(cartResponse),
  };
};
