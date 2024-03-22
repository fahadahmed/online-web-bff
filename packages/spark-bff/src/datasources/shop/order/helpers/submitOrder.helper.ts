import { ApolloError } from 'apollo-server-fastify';
import { definitions } from 'generated/typings/orderServiceV2';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import {
  constructSuccessResponse,
  constructErrorResponse,
} from 'datasources/common';

const WEB_CLIENT_TYPE = 'CQ_DESKTOP';

export const constructSubmitOrderSuccessResponse = (
  deslBody: definitions['SubmitOrderResponse'],
): NexusGenRootTypes['SubmitOrderResponse'] => {
  const { confirmationEmailId, orderNumber } = deslBody;

  return {
    ...constructSuccessResponse(deslBody),
    orderNumber,
    confirmationEmailId,
  };
};

export const constructSubmitOrderErrorResponse = (
  error: ApolloError,
): NexusGenRootTypes['SubmitOrderResponse'] => {
  return {
    ...constructErrorResponse(error),
  };
};

interface ExistingCardPayment {
  amount: number;
  paymentMethodId: string;
  source: 'DIRECT';
}

interface NewCardPayment {
  amount: number;
  secureTransactionToken: string;
  source: 'NEW_CARD';
}

interface PrepaidBalancePayment {
  amount: number;
  source: 'ACCOUNT';
}

interface VoucherPayment {
  amount: number;
  source: 'VOUCHER';
}

interface CancelPayment {
  amount: 0;
  source: 'DIRECT';
}

interface LegacyExistingCardPayment {
  amount: number;
  paymentMethodId: string;
  source: 'WALLET_SELF';
}

export type SubmitOrderPayment =
  | ExistingCardPayment
  | NewCardPayment
  | PrepaidBalancePayment
  | VoucherPayment
  | CancelPayment
  | LegacyExistingCardPayment;

export function buildSubmitOrderRequestBody(
  payment: SubmitOrderPayment,
  isSplitPayment = false,
) {
  return {
    payment: {
      clientType: WEB_CLIENT_TYPE,
      partialPay: isSplitPayment,
      ...payment,
    },
  };
}
