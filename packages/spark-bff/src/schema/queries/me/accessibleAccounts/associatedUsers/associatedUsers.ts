import { extendType } from 'nexus';
import { AssociatedUser, AccessFilterFlags } from '../../associatedUser';

export const AccountAccess = extendType({
  type: 'AccountAccessInformation',
  definition(t) {
    t.list.field('associatedUsers', {
      type: AssociatedUser,
      description: 'Users with access to the account',
      args: AccessFilterFlags,
      async resolve(
        { accountNumber },
        filterArgs,
        { dataSources: { accessAPI } },
      ) {
        return accessAPI.getAssociatedUsers(
          filterArgs.number || accountNumber,
          'account',
          filterArgs,
        );
      },
    });
  },
});
