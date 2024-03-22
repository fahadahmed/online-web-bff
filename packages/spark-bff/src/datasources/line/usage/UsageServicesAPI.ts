import { DESLDataSource } from 'datasources/common';
import { NexusGenFieldTypes, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/usageService';
import { reduceUsageSummary } from './helpers/usageServices.helper';

class UsageServicesAPI extends DESLDataSource {
  constructor() {
    super('/v1/line/usage');
  }

  async getUsageSummaryByLineNumber(
    lineNumber: string,
  ): Promise<NexusGenRootTypes['LineUsageSummary'] | null> {
    const { line: lines } = await this.get<definitions['UsageSummary']>(
      `/me/${lineNumber}`,
    );

    return reduceUsageSummary(
      lines.find((l) => l.connectionNumber === lineNumber),
    );
  }

  async getUsageSummary(
    lineNumbers: Array<
      NexusGenRootTypes['Line'] & Partial<NexusGenFieldTypes['Line']>
    >,
  ): Promise<NexusGenRootTypes['LineUsageSummary'][] | null> {
    const { line: lines } = await this.get<definitions['UsageSummary']>(`/me`);

    return lines.map((summary) => {
      const line = lineNumbers.find(
        ({ lineNumber }) => summary.connectionNumber === lineNumber,
      );
      const { displayName } = line;

      return reduceUsageSummary(summary, displayName);
    });
  }
}

export default UsageServicesAPI;
