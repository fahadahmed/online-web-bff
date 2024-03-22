import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/profileService';
import { constructProfileResponse } from './helpers/profileService.helper';

class ProfileServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/marketing');
  }

  async getMarketingProfile() {
    const deslResponse = await this.get<definitions['ProfileResponse']>(
      '/profile/me',
    );
    return constructProfileResponse(deslResponse);
  }
}

export default ProfileServiceAPI;
