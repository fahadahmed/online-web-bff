import isEmpty from 'lodash/isEmpty';
import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';

const transformItems = (
  items: NexusGenInputs['RelatedProductInput']['bundles'][0]['items'],
) => items.map((item) => ({ offeringId: item.id }));

export const constructRelatedIfpRequestBody = (
  input: NexusGenInputs['RelatedProductInput'],
) => {
  const { cartId, bundles } = input;

  if (cartId) {
    return { cartId, bundles };
  }

  const transformedBundle = bundles.map((bundle) => ({
    categoryId: bundle.id,
    items: transformItems(bundle.items),
  }));

  return { simulated: true, bundles: transformedBundle };
};

const transformIfpOfferDetail = (offerDetail: definitions['OfferDetail']) => {
  const { id, description, name, promotions } = offerDetail;

  return {
    id,
    name,
    description: description || '',
    promotions: isEmpty(promotions) ? null : promotions,
  };
};

export const transformRelatedIfp = (
  ifpOfferDetails: definitions['FetchCompatibleProductDetailsResponse'],
): NexusGenRootTypes['IfpOfferDetail'][] => {
  const ifpOffers = ifpOfferDetails.bundles[0].offerDetails;

  return ifpOffers.map(transformIfpOfferDetail);
};
