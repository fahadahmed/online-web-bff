import {
  constructErrorResponse,
  constructSuccessResponse,
  DESLDataSource,
} from 'datasources/common';
import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import {
  definitions,
  operations,
} from 'generated/typings/lineConfigurationService';
import { transformGroupCaps } from './helpers/lineConfiguration.helper';

type GetUpdateSmartCapBodyParams =
  operations['updateSmartCap']['parameters']['body']['updateSmartCapRequest'];

class LineConfigurationAPI extends DESLDataSource {
  constructor() {
    super('/v1/line/configuration');
  }

  async getShareGroupCaps(
    lineNumber: string,
  ): Promise<NexusGenRootTypes['LineShareGroupCaps']> {
    const groupDetails = await this.get<definitions['GetGroupCapsResponse']>(
      `/${lineNumber}/groupcaps`,
    );
    return transformGroupCaps(groupDetails);
  }

  updateSmartcap(
    input: NexusGenInputs['UpdateSmartCapInput'],
  ): Promise<NexusGenRootTypes['UpdateSmartCapResponse']> {
    const { lineNumber, cap, type, isUncapped } = input;
    const requestBodyParams: GetUpdateSmartCapBodyParams = {
      cap,
      type,
      isUncapped,
    };
    return this.put<definitions['Response']>(
      `/${lineNumber}/smartcap`,
      requestBodyParams,
    )
      .then((response) => {
        return constructSuccessResponse(response);
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }
}

export default LineConfigurationAPI;
