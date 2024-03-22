import { DESLDataSource } from 'datasources/common';
import {
  NexusGenFieldTypes,
  NexusGenRootTypes,
  NexusGenAllTypes,
} from 'generated/nexusTypes';
import { definitions } from 'generated/typings/lineDetailsService';
import { mapAssociatedPlanDetails } from './helpers/lineDetails.helper';
import { mapLineAllowances } from './helpers/lineAllowances.helper';

class LineDetailsServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/line');
  }

  async getAutoTopupDetails(
    lineNumber: string,
  ): Promise<NexusGenRootTypes['LineDetails']> {
    const { autoTopupDetails } = await this.get<definitions['LineDetails']>(
      `/${lineNumber}/details`,
    );
    return { autoTopupDetails };
  }

  async getAssociatedPlan(
    lineNumber: string,
  ): Promise<NexusGenFieldTypes['LinePlan']> {
    const response = await this.get<definitions['LinePlan']>(
      `/${lineNumber}/plan`,
    );
    return mapAssociatedPlanDetails(response);
  }

  async getAllowances(
    lineNumber: string,
  ): Promise<NexusGenAllTypes['LineAllowancesType']> {
    const response = await this.get<definitions['LineAllowances']>(
      `/${lineNumber}/allowances`,
    );
    return mapLineAllowances(response);
  }
}

export default LineDetailsServiceAPI;
