import { ApolloError } from 'apollo-server-fastify';
import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/lineSubscriptionsService';
import { mapAllEligibleSubscriptions } from './helpers/allEligibleSubscriptions.helpers';
import { mapEligibleSubscription } from './helpers/eligibleSubscription.helpers';
import { Subscriptions } from './types/types';

class LineSubscriptionsServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/lines');
  }

  async getAllEligibleSubscriptions() {
    return this.get<definitions['LinesSubscriptionsResponse']>(
      '/subscriptions/me',
    )
      .then(mapAllEligibleSubscriptions)
      .catch((error: ApolloError) => {
        // Special condition for No line numbers associated with the SparkID or
        // Line numbers do not have access rights asked for.
        if (error.extensions.response.body.messages[0].code === 4407) {
          return mapAllEligibleSubscriptions({
            subscriptions: [],
            messages: error.messages,
          });
        }

        throw error;
      });
  }

  async getEligibleSubscription(lineNumber: string, productInstanceId: string) {
    const response = await this.get<Subscriptions>(
      `/${lineNumber}/subscriptions/${productInstanceId}`,
    );
    return mapEligibleSubscription(response);
  }
}

export default LineSubscriptionsServiceAPI;
