import isBefore from 'date-fns/isBefore';
import parseISO from 'date-fns/parseISO';
import { definitions } from 'generated/typings/usageHistoryService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

const transformPeriodBreakdown = ({
  breakdownType,
  periodBreakdownId,
  periodUsage,
  periodGroupUsage,
  periodLimit,
  periodGroupLimit,
  periodRemaining,
  periodGroupRemaining,
}: definitions['PeriodBreakdown']): NexusGenRootTypes['LineUsageHistoryPeriodBreakdown'] => ({
  breakdownType,
  periodBreakdownId,
  periodUsage,
  periodGroupUsage,
  periodLimit,
  periodGroupLimit,
  periodRemaining,
  periodGroupRemaining,
});

const transformSummarisedPeriods = ({
  startDateTime,
  endDateTime,
  unbilled,
  periodUsage,
  periodGroupUsage,
  periodBreakdown,
}: definitions['SummaryPeriodUsage']): NexusGenRootTypes['LineUsageHistorySummaryPeriod'] => ({
  startDateTime,
  endDateTime,
  unbilled,
  periodUsage,
  periodGroupUsage,
  periodBreakdown: periodBreakdown?.map((period) =>
    transformPeriodBreakdown(period),
  ),
});

export const transformUsageHistory = ({
  interval,
  accountType,
  sharerType,
  endDateTime,
  averagePeriodUsage,
  averageGroupPeriodUsage,
  summarisedPeriods,
}: definitions['UsageHistoryV2']): NexusGenRootTypes['LineUsageHistory'] => {
  const startDateTimeString = summarisedPeriods
    .map((summarisedPeriod) => {
      return summarisedPeriod.startDateTime;
    })
    .reduce((earliestStartDateTime, currentStartDateTime) => {
      if (
        isBefore(
          parseISO(currentStartDateTime),
          parseISO(earliestStartDateTime),
        )
      ) {
        return currentStartDateTime;
      }
      return earliestStartDateTime;
    }, summarisedPeriods[0].startDateTime);

  return {
    interval,
    accountType,
    sharerType,
    startDateTime: startDateTimeString,
    endDateTime,
    averagePeriodUsage,
    averageGroupPeriodUsage,
    summarisedPeriods: summarisedPeriods.map((summary) =>
      transformSummarisedPeriods(summary),
    ),
  };
};
