import { definitions } from 'generated/typings/usageHistoryService';
import {
  arg,
  enumType,
  extendType,
  nullable,
  objectType,
  stringArg,
} from 'nexus';

type BreakdownType =
  definitions['SummaryPeriodUsage']['periodBreakdown'][0]['breakdownType'];

const lineUsageHistoryPeriodBreakdownTypes: BreakdownType[] = [
  'PLAN',
  'ADDITIONAL_INCLUDED',
  'ADDITIONAL_PAID',
];

type SharerType = definitions['UsageHistoryV2']['sharerType'];

const lineUsageHistorySharerTypes: SharerType[] = [
  'NOT_SHARED',
  'LEADER',
  'SHARER',
];

export const LineUsageHistoryPeriodBreakdownType = enumType({
  name: 'LineUsageHistoryPeriodBreakdownType',
  members: lineUsageHistoryPeriodBreakdownTypes,
});

export const LineUsageHistorySharerType = enumType({
  name: 'LineUsageHistorySharerType',
  members: lineUsageHistorySharerTypes,
});

export const LineUsageHistoryUsageType = enumType({
  name: 'LineUsageHistoryUsageType',
  members: ['DATA', 'VOICE', 'SMS'],
});

export const LineUsageHistoryPeriodUsageUnit = enumType({
  name: 'LineUsageHistoryPeriodUsageUnit',
  members: ['GB', 'MB', 'MIN', 'TEXT'],
});

const LineUsageHistoryPeriodUsage = objectType({
  name: 'LineUsageHistoryPeriodUsage',
  definition(t) {
    t.float('value', {
      description:
        'The usage during this period; this should be rounded to have no more than two decimal places',
    });
    t.field('unit', {
      type: LineUsageHistoryPeriodUsageUnit,
      description: 'the units of the value',
    });
  },
});

const LineUsageHistoryPeriodLimit = objectType({
  name: 'LineUsageHistoryPeriodLimit',
  definition(t) {
    t.float('value', {
      description:
        'The limit / cap during this period; this should be rounded to have no more than two decimal places',
    });
    t.field('unit', {
      type: LineUsageHistoryPeriodUsageUnit,
      description: 'The units of the value',
    });
  },
});

const LineUsageHistoryPeriodRemaining = objectType({
  name: 'LineUsageHistoryPeriodRemaining',
  definition(t) {
    t.float('value', {
      description:
        'The amount remaining during this period; this should be rounded to have no more than two decimal places',
    });
    t.field('unit', {
      type: LineUsageHistoryPeriodUsageUnit,
      description: 'The units of the value',
    });
  },
});

const LineUsageHistoryPeriodBreakdown = objectType({
  name: 'LineUsageHistoryPeriodBreakdown',
  definition(t) {
    t.field('breakdownType', {
      type: LineUsageHistoryPeriodBreakdownType,
    });
    t.nullable.string('periodBreakdownId', {
      description: 'The breakdown ID',
    });
    t.field('periodUsage', {
      type: LineUsageHistoryPeriodUsage,
    });
    t.nullable.field('periodGroupUsage', {
      type: LineUsageHistoryPeriodUsage,
    });
    t.nullable.field('periodLimit', {
      type: LineUsageHistoryPeriodLimit,
    });
    t.nullable.field('periodGroupLimit', {
      type: LineUsageHistoryPeriodLimit,
    });
    t.nullable.field('periodRemaining', {
      type: LineUsageHistoryPeriodRemaining,
    });
    t.nullable.field('periodGroupRemaining', {
      type: LineUsageHistoryPeriodRemaining,
    });
  },
});

export const LineUsageHistorySummaryPeriod = objectType({
  name: 'LineUsageHistorySummaryPeriod',
  definition(t) {
    t.string('startDateTime', {
      description: 'The start of this specific time period',
    });
    t.string('endDateTime', {
      description: 'The end of this specific time period',
    });
    t.field('periodUsage', {
      type: LineUsageHistoryPeriodUsage,
    });
    t.nullable.field('periodGroupUsage', {
      type: LineUsageHistoryPeriodUsage,
    });
    t.nullable.boolean('unbilled');
    t.nullable.list.field('periodBreakdown', {
      type: LineUsageHistoryPeriodBreakdown,
    });
  },
});

export const LineUsageHistory = objectType({
  name: 'LineUsageHistory',
  definition(t) {
    t.field('interval', {
      type: 'LineHistoryInterval',
      description: 'The unit of time that the usage data is aggregated by',
    });
    t.field('accountType', {
      description: 'The type of account associated with this usage summary.',
      type: 'BalanceManagement',
    });
    t.field('sharerType', {
      description: 'Indicates whether this plan is currently shared',
      type: LineUsageHistorySharerType,
    });
    t.string('startDateTime', {
      description: 'The start of the usage history summary',
    });
    t.string('endDateTime', {
      description: 'The end of the usage history summary',
    });
    t.field('averagePeriodUsage', {
      type: LineUsageHistoryPeriodUsage,
      description: 'The average for the type of usage covered by this response',
    });
    t.nullable.field('averageGroupPeriodUsage', {
      type: LineUsageHistoryPeriodUsage,
      description:
        'The group average for the type of usage covered by this response',
    });
    t.list.field('summarisedPeriods', {
      type: LineUsageHistorySummaryPeriod,
      description:
        'Summarised periods covered in this historical usage query sorted chronologically based on startDateTime',
    });
  },
});

const LineUsageHistoryArgs = {
  usageType: arg({ type: LineUsageHistoryUsageType }),
  interval: arg({ type: 'LineHistoryInterval' }),
  start: nullable(stringArg()),
  end: nullable(stringArg()),
};

export const LineWithUsageHistory = extendType({
  type: 'Line',
  definition(t) {
    t.field('usageHistory', {
      type: LineUsageHistory,
      args: LineUsageHistoryArgs,
      async resolve(
        { lineNumber },
        { usageType, interval, start, end },
        { dataSources: { usageHistoryServiceAPI } },
      ) {
        return usageHistoryServiceAPI.getUsageHistory(
          lineNumber,
          usageType,
          interval,
          start,
          end,
        );
      },
    });
  },
});
