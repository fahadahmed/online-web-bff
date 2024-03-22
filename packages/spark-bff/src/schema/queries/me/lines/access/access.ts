import { extendType } from 'nexus';
import { AssociatedUser, AccessFilterFlags } from '../../associatedUser';

export const LineAccess = extendType({
  type: 'Line',
  definition(t) {
    t.list.field('associatedUsers', {
      type: AssociatedUser,
      description: 'Users with access to the line',
      args: AccessFilterFlags,
      async resolve(
        { lineNumber },
        filterArgs,
        { dataSources: { accessAPI } },
      ) {
        return accessAPI.getAssociatedUsers(
          filterArgs.number || lineNumber,
          'line',
          filterArgs,
        );
      },
    });
  },
});
