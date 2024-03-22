import { definitions } from 'generated/typings/cartServiceV2';
import { NexusGenInputs } from 'generated/nexusTypes';

export function buildAddBundleRequestBody(
  inputItems: NexusGenInputs['AddItemsToBundleInput']['items'],
): definitions['AddItemsToCartRequest'] {
  const items = inputItems.map(({ itemId, quantity, action }) => ({
    productOfferingId: itemId,
    quantity,
    action,
  }));

  return {
    items,
  };
}
