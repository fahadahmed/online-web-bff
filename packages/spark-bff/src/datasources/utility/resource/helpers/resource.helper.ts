import { definitions } from 'generated/typings/resourceInfoService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

export const formatResourceTypeResponse = ({
  isNumberIdentified,
  lineInfo,
  accountInfo,
}: definitions['ResourceInfoResponse']): NexusGenRootTypes['Resource'] => ({
  isNumberIdentified,
  account: accountInfo,
  line: lineInfo,
});
