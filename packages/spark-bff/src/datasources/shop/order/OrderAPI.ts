import { ApolloError } from 'apollo-server-fastify';
import { constructErrorResponse, DESLDataSource } from 'datasources/common';
import { NexusGenEnums, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/orderServiceV2';
import { formatPathWithQuery } from 'utils';
import {
  buildSubmitOrderRequestBody,
  constructSubmitOrderErrorResponse,
  constructSubmitOrderSuccessResponse,
  SubmitOrderPayment,
} from './helpers/submitOrder.helper';

export interface SubmitOrderParameter {
  cartId: string;
  payment: SubmitOrderPayment;
  channel: NexusGenEnums['CartChannel'];
  isSplitPayment?: boolean;
}

class OrderAPI extends DESLDataSource {
  constructor() {
    super('/v1/shopping/order');
  }

  submitOrder({
    cartId,
    payment,
    channel,
    isSplitPayment,
  }: SubmitOrderParameter) {
    const path = formatPathWithQuery(`/cart/${cartId}`, { channel });

    if (!payment) {
      return constructErrorResponse(new ApolloError('Invalid action.'));
    }

    return this.post<definitions['SubmitOrderResponse']>(
      path,
      buildSubmitOrderRequestBody(payment, isSplitPayment),
    )
      .then(constructSubmitOrderSuccessResponse)
      .catch(constructSubmitOrderErrorResponse);
  }

  getChangePlanFeasibility(
    lineNumber: string,
  ): Promise<NexusGenRootTypes['OrderFeasibility']> {
    return this.get<definitions['FeasibilityResponse']>(
      `/feasibility/plans/lines/${lineNumber}`,
    );
  }

  getChangeExtraFeasibility(
    lineNumber: string,
  ): Promise<NexusGenRootTypes['OrderFeasibility']> {
    return this.get<definitions['FeasibilityResponse']>(
      `/feasibility/extras/lines/${lineNumber}`,
    );
  }
}

export default OrderAPI;
