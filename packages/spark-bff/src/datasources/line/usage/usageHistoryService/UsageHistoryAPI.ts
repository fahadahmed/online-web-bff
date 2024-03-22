import lowerCase from 'lodash/lowerCase';
import pickBy from 'lodash/pickBy';
import { definitions } from 'generated/typings/usageHistoryService';
import { DESLDataSource } from 'datasources/common';
import { NexusGenEnums, NexusGenRootTypes } from 'generated/nexusTypes';
import { transformUsageHistory } from './helpers/usageHistory.helpers';
import { transformUsageHistoryDetails } from './helpers/usageHistoryDetails.helpers';

class UsageHistoryAPI extends DESLDataSource {
  constructor() {
    super('/v2/line');
  }

  async getUsageHistory(
    lineNumber: string,
    usageType: NexusGenEnums['LineUsageHistoryUsageType'],
    interval: NexusGenEnums['LineHistoryInterval'],
    start: string,
    end: string,
  ): Promise<NexusGenRootTypes['LineUsageHistory']> {
    const response = await this.get<definitions['UsageHistoryV2']>(
      `/${lineNumber}/usage/${lowerCase(usageType)}/${lowerCase(interval)}`,
      pickBy({ start, end }),
    );

    return transformUsageHistory(response);
  }

  async getUsageHistoryDetails(
    lineNumber: string,
    usageType: NexusGenEnums['LineUsageHistoryUsageType'],
    interval: NexusGenEnums['LineHistoryInterval'],
    periodBreakdownId: string,
  ): Promise<NexusGenRootTypes['LineUsageHistoryDetail']> {
    const response = await this.get<
      definitions['UsageHistoryByPeriodBreakdownIDV2']
    >(
      `/${lineNumber}/usage/${lowerCase(usageType)}/${lowerCase(
        interval,
      )}/${periodBreakdownId}`,
    );

    return transformUsageHistoryDetails(response);
  }
}
export default UsageHistoryAPI;
