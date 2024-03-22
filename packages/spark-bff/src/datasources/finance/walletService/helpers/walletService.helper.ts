import get from 'lodash/get';

import { definitions, operations } from 'generated/typings/walletService';
import {
  NexusGenEnums,
  NexusGenInputs,
  NexusGenRootTypes,
} from 'generated/nexusTypes';
import { constructGenericResponse } from 'datasources/common/genericResponse.helper';

type Source = definitions['BasePaymentMethodProperties']['source'];
type PaymentMethod = definitions['PaymentMethodResponse']['paymentMethods'][0];

export function getBankType(
  bankName: definitions['BankAccountDetail']['bankName'],
): NexusGenEnums['PaymentMethodBankType'] {
  switch (bankName) {
    case 'ANZ Bank New Zealand':
      return 'ANZ_Bank';
    case 'Bank of New Zealand':
      return 'Bank_of_New_Zealand';
    case 'Westpac':
      return 'Westpac';
    case 'Industrial and Commercial Bank of China (New Zealand) Ltd':
      return 'Industrial_and_Commercial_Bank_of_China_Limited_NZ';
    case 'ASB Bank':
      return 'ASB_Bank';
    case 'TSB Bank':
      return 'TSB_Bank';
    case 'HSBC New Zealand':
      return 'HSBC_Bank_NZ';
    case 'Citibank N.A.':
      return 'Citibank_N_A';
    case 'Kiwibank':
      return 'Kiwibank';
    default:
      return 'Unknown';
  }
}

export const transformBankAccountDetail = (
  response: definitions['BankAccountDetail'],
) => {
  if (!response) {
    return null;
  }
  const { bankName, accountName, accountNumber } = response;
  const bankType: NexusGenEnums['PaymentMethodBankType'] =
    getBankType(bankName);

  // bankType will be having enum value.
  return { bankName, accountName, accountNumber, bankType };
};

const BRAND_BY_CARD_TYPE_MAP = {
  AMEX: 'amex',
  'DINERS CARD': 'diners',
  'MASTER CARD': 'mastercard',
  'VISA CARD': 'visa',
};

export const transformCardDetail = (response: definitions['CardDetail']) => {
  if (!response) {
    return null;
  }
  const {
    maskedCardNumber,
    cardName,
    cardType,
    expiryMonth,
    expiryYear,
    token,
    oneTimeToken,
    secureTransactionToken,
  } = response;

  return {
    brand: get(BRAND_BY_CARD_TYPE_MAP, cardType, null),
    maskedCardNumber,
    cardName,
    cardType,
    expiryMonth,
    expiryYear,
    token,
    oneTimeToken,
    secureTransactionToken,
    creditCardType: get(BRAND_BY_CARD_TYPE_MAP, cardType, 'Unknown'),
  };
};

const filterBySources = (paymentMethod: PaymentMethod, sources: Source[]) => {
  if (!sources || sources?.length === 0) {
    return true;
  }

  return sources.includes(paymentMethod.source);
};

const filterByAssociatedLineNumber = (
  paymentMethod: PaymentMethod,
  associatedLineNumber: string,
) => {
  if (!associatedLineNumber || paymentMethod.source !== 'DIRECT') {
    return true;
  }
  return paymentMethod.associations.some((association) => {
    return association.lineNumber === associatedLineNumber;
  });
};

interface PaymentMethodsFilterArgs {
  sources?: Source[];
  associatedLineNumber: string;
}

export const mapPaymentMethods = (
  paymentMethod: definitions['PaymentMethodResponse']['paymentMethods'][0],
): NexusGenRootTypes['PaymentMethod'] => {
  const {
    associations,
    bankAccountDetail,
    cardDetail,
    isPreferred,
    paymentMethodId,
    personalisedName,
    type,
    source,
  } = paymentMethod;

  return {
    associations,
    bankAccountDetail: transformBankAccountDetail(bankAccountDetail),
    cardDetail: transformCardDetail(cardDetail),
    isPreferred,
    paymentMethodId,
    personalisedName,
    type,
    source,
  };
};

export const getFilteredPaymentMethods = (
  response: definitions['PaymentMethodResponse'],
  { sources, associatedLineNumber }: PaymentMethodsFilterArgs,
): NexusGenRootTypes['PaymentMethod'][] => {
  const { paymentMethods } = response;
  return paymentMethods
    ?.filter((paymentMethod) => filterBySources(paymentMethod, sources))
    ?.filter((paymentMethod) =>
      filterByAssociatedLineNumber(paymentMethod, associatedLineNumber),
    )
    ?.map(mapPaymentMethods);
};

export const constructAddWalletPaymentSuccessResponse = (
  response: definitions['SinglePaymentMethodResponse'],
) => {
  const { code, message, success } = constructGenericResponse(response);
  const { paymentMethodId, isDuplicate, source } = response;

  return {
    code,
    message,
    success,
    addWalletPaymentMethodResponse: { paymentMethodId, isDuplicate, source },
  };
};

export const buildAddBankAccountToWalletRequestBody = (
  input: NexusGenInputs['BankAccountDetailInput'],
) => {
  const { isPreferred, personalisedName, associations, bankAccountDetail } =
    input;
  const reqBodyParams = {
    type: 'BANK' as NexusGenEnums['PaymentMethodType'],
    isPreferred,
    personalisedName,
    associations,
    bankAccountDetail,
    cardDetail: null as definitions['CardDetail'],
  };
  return reqBodyParams;
};

export const buildAddCreditCardToWalletRequestBody = (
  input: NexusGenInputs['CardDetailInput'],
) => {
  const { isPreferred, personalisedName, associations, cardDetail } = input;
  const reqBodyParams = {
    type: 'CREDIT' as NexusGenEnums['PaymentMethodType'],
    isPreferred,
    personalisedName,
    associations,
    cardDetail,
    bankAccountDetail: null as definitions['BankAccountDetail'],
  };
  return reqBodyParams;
};

export interface BuildSaveCardRequestBodyParameter {
  cardholderName?: string;
  isPreferred: boolean;
  token: string;
}

type PostWalletRequestBody =
  operations['addPaymentMethod']['parameters']['body']['paymentMethod'];

export function buildSaveCardRequestBody({
  cardholderName,
  isPreferred,
  token,
}: BuildSaveCardRequestBodyParameter): PostWalletRequestBody {
  return {
    cardDetail: {
      cardName: cardholderName,
      secureTransactionToken: token,
    },
    type: 'CREDIT',
    isPreferred,
  };
}

export function extractPaymentMethodId(
  deslResponse: definitions['SinglePaymentMethodResponse'],
): string {
  return deslResponse.paymentMethodId;
}
