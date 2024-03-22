import { NexusGenArgTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';

export function buildSearchRelatedProductsRequestBody({
  bundleId,
  cartId,
  itemIds,
}: NexusGenArgTypes['Query']['relatedAddons']): definitions['FetchCompatibleProductDetailsRequest'] {
  const constructItemsArray = (array: string[]) =>
    array.map(
      (itemId) => ({
        id: itemId,
      }),
      {},
    );
  return {
    cartId,
    bundles: [
      {
        id: bundleId,
        items: constructItemsArray(itemIds),
      },
    ],
  };
}
