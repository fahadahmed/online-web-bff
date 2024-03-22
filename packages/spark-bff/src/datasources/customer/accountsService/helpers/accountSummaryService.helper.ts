import { definitions } from 'generated/typings/accountService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

export const transformAccountSummaryResponse = ({
  firstName,
  lastName,
}: definitions['AccountSummaryResponse']): NexusGenRootTypes['AccountSummary'] => {
  return {
    firstName,
    lastName,
  };
};
