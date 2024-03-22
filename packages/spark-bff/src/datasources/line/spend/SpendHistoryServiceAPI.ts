import { pickBy } from 'lodash';
import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/spendHistoryService';
import { NexusGenEnums, NexusGenRootTypes } from 'generated/nexusTypes';
import {
  mapSpendHistory,
  mapSpendHistoryDetail,
} from './helpers/spendHistoryService.helper';

class SpendHistoryServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/line');
  }

  async getSpendHistory(
    lineNumber: string,
    interval: NexusGenEnums['LineHistoryInterval'],
    start?: string,
    end?: string,
  ): Promise<NexusGenRootTypes['LineSpendHistoryResponse'] | null> {
    const queryParameters = pickBy({ start, end });

    const response = await this.get<
      definitions['IntervalSpendHistoryResponse']
    >(`/${lineNumber}/spend/${interval}`, queryParameters);

    return mapSpendHistory(response);
  }

  async getSpendHistoryDetail(
    lineNumber: string,
    interval: NexusGenEnums['LineHistoryInterval'],
    periodBreakdownId: string,
  ): Promise<NexusGenRootTypes['LineSpendHistoryDetailResponse'] | null> {
    const response = await this.get<
      definitions['PeriodBreakdownSpendHistoryResponse']
    >(`/${lineNumber}/spend/${interval}/${periodBreakdownId}`);
    return mapSpendHistoryDetail(response);
  }
}
export default SpendHistoryServiceAPI;
