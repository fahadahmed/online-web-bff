import { ApolloError } from 'apollo-server-fastify';
import { definitions } from 'generated/typings/cartServiceV2';
import { NexusGenRootTypes, NexusGenInputs } from 'generated/nexusTypes';
import {
  DESLResponse,
  constructSuccessResponse,
  constructErrorResponse,
} from 'datasources/common';
import { transformCart } from './cart.helper';

const mapAddBundleItems = (
  items: definitions['CartResponse']['bundles'][0]['items'],
) => {
  return items.map(({ id: itemId, productOfferingId }) => {
    return { itemId, offerId: productOfferingId };
  });
};

const mapAddBundles = (
  bundles: definitions['CartResponse']['bundles'],
): NexusGenRootTypes['AddBundleOperationResponse']['bundles'] => {
  return bundles?.map(({ id, category, items, affected }) => {
    return {
      bundleId: id,
      categoryId: category?.id,
      categoryName: category?.name,
      isAffected: affected ?? false,
      items: mapAddBundleItems(items),
    };
  });
};

export const constructAddBundleSuccessResponse = (
  deslResponse: DESLResponse<definitions['CartResponse']>,
): DESLResponse<NexusGenRootTypes['AddBundleOperationResponse']> => {
  const { body, headers } = deslResponse;
  const { cartId } = body;

  return {
    body: {
      ...constructSuccessResponse(body),
      bundles: mapAddBundles(body.bundles),
      cartId,
      cart: transformCart(body),
    },
    headers,
  };
};

export const constructAddBundleErrorResponse = (
  error: ApolloError,
): DESLResponse<NexusGenRootTypes['AddBundleOperationResponse']> => {
  return {
    body: {
      ...constructErrorResponse(error),
      bundles: null,
      cartId: null,
      cart: null,
    },
    headers: null,
  };
};

export const constructAddBundleRequestBody = ({
  bundles,
  processContext,
}: NexusGenInputs['AddBundlesInput']): definitions['AddToCartRequest'] => {
  // TODO remove `processContext`
  return {
    bundles: bundles.map(
      ({ categoryId, items, lineNumber, accountNumber }) => ({
        category: {
          id: categoryId,
        },
        processContext,
        lineNumber,
        accountNumber,
        items: items.map(
          ({ action, quantity, productInstanceId, ...item }) => ({
            action,
            productInstanceId,
            quantity,
            productCharacteristics: {
              autorenew: item.productCharacteristics?.autoRenew,
            },
            productOfferingId: item.offerId,
          }),
        ),
      }),
    ),
  };
};
