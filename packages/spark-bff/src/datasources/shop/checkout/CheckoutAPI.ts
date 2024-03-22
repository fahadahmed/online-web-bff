import {
  constructErrorResponse,
  constructSuccessResponse,
  DESLDataSource,
} from 'datasources/common';
import {
  NexusGenArgTypes,
  NexusGenFieldTypes,
  NexusGenInputs,
} from 'generated/nexusTypes';
import { definitions } from 'generated/typings/checkoutSectionV2';
import { formatPathWithQuery } from 'utils';
import { isResponseSuccess } from 'utils/isResponseSuccess';
import { transformCheckoutData } from './helpers/checkoutData.helper';
import { buildSuccessfulCheckoutSectionResponse } from './helpers/checkoutStructure.helper';
import { buildSaveStepRequestBody } from './helpers/saveStep.helper';

class CheckoutAPI extends DESLDataSource {
  constructor() {
    super('/v1/shopping/checkout/cart');
  }

  getCheckoutData({
    cartId,
    channel,
  }:
    | NexusGenInputs['CheckoutDataInput']
    | NexusGenArgTypes['SaveCheckoutStepResponse']['checkoutData']): Promise<
    NexusGenFieldTypes['CheckoutDataResponse']
  > {
    return this.get<definitions['CheckoutDataResponse']>(`/${cartId}`, {
      channel,
    }).then(transformCheckoutData);
  }

  getCheckoutStructure({
    cartId,
    channel,
  }:
    | NexusGenArgTypes['Query']['checkoutStructure']
    | NexusGenArgTypes['SaveCheckoutStepResponse']['checkoutStructure']) {
    return this.get<definitions['CheckoutSectionDetailResponse']>(
      `/${cartId}/details`,
      { channel },
    ).then(buildSuccessfulCheckoutSectionResponse);
  }

  async saveCheckoutStep(input: NexusGenInputs['SaveCheckoutStepInput']) {
    const { cartId, sectionId, channel } = input;
    const requestBody = buildSaveStepRequestBody(input);
    const path = formatPathWithQuery(`/${cartId}/section/${sectionId}`, {
      channel,
    });

    return this.post<definitions['Response']>(path, requestBody)
      .then((deslResponse) => {
        if (!isResponseSuccess(deslResponse.messages[0].code)) {
          throw new Error(String(deslResponse.messages[0].code));
        }
        return constructSuccessResponse(deslResponse);
      })
      .catch((error) => constructErrorResponse(error));
  }
}

export default CheckoutAPI;
