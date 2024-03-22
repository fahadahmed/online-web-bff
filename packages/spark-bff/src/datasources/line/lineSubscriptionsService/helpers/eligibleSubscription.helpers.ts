import { NexusGenRootTypes } from 'generated/nexusTypes';
import { CtaWithSwitch, Subscriptions } from '../types/types';
import {
  transformBundleOffer,
  transformOffer,
  transformStatus,
} from './allEligibleSubscriptions.helpers';

const transformCtas = ({
  type,
  label,
  webLink,
}: CtaWithSwitch): NexusGenRootTypes['SubscriptionCta'] => ({
  type,
  label,
  webLink,
});

const transformSubscription = ({
  accountNumber,
  assetStartDate,
  autorenew,
  bundleOffer,
  ctas,
  lineNumber,
  lockTtl,
  nextRenewalDate,
  offer,
  status,
  subscriptionEndDate,
  username,
}: Subscriptions): NexusGenRootTypes['LineSubscription'] => ({
  accountNumber,
  assetStartDate,
  autoRenew: autorenew,
  bundleOffer: bundleOffer ? transformBundleOffer(bundleOffer) : null,
  ctas: ctas?.map(transformCtas),
  lineNumber,
  lockTtl,
  nextRenewalDate,
  offer: transformOffer(offer),
  status: transformStatus(status),
  subscriptionEndDate,
  username,
});

export const mapEligibleSubscription = (response: Subscriptions) => {
  return transformSubscription(response);
};
