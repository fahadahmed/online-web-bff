import { definitions } from 'generated/typings/paymentService';
import {
  constructErrorResponse,
  constructGenericResponse,
} from 'datasources/common/genericResponse.helper';
import { NexusGenInputs } from 'generated/nexusTypes';
import { ApolloError } from 'apollo-server-fastify';

export const constructCCTopupSuccessResponse = (
  transactionResult: definitions['CreditCardTopupResponse'],
) => {
  const { code, message, success } =
    constructGenericResponse(transactionResult);
  const { availableBalance, receiptNumber, reservedBalance } =
    transactionResult;

  return {
    code,
    message,
    success,
    availableBalance,
    receiptNumber,
    reservedBalance,
  };
};

export const constructVoucherTopupSuccessResponse = (
  response: definitions['VoucherTopupResponse'],
) => {
  const { code, message, success } = constructGenericResponse(response);
  const { redeemedAmount, receiptNumber, reservedBalance, availableBalance } =
    response;
  return {
    code,
    message,
    success,
    voucherResponse: {
      redeemedAmount,
      receiptNumber,
      reservedBalance,
      availableBalance,
    },
  };
};

interface ErrorMessagesMap {
  [key: number]: string;
}

const ERROR_MESSAGES_MAP: ErrorMessagesMap = {
  4001: 'That code has expired. Please try a new code or another payment method.',
};

export const constructVoucherTopupErrorResponse = (error: ApolloError) => {
  const { code, message, success } = constructErrorResponse(error);
  const errorMessage = ERROR_MESSAGES_MAP[code] || message;

  return {
    code,
    message: errorMessage,
    success,
  };
};

export const buildCCTopupPaymentAndSaveCardRequestBody = (
  input: NexusGenInputs['CreditCardTopupInput'],
  paymentMethodId: string,
  oneTimeToken: null,
) => {
  const { amount, secureTransactionToken } = input;

  return {
    clientType: 'CQ_DESKTOP',
    source: 'WALLET_SELF',
    amount,
    setupAutoTopup: false,
    paymentMethodId,
    oneTimeToken,
    secureTransactionToken,
  };
};

export const buildCCTopupPaymentRequestBody = (
  input: NexusGenInputs['CreditCardTopupInput'],
  oneTimeToken: NexusGenInputs['CardDetailInput']['cardDetail']['oneTimeToken'],
) => {
  const { amount, paymentMethodId, secureTransactionToken } = input;
  return {
    clientType: 'CQ_DESKTOP',
    source: 'NEW_CARD',
    amount,
    setupAutoTopup: false,
    paymentMethodId,
    oneTimeToken,
    secureTransactionToken,
  };
};

export const buildCCTopupPaymentWithRegisteredCardRequestBody = (
  input: NexusGenInputs['CreditCardTopupInput'],
) => {
  const { source, amount, paymentMethodId } = input;

  return {
    clientType: 'CQ_DESKTOP',
    source,
    amount,
    setupAutoTopup: false,
    paymentMethodId,
  };
};

export const buildSetPrepaidAutoTopupAndSaveCardRequestBody = (
  input: NexusGenInputs['AutoTopupInput'],
  paymentMethodId: string,
) => {
  const { amount, autoTopupSettings } = input;
  const { type, firstTopupDate, monthlyTopupLimit, thresholdAmount } =
    autoTopupSettings;

  if (type === 'RT') {
    return {
      source: 'WALLET_SELF',
      amount,
      autoTopupSettings: {
        type,
        firstTopupDate,
      },
      setupAutoTopup: true,
      paymentMethodId,
    };
  }
  return {
    source: 'WALLET_SELF',
    amount,
    autoTopupSettings: {
      type,
      monthlyTopupLimit,
      thresholdAmount,
    },
    setupAutoTopup: true,
    paymentMethodId,
  };
};

export const buildSetPrepaidAutoTopupWithRegisteredCardRequestBody = (
  input: NexusGenInputs['AutoTopupInput'],
) => {
  const { source, amount, autoTopupSettings, paymentMethodId } = input;
  const { type, firstTopupDate, monthlyTopupLimit, thresholdAmount } =
    autoTopupSettings;
  if (type === 'RT') {
    return {
      source,
      amount,
      autoTopupSettings: {
        type,
        firstTopupDate,
      },
      setupAutoTopup: true,
      paymentMethodId,
    };
  }
  return {
    source,
    amount,
    autoTopupSettings: {
      type,
      monthlyTopupLimit,
      thresholdAmount,
    },
    setupAutoTopup: true,
    paymentMethodId,
  };
};
