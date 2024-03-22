import { definitions } from 'generated/typings/productDetailServiceV2';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { transformOfferDetails } from './productOffersById.helper';
import { transformNotifications } from './notifications.helper';

export const transformSubscriptionProductOffers = ({
  notifications,
  offerDetails,
}: definitions['FetchEligibleProductDetailsResponse']): NexusGenRootTypes['SubscriptionProductOffers'] => ({
  notifications: notifications?.map(transformNotifications),
  offerDetails: offerDetails.map(transformOfferDetails),
});
