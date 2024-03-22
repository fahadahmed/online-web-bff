import { definitions } from 'generated/typings/oidcProxyService';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import capitalize from 'lodash/capitalize';

const getDisplayName = (userInfo: definitions['UserInfo']) => {
  const { company, firstName, lastName } = userInfo;

  if (firstName) {
    return `${capitalize(firstName)} ${capitalize(lastName)}`;
  }

  return capitalize(company);
};

export const getProfileInfo = (
  userInfo: definitions['UserInfo'],
): NexusGenRootTypes['ProfileInfo'] => {
  const {
    firstName,
    lastName,
    lastLogin,
    isVerified,
    company,
    origin,
    loginOption,
    sparkID,
    email,
    mfaOption,
    act,
  } = userInfo;

  const displayName = getDisplayName(userInfo);

  return {
    firstName: firstName ? capitalize(firstName) : null,
    lastName: firstName ? capitalize(lastName) : null,
    lastLogin,
    isVerified,
    businessName: company ? capitalize(company) : null,
    origin,
    loginOption,
    sparkID,
    email,
    displayName,
    mfaOption,
    csrTNumber: act?.sub ?? null,
  } as NexusGenRootTypes['ProfileInfo'];
};
