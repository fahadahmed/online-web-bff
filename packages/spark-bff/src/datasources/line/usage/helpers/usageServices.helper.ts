import { NexusGenRootTypes, NexusGenEnums } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/usageService';

function getProductIcon(
  line: definitions['Line'],
): NexusGenEnums['ProductIconType'] {
  if (line.serviceType !== 'MOBILE') {
    return 'BROADBAND';
  }

  return line.usage.find(
    (usage) =>
      usage.category === 'DATA' &&
      usage.name === 'AGGREGATED' &&
      usage.unCapped,
  )
    ? 'MOBILE_INFINITY'
    : 'MOBILE';
}

function getTopUpOrBuyExtra(
  line: definitions['Line'],
): NexusGenEnums['TopUpBuyExtraType'] {
  if (line.balanceManagement !== 'PREPAID') {
    return null;
  }
  const dataUsageItem = line.usage.find(
    (usage) =>
      usage.category === 'DATA' &&
      usage.name === 'AGGREGATED' &&
      usage.renewal === null,
  );
  if (dataUsageItem === null) {
    return null;
  }
  return line.usage.find(
    (usage) =>
      usage.category === 'DATA' &&
      usage.name === 'AGGREGATED' &&
      usage.remaining?.value <= 0,
  )
    ? 'TOPUP'
    : 'BUYEXTRA';
}

export function reduceUsageSummary(
  line?: definitions['Line'],
  displayName?: string,
): NexusGenRootTypes['LineUsageSummary'] | null {
  if (!line) {
    return null;
  }
  const { connectionNumber } = line;
  const result: NexusGenRootTypes['LineUsageSummary'] = {
    lineNumber: connectionNumber,
    displayName,
    groupProfile: line?.group?.shareProfile,
    messagePrimary: line.message?.primary,
    messageSecondary: line.message?.secondary,
    messageTertiary: line.message?.tertiary,
    messageStatus: line.message?.status,
    productIcon: getProductIcon(line),
    topUpBuyExtra: getTopUpOrBuyExtra(line),
  };
  return result;
}
