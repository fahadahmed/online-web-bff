import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/oidcProxyService';
import { isUnauthenticated } from 'utils/responseErrors.utils';
import { getProfileInfo } from './helpers/profile.helper';

const SPARK_GUEST_LOGIN_OPTION = 'SparkGuest';

class UserInfo extends DESLDataSource {
  constructor() {
    super('/v1/user/oidc');
  }

  async getUserProfile() {
    const userInfo = await this.get<definitions['UserInfo']>('/userInfo');
    return getProfileInfo(userInfo);
  }

  async getUserProfileWithErrorHandling() {
    try {
      const profile = await this.getUserProfile();
      const isGuest = profile.loginOption === SPARK_GUEST_LOGIN_OPTION;

      return {
        isLoggedIn: true,
        isGuest,
        hasSparkId: !isGuest,
        profile,
      };
    } catch (error) {
      if (isUnauthenticated(error)) {
        return {
          isLoggedIn: false,
          isGuest: false,
          hasSparkId: false,
          profile: null,
        };
      }

      throw new Error(error);
    }
  }
}

export default UserInfo;
