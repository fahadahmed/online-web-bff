import { definitions } from 'generated/typings/usageHistoryService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

const transformContributingProducts = ({
  offerId,
  productName,
  acquisitionDate,
  periodUsage,
  periodGroupUsage,
  periodLimit,
  periodGroupLimit,
  periodRemaining,
  periodGroupRemaining,
}: definitions['ContributingProduct']): NexusGenRootTypes['LineUsageHistoryDetailContributingProducts'] => ({
  offerId,
  productName,
  acquisitionDate,
  periodUsage,
  periodGroupUsage,
  periodLimit,
  periodGroupLimit,
  periodRemaining,
  periodGroupRemaining,
});

export const transformUsageHistoryDetails = ({
  interval,
  breakdownType,
  startDateTime,
  endDateTime,
  unbilled,
  periodUsage,
  periodGroupUsage,
  contributingProducts,
}: definitions['UsageHistoryByPeriodBreakdownIDV2']): NexusGenRootTypes['LineUsageHistoryDetail'] => {
  return {
    interval,
    breakdownType,
    startDateTime,
    endDateTime,
    unbilled,
    periodUsage,
    periodGroupUsage,
    contributingProducts: contributingProducts.map((product) =>
      transformContributingProducts(product),
    ),
  };
};
