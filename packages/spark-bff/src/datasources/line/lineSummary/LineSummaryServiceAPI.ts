import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/lineSummaryService';
import { NexusGenAllTypes, NexusGenRootTypes } from 'generated/nexusTypes';
import { mapSummary } from './helpers/lineSummaryService.helper';

class LineSummaryServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/lines/me');
  }

  async getLineSummaries(
    lineTypes?: string[],
  ): Promise<NexusGenRootTypes['LineSummary'][]> {
    const { lines } = await this.get<definitions['LineSummaryResponse']>(
      '/summary',
    );

    const filteredLines = lineTypes?.length
      ? lines.filter((line) => lineTypes.includes(line.type))
      : lines;

    return mapSummary(filteredLines);
  }

  async getLineSummary(
    lineNumber: string,
  ): Promise<NexusGenRootTypes['LineSummary']> {
    const lines = await this.getLineSummaries();
    return lines.find((line) => line.lineNumber === lineNumber);
  }

  async getLineBalanceManagement(
    lineNumber: string,
  ): Promise<NexusGenAllTypes['BalanceManagement'] | null> {
    const line = await this.getLineSummary(lineNumber);
    return line?.balanceManagement;
  }
}

export default LineSummaryServiceAPI;
