import { extendType, list, nullable } from 'nexus';
import { LineType } from '../../../common';

export const LineSummariesQueryField = extendType({
  type: 'User',
  definition(t) {
    t.list.field('lineSummaries', {
      type: 'LineSummary',
      args: { lineTypes: nullable(list(LineType)) },
      description: 'Gets summary of all lines associated with SparkID',
      async resolve(
        _,
        { lineTypes },
        { dataSources: { lineSummaryServiceAPI } },
      ) {
        return lineSummaryServiceAPI.getLineSummaries(lineTypes);
      },
    });
  },
});
