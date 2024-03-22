import { arg, enumType, extendType, nullable, objectType } from 'nexus';

export const AccountAccessStatus = enumType({
  name: 'AccountAccessStatus',
  members: ['Active', 'Revoked', 'NotFound'],
});

export const AccountAccessInformation = objectType({
  name: 'AccountAccessInformation',
  description: 'Object representing an account',
  definition(t) {
    t.nullable.string('displayName', {
      description: 'The user friendly name of the account',
    });
    t.nullable.string('accountNumber', {
      description: "The account's number",
    });
    t.nullable.field('balanceManagement', {
      type: 'BalanceManagement',
      description:
        'The type of the line (if this is a line level access record), or of all the lines under the account (if this is an account level access record).  Strictly speaking, this is an account-level attribute, but we mostly use it at line level, so I have phrased it that way.',
    });
    t.list.field('lines', {
      type: 'Line',
      description: 'Line numbers associated with the account',
    });
    t.nullable.string('statusText', {
      description: 'The status text for pending account access requests',
    });
  },
});

export const AccessibleAccountsArgs = {
  status: nullable(arg({ type: AccountAccessStatus })),
};

export const AccessibleAccounts = extendType({
  type: 'User',
  definition(t) {
    // Delete this, keeping it here for backward compatibility for access screens
    t.list.field('accounts', {
      deprecation: 'This query will be delete Use accessibleAccounts instead',
      type: AccountAccessInformation,
      description:
        'Accounts the user has access to. DESL API: https://sparknz.atlassian.net/wiki/spaces/DC/pages/921829386/Get+My+Access+API+Design',
      args: AccessibleAccountsArgs,
      async resolve(_, { status }, { dataSources: { accessAPI } }) {
        return accessAPI.getAccounts(status);
      },
    });
    t.list.field('accessibleAccounts', {
      type: AccountAccessInformation,
      description:
        'Accounts the user has access to. DESL API: https://sparknz.atlassian.net/wiki/spaces/DC/pages/921829386/Get+My+Access+API+Design',
      args: AccessibleAccountsArgs,
      async resolve(_, { status }, { dataSources: { accessAPI } }) {
        return accessAPI.getAccounts(status);
      },
    });
  },
});
