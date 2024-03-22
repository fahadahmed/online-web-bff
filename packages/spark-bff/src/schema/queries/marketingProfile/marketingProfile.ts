// Reference: https://sparknz.sharepoint.com/sites/DigitalAnalytics/Shared%20Documents/Forms/AllItems.aspx?id=/sites/DigitalAnalytics/Shared%20Documents/Digital%20Optimisation%20Chapter/Standards%20and%20Best%20Practices/Analytics/Digital%20Data%20Layer/Spark%20Data%20Layer%20Design/Markdown/user.pdf&parent=/sites/DigitalAnalytics/Shared%20Documents/Digital%20Optimisation%20Chapter/Standards%20and%20Best%20Practices/Analytics/Digital%20Data%20Layer/Spark%20Data%20Layer%20Design/Markdown&p=true&originalPath=aHR0cHM6Ly9zcGFya256LnNoYXJlcG9pbnQuY29tLzpiOi9zL0RpZ2l0YWxBbmFseXRpY3MvRVVlQnE1aS1Rc2RBa0xOd2IwSi1ocU1CNlpBcVRGeGdvMmJoQ19WWmtYTTNSQT9ydGltZT05ZWpmNkxFdjJVZw

import { queryField, objectType } from 'nexus';

const UserProfileInfo = objectType({
  name: 'UserProfileInfo',
  description: 'ProfileInfo object belongs to UserProfile object',
  definition(t) {
    t.string('profileID', {
      description: 'Unique user id of the authenticated MySpark user',
    });
  },
});

const UserProfileAttributeProduct = objectType({
  name: 'UserProfileAttributeProduct',
  description:
    'This object provides details of products users have access to regardless of access type',
  definition(t) {
    t.nullable.string('numberOfPostpaidMobile', {
      description:
        'Number of postpaid mobiles the user has access to regardless of access type (e.g.postpaid mobile as part of account level accessor line level access',
    });
    t.nullable.string('numberOfPrepaidMobile', {
      description: 'Number of prepaid mobile the user has access to',
    });
    t.nullable.string('numberOfBroadband', {
      description:
        'Number of broadbands the user has access to regardless of technology (e.g. Fibre, ADSL/VDSLorWireless)',
    });
    t.nullable.string('numberOfLandline', {
      description:
        'Number of landlines the user has access to regardless of technology (e.g. CopperorWireless)',
    });
    t.nullable.string('numberOfProduct', {
      description: 'Total number of products/lines the user has access to',
    });
    t.nullable.string('productTypes', {
      description:
        'Array of product types user has access to (e.g.MOBILE_POSTPAID_NOTERM,FIBRE_DATA)',
    });
  },
});

const UserProfileAttributeAccess = objectType({
  name: 'UserProfileAttributeAccess',
  description:
    'This object provides details of product and account user has account level access to',
  definition(t) {
    t.nullable.string('numberOfAccount', {
      description: 'Number of account level access excluding prepaid mobile',
    });
    t.nullable.string('numberOfPostpaidMobile', {
      description:
        'Number of line level access for postpaid mobile the user has',
    });
    t.nullable.string('numberOfPrepaidMobile', {
      description:
        'Number of line level access for prepaid mobile the user has',
    });
    t.nullable.string('numberOfAccess', {
      description:
        'Total number of access (account or line level access) the user has',
    });
  },
});

const UserProfileAttributeLineCustomer = objectType({
  name: 'UserProfileAttributeLineCustomer',
  description:
    'Provides customer segment detail for line level for product user is interacting with',
  definition(t) {
    t.nullable.string('segment', {
      description:
        'Customer segment in Spark CRM for product the user is interacting with',
    });
    t.nullable.string('lineOfBusiness', {
      description:
        'Line of business in Spark CRM for product the user is interacting with',
    });
    t.nullable.string('legalCategory', {
      description:
        'Legal category in Spark CRM for product the user is interacting with',
    });
  },
});

