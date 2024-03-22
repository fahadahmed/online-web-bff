import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/lineSubscriptionsService';
import { mapSubscriptionActivation } from './helpers/subscriptionActivation.helper';

class SubscriptionActivationAPI extends DESLDataSource {
  constructor() {
    super('/v1/lines');
  }

  async getActivationUrlForLineProduct(
    lineNumber: string,
    productInstanceId: string,
  ) {
    const response = await this.get<definitions['ActivationResponse']>(
      `/${lineNumber}/subscriptions/${productInstanceId}/activation`,
    );

    return mapSubscriptionActivation(response);
  }
}

export default SubscriptionActivationAPI;
