import { DESLDataSource } from 'datasources/common';
import { NexusGenAllTypes, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/usageService';
import { first } from 'lodash';
import { transformUsageDetails } from './helpers/usageDetails.helper';

class UsageDetailsAPI extends DESLDataSource {
  constructor() {
    super('/v1/line/usage/me');
  }

  async getLine(lineNumber: string) {
    const { line: lines } = await this.get<definitions['UsageSummary']>(
      `/${lineNumber}`,
    );
    return first(lines);
  }

  async getLineUsageDetails(
    lineNumber: string,
  ): Promise<NexusGenRootTypes['LineUsage'][] | null> {
    return transformUsageDetails(await this.getLine(lineNumber));
  }

  async getLineServiceType(
    lineNumber: string,
  ): Promise<NexusGenAllTypes['LineServiceType'] | null> {
    const { serviceType } = await this.getLine(lineNumber);
    return serviceType;
  }
}

export default UsageDetailsAPI;
