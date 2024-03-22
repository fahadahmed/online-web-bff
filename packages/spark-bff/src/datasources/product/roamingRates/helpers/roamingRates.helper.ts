import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productRoamingRatesService';

export const transformRates = (
  roamingRatesResponse: definitions['ProductRoamingRatesResponse'],
): NexusGenRootTypes['RoamingRatesResponse'] => {
  const { destinations } = roamingRatesResponse;

  return {
    destinations,
  };
};
