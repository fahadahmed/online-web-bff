import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/pointsOfInterestService';
import isEmpty from 'lodash/isEmpty';

const isDateEmpty = (timeFromService: string) => {
  return isEmpty(timeFromService) || timeFromService === 'NULL';
};

export const mapServices = (
  pointOfInterest: definitions['ServiceLocationDataResponse'],
): NexusGenRootTypes['PointsOfInterestResponse'][] => {
  const { locations } = pointOfInterest;
  return locations.map((location) => {
    const {
      addressLine1,
      addressLine2,
      city,
      directions,
      displayName,
      distanceFromLocation,
      emailAddress,
      featured = false,
      image,
      latitude,
      longitude,
      operatingHours: originalOperatingHours,
      phoneNumber,
      recycle,
      store,
      suburb,
      wifi,
      contacts = [],
    } = location;

    const sanitizedOperatingHours = originalOperatingHours
      .map(({ day, open, close }) => {
        if (day) {
          return {
            day,
            open: isDateEmpty(open) ? null : open,
            close: isDateEmpty(close) ? null : close,
          };
        }

        return null;
      })
      .filter(Boolean);

    return {
      addressLine1,
      addressLine2,
      city,
      directions,
      displayName,
      distanceFromLocation,
      emailAddress,
      featured,
      image,
      isRecyclingOffered: recycle,
      isStore: store,
      isWifiAvailable: wifi,
      latitude,
      longitude,
      operatingHours: sanitizedOperatingHours,
      phoneNumber,
      suburb,
      contacts,
    };
  });
};
