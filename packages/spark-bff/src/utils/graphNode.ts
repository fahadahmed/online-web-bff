import { NexusGenAbstractTypeMembers } from '../generated/nexusTypes';

export const makeNodeID = (
  type: NexusGenAbstractTypeMembers['Node'],
  externalID: string,
) => Buffer.from(`${type}:${externalID}`).toString('base64');

export const introspectNodeID = (id: string) => {
  const parts = Buffer.from(id, 'base64').toString().split(':');
  return {
    type: parts[0] as NexusGenAbstractTypeMembers['Node'],
    externalID: parts[1],
  };
};
