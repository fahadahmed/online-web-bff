import { enumType, extendType, objectType } from 'nexus';

export const LineUsageMessageStatus = enumType({
  name: 'LineUsageMessageStatus',
  members: ['IMPORTANT', 'WARNING'],
});

export const ProductIconType = enumType({
  name: 'ProductIconType',
  members: ['MOBILE', 'MOBILE_INFINITY', 'WEARABLE', 'BROADBAND'],
});

export const TopUpBuyExtraType = enumType({
  name: 'TopUpBuyExtraType',
  members: ['TOPUP', 'BUYEXTRA'],
});

export const LineUsageSummary = objectType({
  name: 'LineUsageSummary',
  definition(t) {
    t.string('lineNumber');
    t.nullable.string('displayName');
    t.nullable.string('groupProfile');
    t.nullable.string('messagePrimary');
    t.nullable.string('messageSecondary');
    t.nullable.string('messageTertiary');
    t.nullable.field('messageStatus', {
      type: LineUsageMessageStatus,
    });
    t.nullable.field('productIcon', { type: ProductIconType });
    t.nullable.field('topUpBuyExtra', { type: TopUpBuyExtraType });
  },
});

export const LineWithUsage = extendType({
  type: 'Line',
  definition(t) {
    t.nullable.field('usageSummary', {
      type: LineUsageSummary,
      async resolve({ lineNumber }, _, { dataSources: { usageServicesAPI } }) {
        return usageServicesAPI.getUsageSummaryByLineNumber(lineNumber);
      },
    });
  },
});
