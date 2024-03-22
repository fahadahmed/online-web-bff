import { extendType } from 'nexus';

export const ChangeExtraFeasibility = extendType({
  type: 'Line',
  definition(t) {
    t.field('changeExtraFeasibility', {
      type: 'OrderFeasibility',
      async resolve({ lineNumber }, _, { dataSources: { orderAPI } }) {
        return orderAPI.getChangeExtraFeasibility(lineNumber);
      },
    });
  },
});
