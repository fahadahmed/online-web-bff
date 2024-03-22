import { ApolloError } from 'apollo-server-fastify';
import { DESLDataSource } from 'datasources/common';
import {
  NexusGenArgTypes,
  NexusGenInputs,
  NexusGenRootTypes,
} from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';
import { formatQuery, formatPathWithQuery } from 'utils/query';
import { isForbidden, DataSourceError } from 'utils/responseErrors.utils';
import {
  constructCompatibleProductsRequestBody,
  transformRelatedPlans,
  transformRelatedAddons,
} from './helpers/compatibleProducts.helpers';
import { transformExtras } from './helpers/extras.helper';
import {
  constructRelatedIfpRequestBody,
  transformRelatedIfp,
} from './helpers/relatedIfp.helper';
import { buildSearchRelatedProductsRequestBody } from './helpers/searchRelatedProducts.helper';
import { transformSubscriptionOffers } from './helpers/subscriptionOffers.helper';
import { transformProductOffersById } from './helpers/productOffersById.helper';
import { transformSubscriptionProductOffers } from './helpers/subscriptionProductOffers.helper';
import { transformPlanProductOffers } from './helpers/planProductOffers.helper';
import {
  transformExistingMpdLines,
  transformPlansComparison,
} from './helpers/plansComparison.helpers';

type ProductOffersResponse = definitions['ProductDetailByOfferIdsResponse'];

type RelatedIfpResponse = definitions['FetchCompatibleProductDetailsResponse'];

type CompatibleProductsResponse =
  definitions['FetchCompatibleProductDetailsResponse'];

type SubscriptionsComparisonResponse =
  definitions['SubscriptionsComparisonResponse'];

type PlansComparisonResponse =
  definitions['FetchCustomerLevelMultiProductDiscountResponse'];

const basePath = 'products/offers';
const v1Path = `/v1/${basePath}`;
const v2Path = `/v2/${basePath}`;

class ProductOffersAPI extends DESLDataSource {
  constructor() {
    super('');
  }

  async getSubscriptionOffers(
    args: NexusGenArgTypes['Query']['subscriptionOffers'],
  ): Promise<NexusGenRootTypes['SubscriptionOffer'][]> {
    return this.get<
      definitions['FetchCompatibleGroupedSubscriptionProductDetailsResponse']
    >(`${v2Path}/subscriptions/me`)
      .then((offers) => {
        return transformSubscriptionOffers(offers, args.groupId);
      })
      .catch((error: ApolloError) => {
        // Special condition for No line numbers associated with the SparkID or
        // Line numbers do not have access rights asked for.
        if (error.extensions.response.body.messages[0].code === 4202) {
          return transformSubscriptionOffers({
            subscriptions: [],
            messages: error.messages,
          });
        }
        throw error;
      });
  }

  async getRelatedPlans(
    input: NexusGenInputs['CompatibleProductsInput'],
  ): Promise<NexusGenRootTypes['RelatedPlansResponse']> {
    const requestBody = constructCompatibleProductsRequestBody(input);

    return this.post<CompatibleProductsResponse>(
      formatPathWithQuery(`${v1Path}/plans/search`, { channel: input.channel }),
      requestBody,
    ).then(transformRelatedPlans);
  }

  async getExtras({
    lineNumber,
  }: NexusGenInputs['ExtrasInput']): Promise<
    NexusGenRootTypes['ExtrasResponse']
  > {
    const extrasByCategories = await this.get<
      definitions['ExtrasByCategoryResponse']
    >(`${v2Path}/extras/lines/${lineNumber}/categories`);

    return transformExtras(extrasByCategories);
  }

  async getRelatedAddons(
    args: NexusGenArgTypes['Query']['relatedAddons'],
  ): Promise<NexusGenRootTypes['AddonsProducts']> {
    const { channel } = args;
    const requestBody = buildSearchRelatedProductsRequestBody(args);

    return this.post<CompatibleProductsResponse>(
      formatPathWithQuery(`${v1Path}/deviceaddons/search`, { channel }),
      requestBody,
    ).then(transformRelatedAddons);
  }

