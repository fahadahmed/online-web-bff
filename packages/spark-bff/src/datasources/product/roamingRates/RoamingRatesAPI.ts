import { DESLDataSource } from 'datasources/common';
import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productRoamingRatesService';
import { transformRates } from './helpers/roamingRates.helper';

class RoamingRatesAPI extends DESLDataSource {
  constructor() {
    super('');
  }

  async getRoamingRates({
    destinationIso3,
    accountType,
  }: NexusGenInputs['RoamingRatesInput']): Promise<
    NexusGenRootTypes['RoamingRatesResponse']
  > {
    const queryParameters = accountType
      ? { destinationIso3, accountType }
      : { destinationIso3 };

    const response = await this.get<definitions['ProductRoamingRatesResponse']>(
      '/v1/products/rates/roaming',
      queryParameters,
    );

    return transformRates(response);
  }
}

export default RoamingRatesAPI;
