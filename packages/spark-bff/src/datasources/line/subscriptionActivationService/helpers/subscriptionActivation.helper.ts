import { definitions } from 'generated/typings/lineSubscriptionsService';

export const mapSubscriptionActivation = (
  response: definitions['ActivationResponse'],
) => {
  const { activationUrl, lockTtl } = response;
  return {
    activationUrl,
    lockTtl,
  };
};
