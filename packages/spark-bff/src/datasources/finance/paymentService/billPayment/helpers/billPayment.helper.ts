import { definitions } from 'generated/typings/paymentService';
import { constructGenericResponse } from 'datasources/common/genericResponse.helper';
import { NexusGenInputs } from 'generated/nexusTypes';

export const constructPoliPaySuccessResponse = (
  poliPayResponse: definitions['PoliPayResponse'],
) => {
  const { code, message, success } = constructGenericResponse(poliPayResponse);
  const { token, redirectUrl } = poliPayResponse;

  return {
    code,
    message,
    success,
    poliPayResponse: { token, redirectUrl },
  };
};

export const buildPoliPaymentRequestBody = (
  input: NexusGenInputs['PoliPayBillInput'],
) => {
  const { amountType, amount } = input;
  const requestBodyParams = {
    amountType,
    amount,
    clientType: 'CQ_DESKTOP',
  };
  return requestBodyParams;
};

export const buildProcessCCPaymentWithRegisteredCardRequestBody = (
  input: NexusGenInputs['CreditCardBillPaymentRequestInput'],
) => {
  const { source, amountType, paymentMethodId, setupAutoPay, amount } = input;
  const requestBodyParams = {
    amountType,
    paymentMethodId,
    setupAutoPay,
    amount,
    source,
    clientType: 'CQ_DESKTOP',
  };
  return requestBodyParams;
};

export const buildProcessNewCardOneOffBillPaymentAndSaveCardRequestBody = (
  input: NexusGenInputs['NewCardOneoffBillPaymentInput'],
  oneTimeToken: null,
  paymentMethodId: string,
) => {
  const { amount, amountType, setupAutoPay } = input;

  return {
    amount,
    amountType,
    paymentMethodId,
    oneTimeToken,
    setupAutoPay,
    source: 'WALLET_SELF',
    clientType: 'CQ_DESKTOP',
  };
};

export const buildProcessNewCardOneOffBillPaymentRequestBody = (
  input: NexusGenInputs['NewCardOneoffBillPaymentInput'],
  oneTimeToken: NexusGenInputs['CardDetailInput']['cardDetail']['oneTimeToken'],
  paymentMethodId: null,
) => {
  const { amount, amountType, setupAutoPay } = input;

  return {
    amount,
    amountType,
    paymentMethodId,
    oneTimeToken,
    setupAutoPay,
    source: 'NEW_CARD',
    clientType: 'CQ_DESKTOP',
  };
};

export const buildProcessNewCardBillPaymentWithRegistrationRequestBody = (
  input: NexusGenInputs['NewCardBillPaymentWithRegistrationInput'],
) => {
  const { amount, amountType, secureTransactionToken, setupAutoPay } = input;
  const requestBodyParams = {
    amount,
    amountType,
    secureTransactionToken,
    setupAutoPay,
    source: 'NEW_CARD',
    clientType: 'CQ_DESKTOP',
  };
  return requestBodyParams;
};
