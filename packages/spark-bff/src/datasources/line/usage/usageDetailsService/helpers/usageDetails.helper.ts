import { NexusGenEnums, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/usageService';
import { differenceInDays, differenceInHours } from 'date-fns';
import first from 'lodash/first';

export const MEGABYTES_PER_GIGABYTE_BINARY = 1024;

const getDifferenceInHours = (dateString: string) => {
  return (
    dateString &&
    differenceInHours(
      new Date(dateString.substring(0, dateString.length - 1)), // Using subString to remove the time zone from the string and then convert to differenceIndays using date-fns lib
      new Date(),
    )
  );
};

const getPrepositionOfTimeText = (dateString: string) => {
  const expireDays = differenceInDays(
    new Date(dateString.substring(0, dateString.length - 1)),
    new Date(),
  );
  const expiryHours = getDifferenceInHours(dateString); // Using subString to remove the time zone from the string and then convert to differenceInhours using date-fns lib

  if (expireDays === 0) {
    return `at midnight`;
  }
  if (expireDays === 1) {
    return `in ${expiryHours} hours`;
  }
  return `in ${expireDays} days`;
};

function getLineUsageExpiryDetails(
  expiryDetails: definitions['ExpiryDetails'][],
) {
  return expiryDetails.map((expire) => {
    return {
      date: expire.date && `Expires ${getPrepositionOfTimeText(expire.date)}`,
      value: expire.value,
      unit: expire.unit,
    };
  });
}

function sortExpiryDetailsByDifferenceInHours(
  expiryDetails: definitions['ExpiryDetails'][],
) {
  return expiryDetails.sort((firstExpiry, secondExpiry) => {
    return (
      getDifferenceInHours(firstExpiry.date) -
      getDifferenceInHours(secondExpiry.date)
    );
  });
}

function getUsageName(name: string, used: definitions['SharerUsageValue']) {
  if (name === 'Data overage MB' && used.value > 0) {
    return 'Base_Plan';
  }
  return name;
}

function getTotalDataValueInGB(dataInMB: number) {
  return dataInMB / MEGABYTES_PER_GIGABYTE_BINARY;
}

function getLineUsageRolloverDetails(
  expiryDetails: definitions['ExpiryDetails'][],
) {
  let dataUnit: NexusGenEnums['LineUsageCapUnit'];

  const totalRolloverData = expiryDetails.reduce(
    (previousValue, currentValue) => {
      const prevValue =
        previousValue.unit === 'MB'
          ? getTotalDataValueInGB(previousValue.value)
          : previousValue.value;

      const currValue =
        currentValue.unit === 'MB'
          ? getTotalDataValueInGB(currentValue.value)
          : currentValue.value;

      let total = prevValue + currValue;

      if (total < 1) {
        total *= MEGABYTES_PER_GIGABYTE_BINARY;
        dataUnit = 'MB';
      } else {
        dataUnit = 'GB';
      }

      return { date: expiryDetails[0].date, value: total, unit: dataUnit };
    },
    { date: '0000-00-00T00:00:00Z', value: 0, unit: 'MB' },
  );
  return totalRolloverData;
}

export function transformUsageDetails(
  line?: definitions['Line'],
): NexusGenRootTypes['LineUsage'][] | null {
  const { usage } = line;

  const usageDetails = usage.filter((usageDetail) => {
    const isRenewalInFuture =
      getDifferenceInHours(usageDetail.nextRenewalDate) > 0;
    const isAggregated = usageDetail.name === 'AGGREGATED';
    const latestExpiry = sortExpiryDetailsByDifferenceInHours(
      usageDetail.expiry,
    );
    const isNotExpired = getDifferenceInHours(first(latestExpiry)?.date) > 0;

    return isAggregated || isNotExpired || isRenewalInFuture;
  });

  return usageDetails?.map(
    ({
      nextRenewalDate,
      productId,
      expiry,
      name,
      used,
      unCapped,
      ...rest
    }) => ({
      ...rest,
      uncapped: unCapped,
      productId,
      name: getUsageName(name, used),
      used,
      rolloverExpiry: sortExpiryDetailsByDifferenceInHours(expiry),
      rolloverData: getLineUsageRolloverDetails(expiry),
      expiry: getLineUsageExpiryDetails(
        sortExpiryDetailsByDifferenceInHours(expiry),
      ),
      nextRenewalDate:
        nextRenewalDate &&
        `Renews ${getPrepositionOfTimeText(nextRenewalDate)}`,
    }),
  );
}
