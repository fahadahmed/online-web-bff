import { extendType } from 'nexus';

export const ChangePlanFeasibilityQuery = extendType({
  type: 'Line',
  definition(t) {
    t.field('changePlanFeasibility', {
      type: 'OrderFeasibility',
      async resolve({ lineNumber }, _, { dataSources: { orderAPI } }) {
        return orderAPI.getChangePlanFeasibility(lineNumber);
      },
    });
  },
});
