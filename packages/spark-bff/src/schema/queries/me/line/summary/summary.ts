import { extendType } from 'nexus';

export const LineExtendedWithLineDetailServices = extendType({
  type: 'Line',
  definition(t) {
    t.field('summary', {
      type: 'LineSummary',
      async resolve(
        { lineNumber },
        _,
        { dataSources: { lineSummaryServiceAPI } },
      ) {
        return lineSummaryServiceAPI.getLineSummary(lineNumber);
      },
    });
  },
});