  async getRelatedIfp(
    input: NexusGenInputs['RelatedProductInput'],
  ): Promise<NexusGenRootTypes['IfpOfferDetail'][]> {
    const requestBody = constructRelatedIfpRequestBody(input);

    return this.post<RelatedIfpResponse>(
      `${v1Path}/ifp/search`,
      requestBody,
    ).then(transformRelatedIfp);
  }

  async getProductOffersByOfferIds(
    offerIds?: string[],
    externalIds?: string[],
    includePriceRules?: boolean,
  ): Promise<NexusGenRootTypes['ProductOfferDetailsResponse']> {
    const formattedOfferIds = offerIds?.join(',');
    const formattedExternalIds = externalIds?.join(',');
    const queryParameters = formatQuery({
      ...(formattedOfferIds
        ? { offerIds: formattedOfferIds }
        : { externalIds: formattedExternalIds }),
      ...(includePriceRules ? { includePriceRules } : null),
    });

    const productOffersResponse = await this.get<ProductOffersResponse>(
      `${v1Path}/details`,
      queryParameters,
    );
    return transformProductOffersById(productOffersResponse?.offerDetails);
  }

  async getSubscriptionProductOffers(
    lineNumber: string,
    productInstanceId: string,
  ) {
    const response = await this.get<
      definitions['FetchEligibleProductDetailsResponse']
    >(`${v2Path}/subscriptions/lines/${lineNumber}/${productInstanceId}`);
    return transformSubscriptionProductOffers(response);
  }

  async getEligiblePlansByLineNumber(
    lineNumber: string,
    packInstanceId?: string,
  ) {
    const queryParameters = formatQuery(
      packInstanceId ? { packInstanceId } : {},
    );
    const response = await this.get<
      definitions['FetchEligibleProductDetailsResponse']
    >(`${v2Path}/plans/lines/${lineNumber}`, queryParameters);
    return transformPlanProductOffers(response);
  }

  async getSubscriptionsComparison({
    cartId,
    bundleId,
    channel,
  }: NexusGenArgTypes['Query']['subscriptionsComparison']): Promise<
    definitions['SubscriptionsComparisonResponse']
  > {
    const subscriptionsComparisonResponse =
      await this.get<SubscriptionsComparisonResponse>(
        `${v1Path}/plans/comparison/subscriptions`,
        {
          cartId,
          bundleId,
          channel,
        },
      );

    return subscriptionsComparisonResponse;
  }

  getPlansMpdComparisonResponse({
    cartId,
    channel,
  }: NexusGenArgTypes['Query']['plansMpdComparison']): Promise<PlansComparisonResponse> {
    return this.get<PlansComparisonResponse>(`${v1Path}/plans/comparison/mpd`, {
      cartId,
      channel,
    });
  }

  async getExistingMpdLines({
    cartId,
    channel,
  }: NexusGenArgTypes['Query']['plansMpdComparison']): Promise<
    NexusGenRootTypes['CartExistingMpdLine'][]
  > {
    return this.getPlansMpdComparisonResponse({ cartId, channel })
      .then(transformExistingMpdLines)
      .catch((error: DataSourceError) => {
        if (isForbidden(error)) {
          return [];
        }
        throw error;
      });
  }

  async getPlansMpdComparison({
    cartId,
    channel,
  }: NexusGenArgTypes['Query']['plansMpdComparison']): Promise<
    NexusGenRootTypes['PlansMpdComparisonResponse']
  > {
    const plansMpdComparisonResponse = await this.getPlansMpdComparisonResponse(
      { cartId, channel },
    );
    return transformPlansComparison(plansMpdComparisonResponse);
  }
}

export default ProductOffersAPI;
