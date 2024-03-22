import { constructSuccessResponse } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/cartServiceV2';
import { transformCart } from './cart.helper';

export function transformDeleteBundleResponse(
  body: definitions['CartResponse'],
): NexusGenRootTypes['DeleteBundleResponse'] {
  return {
    ...constructSuccessResponse(body),
    cart: transformCart(body),
  };
}
