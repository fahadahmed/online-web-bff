import { definitions } from 'generated/typings/productDetailServiceV2';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { transformOfferDetails } from './productOffersById.helper';
import { transformNotifications } from './notifications.helper';

export const transformPlanProductOffers = ({
  notifications,
  offerDetails,
}: definitions['FetchEligibleProductDetailsResponse']): NexusGenRootTypes['PlanProductOffers'] => ({
  notifications: notifications?.map(transformNotifications),
  offerDetails: offerDetails.map(transformOfferDetails),
});
