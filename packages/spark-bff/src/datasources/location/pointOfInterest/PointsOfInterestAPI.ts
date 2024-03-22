import { DESLDataSource } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import {
  definitions,
  operations,
} from 'generated/typings/pointsOfInterestService';
import { formatQuery } from 'utils/query';
import { mapServices, buildOutages } from './helpers';

import storeListData from './mocks/storeList.mock.json';

type GetServicesQueryParams =
  operations['fetchServicesData']['parameters']['query'];
type ServiceType =
  operations['fetchServicesData']['parameters']['query']['serviceType'];

type GetOutagesQueryParams =
  operations['fetchOutageData']['parameters']['query'];
type OutageType =
  operations['fetchOutageData']['parameters']['query']['outageType'];
type ServiceAffectedType =
  operations['fetchOutageData']['parameters']['query']['serviceAffected'];

class PointsOfInterestAPI extends DESLDataSource {
  constructor() {
    super('/v1/location/pointsofinterest');
  }

  async getServices(
    location: string,
    serviceType: ServiceType,
  ): Promise<NexusGenRootTypes['PointsOfInterestResponse'][]> {
    const queryParams: GetServicesQueryParams = {
      brand: 'SPARK',
      location,
      serviceType,
      radius: location ? 1000 : undefined,
    };

    const pointsOfInterestResponse = await this.get<
      definitions['ServiceLocationDataResponse']
    >(`/services`, formatQuery(queryParams));

    return mapServices(pointsOfInterestResponse);
  }

  // eslint-disable-next-line class-methods-use-this
  async getStoreList(): Promise<NexusGenRootTypes['StoreList']> {
    return storeListData;
  }

  async getOutages(
    outageType: OutageType,
    serviceAffected: ServiceAffectedType,
  ): Promise<NexusGenRootTypes['PointsOfInterestOutage'][]> {
    const queryParams: GetOutagesQueryParams = {
      outageType,
      serviceAffected,
    };

    const outageDataResponse = await this.get<
      definitions['OutageDataResponse']
    >(`/outages`, formatQuery(queryParams));

    return buildOutages(outageDataResponse);
  }
}

export default PointsOfInterestAPI;
