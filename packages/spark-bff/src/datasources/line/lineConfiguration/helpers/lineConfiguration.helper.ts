import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/lineConfigurationService';

export const transformGroupCaps = (
  response: definitions['GetGroupCapsResponse'],
): NexusGenRootTypes['LineShareGroupCaps'] => {
  const { group } = response;
  const { id, members, totalData, name } = group;
  const { unit } = totalData;
  const value = Number(totalData.value);
  return {
    id,
    members,
    name,
    totalData: { value, unit },
  };
};