const UserProfileAttributeLineProduct = objectType({
  name: 'UserProfileAttributeLineProduct',
  description:
    'Provides line level detail for product user is interactingw ith',
  definition(t) {
    t.nullable.string('servicePlanID', {
      description: 'Plan ID for product the user is interacting with',
    });
    t.nullable.string('servicePlanName', {
      description: 'Service Plan name for product the user is interacting with',
    });
    t.nullable.string('servicePlanType', {
      description: 'Service Plan type for product the user is interacting with',
    });
  },
});

const UserProfileAttributeLine = objectType({
  name: 'UserProfileAttributeLine',
  description:
    'This object provides line level details of product user is interacting with',
  definition(t) {
    t.nullable.field('customer', {
      type: UserProfileAttributeLineCustomer,
      description:
        'Provides customer segment detail for line level for product user is interacting with',
    });
    t.nullable.field('product', {
      type: UserProfileAttributeLineProduct,
      description:
        'Provides line level detail for product user is interacting with',
    });
  },
});

const CRMAttributes = objectType({
  name: 'CRMAttributes',
  description: 'This object provides details form SPARK CRM',
  definition(t) {
    t.nullable.string('segment', {
      description:
        'A comma separated list of unique customer segments (Consumer or Business) the users linked access is associated in Sparks CRM system.',
    });
    t.nullable.string('lineOfBusiness', {
      description:
        'A comma separated list of unique line of business segments (Spark, Skinny, Wholesale) the users linked access is associated in Sparks CRM system.',
    });
    t.nullable.string('legalCategory', {
      description:
        'A comma separated list of unique legal categories (Individual, Business) the users linked access is associated in Sparks CRM system.',
    });
  },
});

const UserProfileAttribute = objectType({
  name: 'UserProfileAttribute',
  description: 'Profile attribute',
  definition(t) {
    t.nullable.field('sparkCRM', {
      type: CRMAttributes,
      description:
        'This object provides details of product and account user has account level access to',
    });
    t.nullable.string('loginOption', {
      description:
        'The type of login user used to sign in (.e.g.Spark, Facebook, Googleor Apple)',
    });
    t.nullable.string('authState', {
      description: 'Identifies users according to their authentication status',
    });
    t.nullable.string('multiFactorAuthType', {
      description:
        'Identifies users according to the type of service used to authenticate',
    });
    t.nullable.boolean('rememberMe', {
      description: 'Identifies if user has selected remember me when loging in',
    });
    t.nullable.field('product', {
      type: UserProfileAttributeProduct,
      description:
        'This object provides details of products users have access to regardless of access type',
    });
    t.nullable.field('access', {
      type: UserProfileAttributeAccess,
      description:
        'This object provides details of product and account user has account level access to',
    });
    t.nullable.field('line', {
      type: UserProfileAttributeLine,
      description:
        'This object provides line level details of product user is interacting with',
    });
  },
});

const UserProfileSocial = objectType({
  name: 'UserProfileSocial',
  description: 'This object provides details of social login for user',
  definition(t) {
    t.nullable.string('google', {
      description: 'Unique Google id associated with MySpark user',
    });
    t.nullable.string('facebook', {
      description: 'Unique Facebook id associated with MySpark user',
    });
    t.nullable.string('apple', {
      description:
        'This is not required as part of initial data layer implementation',
    });
  },
});

const UserProfile = objectType({
  name: 'UserProfile',
  description: 'Profile object for marketing user object',
  definition(t) {
    t.field('profileInfo', {
      type: UserProfileInfo,
      description:
        'This object provides details of profile information for user',
    });
    t.field('attributes', {
      type: UserProfileAttribute,
      description: 'This object provides extensibility to the profile object',
    });
    t.nullable.field('social', {
      type: UserProfileSocial,
      description: 'This object provides details of social login for user',
    });
  },
});

export const profileQueryField = queryField((t) => {
  t.field('marketingProfile', {
    type: UserProfile,
    description: 'This object provides details of user lever profile details',
    resolve(_, _input, { dataSources: { profileServiceAPI } }) {
      return profileServiceAPI.getMarketingProfile();
    },
  });
});
