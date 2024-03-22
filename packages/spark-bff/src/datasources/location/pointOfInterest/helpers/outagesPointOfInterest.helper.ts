import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/pointsOfInterestService';

export const buildOutages = (
  outagePointOfInterest: definitions['OutageDataResponse'],
): NexusGenRootTypes['PointsOfInterestOutage'][] => {
  const { outages } = outagePointOfInterest;
  return outages.map((outage) => {
    const {
      displayName,
      outageType,
      category,
      serviceAffected,
      status,
      description,
      longitude,
      latitude,
      startDateTime,
      endDateTime,
    } = outage;

    return {
      displayName,
      outageType,
      category,
      serviceAffected,
      status,
      description,
      longitude,
      latitude,
      startDateTime,
      endDateTime,
    };
  });
};
