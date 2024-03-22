import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/lineSummaryService';

export const mapSummary = (
  lines: definitions['LineSummaryResponse']['lines'],
): NexusGenRootTypes['LineSummary'][] => {
  return lines.map(
    ({
      accountNumber,
      balanceManagement,
      type,
      lineNumber,
      status,
      offerId,
      offerName,
      parentLine,
      secondaryLineNumbers,
      planType,
      packageId,
    }) => {
      return {
        accountNumber,
        balanceManagement,
        lineNumber,
        type,
        status,
        offerId,
        offerName,
        parentLine,
        secondaryLineNumbers,
        planType,
        packageId,
      };
    },
  );
};
