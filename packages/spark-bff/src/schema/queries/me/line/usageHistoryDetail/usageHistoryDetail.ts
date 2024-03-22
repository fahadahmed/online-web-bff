import { arg, extendType, objectType, stringArg } from 'nexus';

const LineUsageHistoryDetailPeriodUsage = objectType({
  name: 'LineUsageHistoryDetailPeriodUsage',
  definition(t) {
    t.float('value', {
      description:
        'The usage during this period; this should be rounded to have no more than two decimal places',
    });
    t.field('unit', {
      type: 'LineUsageHistoryPeriodUsageUnit',
      description: 'the units of the value',
    });
  },
});

const LineUsageHistoryDetailPeriodLimit = objectType({
  name: 'LineUsageHistoryDetailPeriodLimit',
  definition(t) {
    t.float('value', {
      description:
        'The limit during this period; this should be rounded to have no more than two decimal places',
    });
    t.field('unit', {
      type: 'LineUsageHistoryPeriodUsageUnit',
      description: 'the units of the value',
    });
  },
});

const LineUsageHistoryDetailPeriodRemaining = objectType({
  name: 'LineUsageHistoryDetailPeriodRemaining',
  definition(t) {
    t.float('value', {
      description:
        "What's remaining during this period; this should be rounded to have no more than two decimal places",
    });
    t.field('unit', {
      type: 'LineUsageHistoryPeriodUsageUnit',
      description: 'the units of the value',
    });
  },
});

export const LineUsageHistoryDetailContributingProducts = objectType({
  name: 'LineUsageHistoryDetailContributingProducts',
  definition(t) {
    t.nullable.string('offerId', {
      description: 'The offerId for this specific product',
    });
    t.string('productName', {
      description: 'The name for this specific product',
    });
    t.string('acquisitionDate', {
      description: 'The date of acquisition for this specific product',
    });
    t.field('periodUsage', {
      type: LineUsageHistoryDetailPeriodUsage,
    });
    t.nullable.field('periodGroupUsage', {
      type: LineUsageHistoryDetailPeriodUsage,
    });
    t.nullable.field('periodLimit', {
      type: LineUsageHistoryDetailPeriodLimit,
    });
    t.nullable.field('periodGroupLimit', {
      type: LineUsageHistoryDetailPeriodLimit,
    });
    t.nullable.field('periodRemaining', {
      type: LineUsageHistoryDetailPeriodRemaining,
    });
    t.nullable.field('periodGroupRemaining', {
      type: LineUsageHistoryDetailPeriodRemaining,
    });
  },
});

export const LineUsageHistoryDetail = objectType({
  name: 'LineUsageHistoryDetail',
  definition(t) {
    t.field('interval', {
      type: 'LineHistoryInterval',
      description: 'The unit of time that the usage data is aggregated by',
    });
    t.field('breakdownType', {
      description: 'The type of breakdown associated with this usage history.',
      type: 'LineUsageHistoryPeriodBreakdownType',
    });
    t.string('startDateTime', {
      description: 'The start of the usage history history',
    });
    t.string('endDateTime', {
      description: 'The end of the usage history history',
    });
    t.field('periodUsage', {
      type: LineUsageHistoryDetailPeriodUsage,
      description: 'The usage covered during this period',
    });
    t.nullable.field('periodGroupUsage', {
      type: LineUsageHistoryDetailPeriodUsage,
      description: 'The group usage covered during this period',
    });
    t.nullable.boolean('unbilled');
    t.list.field('contributingProducts', {
      type: LineUsageHistoryDetailContributingProducts,
      description:
        'An array of the products that contributed to this usage over the nominated period. If no products are identified for the period then an empty array will be returned.',
    });
  },
});

const LineUsageHistoryDetailArgs = {
  usageType: arg({ type: 'LineUsageHistoryUsageType' }),
  interval: arg({ type: 'LineHistoryInterval' }),
  periodBreakdownId: stringArg(),
};

export const LineWithUsageHistoryDetails = extendType({
  type: 'Line',
  definition(t) {
    t.field('usageHistoryDetail', {
      type: LineUsageHistoryDetail,
      args: LineUsageHistoryDetailArgs,
      async resolve(
        { lineNumber },
        { usageType, interval, periodBreakdownId },
        { dataSources: { usageHistoryServiceAPI } },
      ) {
        return usageHistoryServiceAPI.getUsageHistoryDetails(
          lineNumber,
          usageType,
          interval,
          periodBreakdownId,
        );
      },
    });
  },
});
