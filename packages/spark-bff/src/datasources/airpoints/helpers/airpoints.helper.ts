import { definitions } from 'generated/typings/airPoints';
import { NexusGenRootTypes } from 'generated/nexusTypes';

export const getAirpointsInfo = (
  airpointsInfo: definitions['AirpointsDetails'],
): NexusGenRootTypes['AirpointsResponse'] => {
  const { airpointsNumber, firstName, lastName, status } = airpointsInfo;

  return {
    airpointsNumber,
    firstName,
    lastName,
    status,
  };
};
