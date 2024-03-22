import { definitions } from 'generated/typings/accessServiceV2';
import { NexusGenRootTypes, NexusGenEnums } from 'generated/nexusTypes';
import {
  constructErrorResponse,
  constructSuccessResponse,
} from 'datasources/common/genericResponse.helper';
import { ApolloError } from 'apollo-server-fastify';
import {
  FEEDBACK_BY_ACCOUNT_ACCESS_RESPONSE_CODE,
  FEEDBACK_BY_LINE_ACCESS_RESPONSE_CODE,
  PREPAID_SUCCESS_FEEDBACK,
  POSTPAID_SUCCESS_FEEDBACK,
} from '../constants';
import { AddAccessFeedback } from '../typings';

export const transformLines = (
  lines: definitions['SingleAccessRecord'][],
): NexusGenRootTypes['Line'][] => {
  return lines.map(({ aliasName, lineNumber }) => {
    return {
      displayName: aliasName,
      lineNumber,
    };
  });
};

export const filterAccounts = (
  accounts: definitions['SingleAccessRecord'][],
  status?: string,
): definitions['SingleAccessRecord'][] => {
  return status
    ? accounts.filter((account) => account.status === status)
    : accounts;
};

export const reduceAccounts = (
  accounts: definitions['SingleAccessRecord'][],
): NexusGenRootTypes['AccountAccessInformation'][] => {
  return accounts.map(
    ({ aliasName, accountNumber, balanceManagement, lineNumbers }) => {
      return {
        displayName: aliasName,
        accountNumber,
        balanceManagement,
        lines: lineNumbers.map((lineNumber) => {
          return { lineNumber, displayName: aliasName };
        }),
      };
    },
  );
};

export const extractLinesFromAccounts = (
  accounts: definitions['SingleAccessRecord'][],
): NexusGenRootTypes['Line'][] => {
  return reduceAccounts(accounts)
    .map((account) => account.lines)
    .flat();
};

const getNextAccountSection = (
  code: number,
): NexusGenEnums['AddAccountAccessNextSection'] => {
  switch (code) {
    case 3001:
      return 'PasswordEntry';

    case 3002:
      return 'FullNameEntry';

    case 3003:
      return 'BusinessNameEntry';

    case 3008:
      return 'LineNumberEntry';

    default:
      return null;
  }
};

const getNextLineSection = (
  code: number,
): NexusGenEnums['AddLineAccessNextSection'] => {
  if (code === 3004) {
    return 'AuthorisationCodeEntry';
  }
  return null;
};

const getAddAccountAccessFeedback = (code: number): AddAccessFeedback => {
  return code in FEEDBACK_BY_ACCOUNT_ACCESS_RESPONSE_CODE
    ? FEEDBACK_BY_ACCOUNT_ACCESS_RESPONSE_CODE[code]
    : { message: '' };
};

const getAddLineAccessFeedback = (
  code: number,
  balanceManagement: string,
): AddAccessFeedback => {
  if (code === 2008) {
    return balanceManagement === 'PREPAID'
      ? PREPAID_SUCCESS_FEEDBACK
      : POSTPAID_SUCCESS_FEEDBACK;
  }

  return code in FEEDBACK_BY_LINE_ACCESS_RESPONSE_CODE
    ? FEEDBACK_BY_LINE_ACCESS_RESPONSE_CODE[code]
    : { message: '' };
};

export const constructAddAccountAccessSuccessResponse = (
  response: definitions['Response'],
) => {
  const { code, success } = constructSuccessResponse(response);
  const { message, title } = getAddAccountAccessFeedback(code);
  return { code, message, success, title };
};

export const constructAddAccountAccessErrorResponse = (error: ApolloError) => {
  const { code, success } = constructErrorResponse(error);
  const nextStep = getNextAccountSection(code);
  const { message } = getAddAccountAccessFeedback(code);
  return { code, message, success, nextStep };
};

export const constructAddLineAccessSuccessResponse = (
  response: definitions['Response'],
  balanceManagement: string,
) => {
  const { code, success } = constructSuccessResponse(response);
  const { message, title } = getAddLineAccessFeedback(code, balanceManagement);
  return { code, message, success, title };
};

export const constructAddLineAccessErrorResponse = (
  error: ApolloError,
  balanceManagement: string,
) => {
  const { code, success } = constructErrorResponse(error);
  const nextStep = getNextLineSection(code);
  const { message } = getAddLineAccessFeedback(code, balanceManagement);
  return { code, message, success, nextStep };
};
