import { enumType, inputObjectType, mutationField, objectType } from 'nexus';
import { definitions } from 'generated/typings/cartServiceV2';
import { CartChannel } from '../../common';

type RecommendationAction = definitions['Recommendation']['action'];

const recommendationActions: RecommendationAction[] = [
  'INFORM',
  'KEEP',
  'CANCEL',
];

const RecommendationAction = enumType({
  name: 'RecommendationAction',
  members: recommendationActions,
});

const Recommendation = inputObjectType({
  name: 'Recommendation',
  definition(t) {
    t.string('recommendationId');
    t.field('action', { type: RecommendationAction });
  },
});

export const SubmitRecommendationInput = inputObjectType({
  name: 'SubmitRecommendationInput',
  definition(t) {
    t.string('cartId');
    t.string('bundleId');
    t.field('channel', { type: CartChannel });
    t.list.field('recommendations', {
      type: Recommendation,
    });
  },
});

export const SubmitRecommendationResponse = objectType({
  name: 'SubmitRecommendationResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const SubmitRecommendation = mutationField('submitRecommendation', {
  type: 'SubmitRecommendationResponse',
  args: { input: SubmitRecommendationInput },
  async resolve(
    _,
    { input: { cartId, bundleId, channel, recommendations } },
    { dataSources: { cartAPI } },
  ) {
    return cartAPI.submitRecommendation({
      cartId,
      bundleId,
      channel,
      recommendations,
    });
  },
});
