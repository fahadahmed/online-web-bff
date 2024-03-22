import { definitions } from 'generated/typings/balanceService';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { transformBalanceInformationMessage } from 'datasources/finance/balanceService/helpers/balanceService.helper';

export const transformPrepaidBalance = (
  prepaidBalance: definitions['PrepaidBalanceResponse'],
): NexusGenRootTypes['PrepaidBalance'] => {
  const { detailMessage, summaryMessage, lineNumber, balanceDetails } =
    prepaidBalance;
  return {
    ...balanceDetails,
    lineNumber,
    detailMessage: transformBalanceInformationMessage(detailMessage),
    summaryMessage: transformBalanceInformationMessage(summaryMessage),
  };
};
