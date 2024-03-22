import { definitions } from 'generated/typings/addressService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

export const mapSearchResponse = (
  addresses: definitions['AddressSearchResponse']['addresses'],
): NexusGenRootTypes['AddressSuggestion'][] => {
  return addresses.map(({ elid, label }) => {
    return { elid, label };
  });
};

export const transformAddressDetailResponse = (
  details: definitions['AddressDetails'],
): NexusGenRootTypes['AddressDetail'] => {
  const {
    elid,
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    geographicCoordinate: { latitude, longitude },
  } = details;

  return {
    elid,
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    latitude,
    longitude,
  };
};
