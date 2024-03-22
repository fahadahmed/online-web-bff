import {
  DESLDataSourceWithHeaders,
  DESLResponse,
  constructSuccessResponse,
  constructErrorResponse,
  constructSuccessResponseWithHeaders,
  constructErrorResponseWithHeaders,
} from 'datasources/common';
import {
  NexusGenRootTypes,
  NexusGenInputs,
  NexusGenArgTypes,
} from 'generated/nexusTypes';
import { definitions } from 'generated/typings/cartServiceV2';
import { formatPathWithQuery } from 'utils';
import { buildAddBundleRequestBody } from './helpers/addItemsToBundle.helper';
import { transformCart } from './helpers/cart.helper';
import {
  constructAddBundleRequestBody,
  constructAddBundleSuccessResponse,
  constructAddBundleErrorResponse,
} from './helpers/addBundle.helper';
import { transformDeleteBundleResponse } from './helpers/deleteBundle.helper';

class CartAPI extends DESLDataSourceWithHeaders {
  constructor() {
    super('/v1/shopping/cart');
  }

  addBundles(
    input: NexusGenInputs['AddBundlesInput'],
  ): Promise<DESLResponse<NexusGenRootTypes['AddBundleOperationResponse']>> {
    const { channel, ...bodyParams } = input;
    const requestBody = constructAddBundleRequestBody(bodyParams);
    const path = formatPathWithQuery('/items', { channel });

    return this.post<DESLResponse<definitions['CartResponse']>>(
      path,
      requestBody,
    )
      .then(constructAddBundleSuccessResponse)
      .catch(constructAddBundleErrorResponse);
  }

  addItemsToBundle({
    bundleId,
    cartId,
    items,
    channel,
  }: NexusGenInputs['AddItemsToBundleInput']) {
    const requestBody = buildAddBundleRequestBody(items);
    const path = formatPathWithQuery(`/${cartId}/bundle/${bundleId}/items`, {
      channel,
    });

    return this.post<DESLResponse<definitions['CartResponse']>>(
      path,
      requestBody,
    )
      .then(constructSuccessResponseWithHeaders)
      .catch(constructErrorResponseWithHeaders);
  }

  getCart({
    cartId,
    channel,
  }: NexusGenArgTypes['Query']['cart']): Promise<NexusGenRootTypes['Cart']> {
    const basePath = cartId ? `/${cartId}` : '';
    const path = formatPathWithQuery(basePath, { channel });
    return this.get<DESLResponse<definitions['CartResponse']>>(path).then(
      ({ body }) => {
        return transformCart(body);
      },
    );
  }

  /**
   * @deprecated
   */
  addCartAccount({
    accountNumber,
    cartId,
    channel,
  }: NexusGenInputs['AddAccountToCartInput']) {
    const path = formatPathWithQuery(`/${cartId}`, { channel });

    return this.patch<DESLResponse<definitions['CartResponse']>>(path, {
      accountNumber,
    }).then(({ body, headers }) => {
      return {
        body: constructSuccessResponse(body),
        headers,
      };
    });
  }

  updateCartAccount({
    accountNumber,
    cartId,
    channel,
  }: NexusGenArgTypes['Mutation']['updateCartAccount']) {
    const path = formatPathWithQuery(`/${cartId}`, { channel });

    return this.patch<DESLResponse<definitions['CartResponse']>>(path, {
      accountNumber,
    }).then(({ body, headers }) => {
      return {
        body: transformCart(body),
        headers,
      };
    });
  }

  deleteBundle({
    bundleId,
    cartId,
    channel,
  }: NexusGenArgTypes['Mutation']['deleteBundle']['input']): Promise<
    DESLResponse<NexusGenRootTypes['DeleteBundleResponse']>
  > {
    const path = formatPathWithQuery(`/${cartId}/bundle/${bundleId}`, {
      channel,
    });

    return this.delete<DESLResponse<definitions['CartResponse']>>(path).then(
      ({ body, headers }) => {
        return {
          body: transformDeleteBundleResponse(body),
          headers,
        };
      },
    );
  }

  deleteItemFromBundle(
    input: NexusGenInputs['DeleteItemFromBundleInput'],
  ): Promise<DESLResponse<NexusGenRootTypes['DeleteItemFromBundleResponse']>> {
    const { bundleId, cartId, channel, itemId } = input;
    const path = formatPathWithQuery(
      `/${cartId}/bundle/${bundleId}/items/${itemId}`,
      { channel },
    );
    return this.delete<DESLResponse<definitions['Response']>>(path)
      .then(({ body, headers }) => {
        return {
          body: constructSuccessResponse(body),
          headers,
        };
      })
      .catch((error) => {
        return {
          body: constructErrorResponse(error),
          headers: null,
        };
      });
  }

  initiateCheckout({
    cartId,
    channel,
  }: NexusGenArgTypes['Mutation']['initiateCheckout']['input']) {
    const path = formatPathWithQuery(`/${cartId}/checkout`, { channel });
    return this.post<DESLResponse<definitions['Response']>>(path)
      .then(({ body, headers }) => {
        return {
          body: constructSuccessResponse(body),
          headers,
        };
      })
      .catch((error) => {
        return {
          body: constructErrorResponse(error),
          headers: null,
        };
      });
  }

  async submitRecommendation({
    cartId,
    bundleId,
    channel,
    recommendations,
  }: NexusGenInputs['SubmitRecommendationInput']): Promise<
    NexusGenRootTypes['GenericMutationResponse']
  > {
    try {
      const path = formatPathWithQuery(
        `/${cartId}/bundle/${bundleId}/recommendations`,
        { channel },
      );
      const requestBody = { recommendations };

      const response = await this.post<
        DESLResponse<definitions['CartResponse']>
      >(path, requestBody);

      return constructSuccessResponse(response.body);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
}

export default CartAPI;
