import { extendType, list } from 'nexus';

export const UsageSummaryForAllLines = extendType({
  type: 'User',
  definition(t) {
    t.nullable.field('usageSummary', {
      type: list('LineUsageSummary'),

      async resolve(_, __, { dataSources: { usageServicesAPI, accessAPI } }) {
        const lines = await accessAPI.getLines();

        const usageSummaryList = await usageServicesAPI.getUsageSummary(lines);

        return usageSummaryList;
      },
    });
  },
});
