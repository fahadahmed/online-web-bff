import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/spendHistoryService';
import { formatNZD } from 'utils';

export function mapPeriodBreakdown(
  periodBreakdown: definitions['PeriodBreakdownDetail'][],
): NexusGenRootTypes['LineSpendHistoryPeriodBreakdownDetail'][] {
  return periodBreakdown?.map(
    ({ breakdownType, periodSpend, periodBreakdownId }) => {
      return { breakdownType, periodSpend, periodBreakdownId };
    },
  );
}

export function mapSummarisedPeriods(
  summarisedPeriodSpend: definitions['SummarisedPeriodSpend'][],
): NexusGenRootTypes['LineSpendHistorySummarisedPeriodSpend'][] {
  return summarisedPeriodSpend?.map(
    ({
      startDateTime,
      endDateTime,
      periodBreakdown,
      unbilled,
      periodSpend,
    }) => {
      return {
        startDateTime,
        endDateTime,
        periodBreakdown: mapPeriodBreakdown(periodBreakdown),
        unbilled,
        periodSpend,
      };
    },
  );
}

const getAbbreviatedProductName = (productName: string, price: number) => {
  const formattedPriceWholeNumber = `${formatNZD(price, 0)} `;
  const formattedPriceWithDecimals = `${formatNZD(price, 2)} `;

  return productName
    .replace(formattedPriceWholeNumber, '')
    .replace(formattedPriceWithDecimals, '');
};

export function mapContributingProducts(
  contributingProduct: definitions['ContributingProduct'][],
): NexusGenRootTypes['LineSpendHistoryContributingProduct'][] {
  return contributingProduct?.map(
    ({
      offerId,
      productName,
      chargeStartDateTime,
      chargeEndDateTime,
      productEndDateTime,
      periodSpend,
    }) => {
      const abbreviatedProductName = getAbbreviatedProductName(
        productName,
        periodSpend,
      );
      return {
        offerId,
        productName: abbreviatedProductName,
        chargeStartDateTime,
        chargeEndDateTime,
        productEndDateTime,
        periodSpend,
      };
    },
  );
}

export function mapSpendHistory(
  response: definitions['IntervalSpendHistoryResponse'],
): NexusGenRootTypes['LineSpendHistoryResponse'] {
  const {
    interval,
    accountType,
    gstInclusive,
    startDateTime,
    endDateTime,
    averagePeriodSpend,
    summarisedPeriods,
  } = response;

  return {
    interval,
    accountType,
    gstInclusive,
    startDateTime,
    endDateTime,
    averagePeriodSpend,
    summarisedPeriods: mapSummarisedPeriods(summarisedPeriods),
  };
}

export function mapSpendHistoryDetail(
  response: definitions['PeriodBreakdownSpendHistoryResponse'],
): NexusGenRootTypes['LineSpendHistoryDetailResponse'] {
  const {
    interval,
    breakdownType,
    gstInclusive,
    startDateTime,
    endDateTime,
    unbilled,
    periodSpend,
    contributingProducts,
  } = response;

  return {
    interval,
    breakdownType,
    gstInclusive,
    startDateTime,
    endDateTime,
    unbilled,
    periodSpend,
    contributingProducts: mapContributingProducts(contributingProducts),
  };
}
