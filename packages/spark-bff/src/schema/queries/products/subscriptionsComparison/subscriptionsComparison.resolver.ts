import { FieldResolver } from 'nexus';
import { NexusGenRootTypes } from 'generated/nexusTypes';

interface OffersMap {
  [key: string]: NexusGenRootTypes['SubscriptionComparisonOffer'];
}

type Offer =
  NexusGenRootTypes['ProductOfferDetailsResponse']['offerDetails'][0];

const transformPrice = (price: Offer['price']) => {
  return {
    basePrice: price.basePrice,
    description: price.description,
    frequencyPeriod: price?.frequency?.period,
  };
};

const getIconUrl = (images: Offer['images']) => {
  const iconUrl = images?.find((image) => image.type === 'LOGO')?.defaultUrl;
  return iconUrl ?? null;
};

const transformOffer = (offer: Offer) => {
  return {
    offerId: offer.id,
    offerName: offer.name,
    brand: offer.productFeatures?.brand,
    isIncluded: offer.productCharacteristics?.isIncluded,
    price: transformPrice(offer.price),
    iconUrl: getIconUrl(offer.images),
  };
};

export const resolveSubscriptionsComparison: FieldResolver<
  'Query',
  'subscriptionsComparison'
> = async (
  _,
  { cartId, bundleId, channel },
  { dataSources: { productOffersAPI } },
) => {
  const subscriptionsComparisonResponse =
    await productOffersAPI.getSubscriptionsComparison({
      cartId,
      bundleId,
      channel,
    });

  const { comparisons } = subscriptionsComparisonResponse;

  if (comparisons.length < 1) {
    return { comparisons: [] };
  }

  // TODO: support multiple recommendations
  const comparison = comparisons[0];
  const { available: availableOffer, unavailable: unavailableOffer } =
    comparison;

  const offerIds = [availableOffer?.offerId, unavailableOffer?.offerId];
  const filteredOfferIds = offerIds.filter(Boolean);

  const offers = await productOffersAPI.getProductOffersByOfferIds(
    filteredOfferIds,
  );

  const offersMap = offers.offerDetails.reduce(
    (accumulator: OffersMap, offer: NexusGenRootTypes['BaseOfferDetail']) => {
      return {
        ...accumulator,
        [offer.id]: transformOffer(offer),
      };
    },
    {},
  );

  return {
    comparisons: [
      {
        ...comparison,
        available: availableOffer
          ? offersMap[comparison.available.offerId]
          : null,
        unavailable: unavailableOffer
          ? offersMap[comparison.unavailable.offerId]
          : null,
      },
    ],
  };
};
