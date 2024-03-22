import {
  DESLDataSource,
  constructSuccessResponse,
  constructErrorResponse,
} from 'datasources/common';
import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/identityService';

class IdentityServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/user/identity');
  }

  async updateName(
    input: NexusGenInputs['UpdateNameInput'],
  ): Promise<NexusGenRootTypes['UpdateNameResponse']> {
    const { firstName, lastName } = input;
    try {
      const response = await this.patch<definitions['Response']>('/me', {
        firstName,
        lastName,
      });
      return constructSuccessResponse(response);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
}

export default IdentityServiceAPI;
