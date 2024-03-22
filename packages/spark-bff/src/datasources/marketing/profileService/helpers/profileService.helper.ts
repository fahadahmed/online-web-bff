import { definitions } from 'generated/typings/profileService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

const LEGAL_CATEGORY = 'snz.user.profile.sparkCRM.legalCategory';
const LOGIN_OPTION = 'snz.user.profile.loginOption';
const LINE_OF_BUSINESS = 'snz.user.profile.sparkCRM.lineOfBusiness';
const NUMBER_OF_BROADBAND = 'snz.user.profile.product.numberOfBroadband';
const NUMBER_OF_LANDLINE = 'snz.user.profile.product.numberOfLandline';
const NUMBER_OF_PRODUCT = 'snz.user.profile.product.numberOfProduct';
const NUMBER_OF_ACCOUNT = 'snz.user.profile.access.numberOfAccount';
const NUMBER_OF_POSTPAID_MOBILE =
  'snz.user.profile.access.numberOfPostpaidMobile';
const NUMBER_OF_PREPAID_MOBILE =
  'snz.user.profile.access.numberOfPrepaidMobile';
const NUMBER_OF_ACCESS = 'snz.user.profile.access.numberOfAccess';
const MFA_TYPE = 'snz.user.profile.multiFactorAuthType';
const PROFILE_ID = 'snz.user.profile.profileID';
const PRODUCT_TYPES = 'snz.user.profile.product.servicePlanType';
const SEGMENT = 'snz.user.profile.sparkCRM.segment';

const getValueForKey = (
  { profileData }: definitions['ProfileResponse'],
  key: string,
) => {
  return profileData.reduce<string>(
    (found, data) => (data.key === key ? data.value : found),
    '',
  );
};

export const constructProfileResponse = (
  deslResponse: definitions['ProfileResponse'],
) => {
  const profile: NexusGenRootTypes['UserProfile'] = {
    profileInfo: {
      profileID: getValueForKey(deslResponse, PROFILE_ID),
    },
    attributes: {
      loginOption: getValueForKey(deslResponse, LOGIN_OPTION),
      authState: 'Authenticated',
      multiFactorAuthType: getValueForKey(deslResponse, MFA_TYPE),
      product: {
        numberOfBroadband: getValueForKey(deslResponse, NUMBER_OF_BROADBAND),
        numberOfLandline: getValueForKey(deslResponse, NUMBER_OF_LANDLINE),
        numberOfProduct: getValueForKey(deslResponse, NUMBER_OF_PRODUCT),
        productTypes: getValueForKey(deslResponse, PRODUCT_TYPES),
      },
      access: {
        numberOfAccount: getValueForKey(deslResponse, NUMBER_OF_ACCOUNT),
        numberOfPostpaidMobile: getValueForKey(
          deslResponse,
          NUMBER_OF_POSTPAID_MOBILE,
        ),
        numberOfPrepaidMobile: getValueForKey(
          deslResponse,
          NUMBER_OF_PREPAID_MOBILE,
        ),
        numberOfAccess: getValueForKey(deslResponse, NUMBER_OF_ACCESS),
      },
      sparkCRM: {
        legalCategory: getValueForKey(deslResponse, LEGAL_CATEGORY),
        lineOfBusiness: getValueForKey(deslResponse, LINE_OF_BUSINESS),
        segment: getValueForKey(deslResponse, SEGMENT),
      },
    },
  };

  return profile;
};
