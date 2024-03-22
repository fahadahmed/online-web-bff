import { ApolloError } from 'apollo-server-core';
import {
  constructErrorResponse,
  constructGenericResponse,
  DESLDataSource,
} from '../../common';
import { definitions } from '../../../generated/typings/paymentService';

export default class PaymentServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/finance/payment');
  }

  registerCard(
    lineNumber: string,
    registerCardBody: definitions['RegisterCreditCardRequest'],
  ) {
    if (!lineNumber) {
      return constructErrorResponse(new ApolloError('lineNumber is required'));
    }

    if (!registerCardBody.paymentMethodId) {
      return constructErrorResponse(
        new ApolloError('paymentMethodId is required'),
      );
    }

    return this.post<definitions['Response']>(
      `/creditcard/${lineNumber}`,
      registerCardBody,
    )
      .then(constructGenericResponse)
      .catch(constructErrorResponse);
  }
}
