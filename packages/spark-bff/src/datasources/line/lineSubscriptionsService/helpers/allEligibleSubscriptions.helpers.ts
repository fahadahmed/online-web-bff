import { definitions } from 'generated/typings/lineSubscriptionsService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

export const transformBundleOffer = ({
  id,
  name,
  productInstanceId,
}: definitions['BundleOffer']): NexusGenRootTypes['LineSubscriptionsBundleOffer'] => ({
  bundleOfferId: id,
  name,
  productInstanceId,
});

export const transformOffer = ({
  id,
  name,
  productInstanceId,
}: definitions['Offer']): NexusGenRootTypes['LineSubscriptionsOffer'] => ({
  offerId: id,
  name,
  productInstanceId,
});

export const transformStatus = ({
  label,
  type,
}: definitions['Status']): NexusGenRootTypes['LineSubscriptionsStatus'] => ({
  label,
  type,
});

const transformSubscriptions = ({
  accountNumber,
  assetStartDate,
  bundleOffer,
  lineNumber,
  offer,
  status,
}: definitions['Subscription']): NexusGenRootTypes['LineSubscriptions'] => ({
  accountNumber,
  assetStartDate,
  bundleOffer: bundleOffer ? transformBundleOffer(bundleOffer) : null,
  lineNumber,
  offer: transformOffer(offer),
  status: transformStatus(status),
});

export const mapAllEligibleSubscriptions = (
  response: definitions['LinesSubscriptionsResponse'],
) => {
  return response.subscriptions.map(transformSubscriptions);
};
