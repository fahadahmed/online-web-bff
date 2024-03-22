import { objectType, extendType, enumType } from 'nexus';

const MFAOption = enumType({
  name: 'mfaOption',
  members: ['none', 'email'],
  description: 'Multi factor authentication',
});

const Origin = enumType({
  name: 'Origin',
  members: ['MySpark', 'MYSB', 'Facebook', 'Google', 'Apple'],
  description: 'Origin of registration',
});

export const ProfileInfo = objectType({
  name: 'ProfileInfo',
  description: 'Profile info of the user',
  definition(t) {
    t.nullable.string('firstName', {
      description: "User's first name",
    });
    t.nullable.string('lastName', {
      description: "User's last name",
    });
    t.string('lastLogin', {
      description: 'The Unix Epoch Date when the user logged in last time',
    });
    t.boolean('isVerified', {
      description: 'User account verification status',
    });
    t.nullable.string('businessName', {
      description: 'Company or business name for business users',
    });
    t.field('origin', {
      type: Origin,
      description: 'Origin of registration',
    });
    t.string('loginOption', {
      description: 'The type of the App user used to sign in',
    });
    t.string('sparkID', {
      description: 'Spark SSC ID',
    });
    t.string('email', {
      description: "User's email address",
    });
    t.string('displayName', {
      description: "Users's display name",
    });
    t.field('mfaOption', {
      type: MFAOption,
      description: 'Users mfa selection',
    });
    t.nullable.string('csrTNumber', {
      description:
        'Customer Service Representative - T-Number for Impersonate mode',
    });
  },
});

export const Profile = extendType({
  type: 'User',
  definition(t) {
    t.field('profile', {
      type: ProfileInfo,
      description: 'Logged in users claims/ profile information',
      async resolve(_, __, { dataSources: { userInfoAPI } }) {
        return userInfoAPI.getUserProfile();
      },
    });
  },
});
