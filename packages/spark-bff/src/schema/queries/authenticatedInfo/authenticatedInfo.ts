import { objectType, queryField } from 'nexus';
import { ProfileInfo } from '../me/profile';

export const AuthenticatedInfoResponse = objectType({
  name: 'AuthenticatedInfoResponse',
  description: 'Profile info of the user',
  definition(t) {
    t.boolean('isLoggedIn', {
      description: 'Indicates if a user is logged in as a Guest/MySpark user',
    });
    t.boolean('isGuest', {
      description: 'Indicates if a user is a Guest',
    });
    t.boolean('hasSparkId', {
      description: 'Indicates if a user is a MySpark user',
    });
    t.nullable.field('profile', {
      type: ProfileInfo,
      description: 'User profile object',
    });
  },
});

export const AuthenticatedInfo = queryField('authenticatedInfo', {
  type: AuthenticatedInfoResponse,
  description: 'Gets the logged in status of a user',

  async resolve(_, ___, { dataSources: { userInfoAPI } }) {
    return userInfoAPI.getUserProfileWithErrorHandling();
  },
});
