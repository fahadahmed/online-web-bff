import { NexusGenRootTypes } from 'generated/nexusTypes';

export const getCartImages = (
  productOffers: NexusGenRootTypes['ProductOfferDetailsResponse'],
) => {
  return productOffers.offerDetails.map((offerDetail) => {
    const offerDetailImage = offerDetail.images.find(
      (item) => item.type === 'PRODUCT',
    );
    return {
      offerId: offerDetail.id,
      url: offerDetailImage ? offerDetailImage.defaultUrl : null,
    };
  });
};
