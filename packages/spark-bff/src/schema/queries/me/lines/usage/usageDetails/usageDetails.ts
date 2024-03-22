import { enumType, extendType, objectType } from 'nexus';

export const LineSoftCapUnit = enumType({
  name: 'LineSoftCapUnit',
  members: ['GB', 'MB'],
});

export const LineServiceType = enumType({
  name: 'LineServiceType',
  members: ['MOBILE', 'BROADBAND', 'WIRELESS_BROADBAND', 'COPPER'],
});

export const LineUsageCategory = enumType({
  name: 'LineUsageCategory',
  members: ['DATA', 'TALK', 'TEXT'],
});

export const LineUsageCapUnit = enumType({
  name: 'LineUsageCapUnit',
  members: ['GB', 'MB', 'MIN', 'TEXT'],
});

export const LineUsageRenewal = enumType({
  name: 'LineUsageRenewal',
  members: ['AutoTopup', 'GuaranteedRenewal'],
});

export const LineUsageBillingStatus = enumType({
  name: 'LineUsageBillingStatus',
  members: [
    'ACTIVE',
    'PENDING_FIRST_USE',
    'PENDING_PAYMENT',
    'PENDING_GR',
    'STOPPED',
    'GRACE',
  ],
});

export const LineUsageCap = objectType({
  name: 'LineUsageCap',
  definition(t) {
    t.float('value', {
      description: 'the amount',
    });
    t.field('unit', {
      type: LineUsageCapUnit,
      description: 'the units the value represents',
    });
  },
});

export const LineUsageUsed = objectType({
  name: 'LineUsageUsed',
  definition(t) {
    t.float('value', {
      description: 'the amount',
    });
    t.field('unit', {
      type: LineUsageCapUnit,
      description: 'the units the value represents',
    });
    t.nullable.float('bySharer', {
      description:
        'The amount used by this sharer (optional; only returned for sharer lines).',
    });
  },
});

export const LineUsageExpiry = objectType({
  name: 'LineUsageExpiry',
  definition(t) {
    t.string('date', {
      description: 'The date when the plan or pack expires',
    });
    t.nullable.float('value', {
      description: 'The amount of usage which is going to expire',
    });
    t.nullable.field('unit', {
      type: LineUsageCapUnit,
      description:
        'The amount used by this sharer (optional; only returned for sharer lines).',
    });
  },
});

export const LineUsage = objectType({
  name: 'LineUsage',
  definition(t) {
    t.nullable.int('priority', {
      description: 'Indicates the order in which allowances are used.',
    });
    t.field('category', {
      type: LineUsageCategory,
      description: 'The type of usage represented by this object',
    });
    t.nullable.string('productId', {
      description:
        'The Siebel product instance id of the product this usage relates to.',
    });
    t.nullable.string('productName', {
      description: 'The name of the product which the usage relates to.',
    });
    t.nullable.boolean('roaming', {
      description: 'whether this usage was roaming or local',
    });
    t.nullable.string('name', {
      description:
        'The name of the pack or extra this usage instance relates to',
    });
    t.nullable.field('billingStatus', {
      type: LineUsageBillingStatus,
      description: 'The billing status for the plan or extra.',
    });
    t.boolean('uncapped', {
      description: 'Uncapped means the usage is Unlimited',
    });
    t.list.string('types', {
      description: 'The type of usage',
    });
    t.nullable.field('cap', {
      type: LineUsageCap,
      description:
        'The maximum for the type of usage; for this, a value of UNLIMITED represents an uncapped usage allowance',
    });
    t.field('used', {
      type: LineUsageUsed,
      description:
        'the current amount used.  If there is an UNLIMITED cap, the value will be UNLIMITED.',
    });
    t.nullable.field('remaining', {
      type: LineUsageCap,
      description:
        'the current amount remaining.  If there is an UNLIMITED cap, the value will be UNLIMITED',
    });
    t.nullable.list.field('expiry', {
      type: LineUsageExpiry,
      description: 'Details related to when the pack or plan expires',
    });
    t.nullable.string('nextRenewalDate', {
      description: 'The date this usage rolls over (renews)',
    });
    t.nullable.field('renewal', {
      type: LineUsageRenewal,
      description:
        'If the product that contains this usage auto-renews, contains how it auto renews.',
    });
    t.nullable.field('rolloverData', {
      type: LineUsageExpiry,
      description: 'Rollover accumulated data.',
    });
    t.nullable.list.field('rolloverExpiry', {
      type: LineUsageExpiry,
      description: 'Details related to when the pack or plan expires',
    });
  },
});

export const LineWithUsageDetail = extendType({
  type: 'Line',

  definition(t) {
    t.field('serviceType', {
      type: LineServiceType,
      description: 'The type of service the usage is for',
      async resolve(
        { lineNumber },
        _,
        { dataSources: { usageDetailsServiceAPI } },
      ) {
        return usageDetailsServiceAPI.getLineServiceType(lineNumber);
      },
    });
    t.nullable.field('balanceManagement', {
      type: 'BalanceManagement',
      description:
        'Whether the service follows a prepaid billing model, or a postpaid model',
      async resolve(
        { lineNumber },
        _,
        { dataSources: { lineSummaryServiceAPI } },
      ) {
        return lineSummaryServiceAPI.getLineBalanceManagement(lineNumber);
      },
    });
    t.list.field('usages', {
      type: LineUsage,
      description:
        'An array of the types of usage that are applicable to the connection',
      async resolve(
        { lineNumber },
        _,
        { dataSources: { usageDetailsServiceAPI } },
      ) {
        return usageDetailsServiceAPI.getLineUsageDetails(lineNumber);
      },
    });
    t.nullable.string('groupID', {
      description: 'A reference to the group',
      async resolve(
        { lineNumber },
        _,
        { dataSources: { usageDetailsServiceAPI } },
      ) {
        const line = await usageDetailsServiceAPI.getLine(lineNumber);
        return line?.group?.id;
      },
    });
    t.nullable.string('groupProfile', {
      description:
        'In the case of shared group constructs the role of the line within the share construct is available',
      async resolve(
        { lineNumber },
        _,
        { dataSources: { usageDetailsServiceAPI } },
      ) {
        const line = await usageDetailsServiceAPI.getLine(lineNumber);
        return line?.group?.shareProfile;
      },
    });
    t.nullable.int('groupCapValue', {
      description:
        'The optional soft cap (will only be present for some sharers)',
      async resolve(
        { lineNumber },
        _,
        { dataSources: { usageDetailsServiceAPI } },
      ) {
        const line = await usageDetailsServiceAPI.getLine(lineNumber);
        return line?.group?.softcapValue;
      },
    });
    t.nullable.field('groupCapUnit', {
      type: LineSoftCapUnit,
      description: 'The units of the soft cap',
      async resolve(
        { lineNumber },
        _,
        { dataSources: { usageDetailsServiceAPI } },
      ) {
        const line = await usageDetailsServiceAPI.getLine(lineNumber);
        return line?.group?.softcapUnit;
      },
    });
  },
});
