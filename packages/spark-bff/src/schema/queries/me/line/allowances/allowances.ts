import { extendType, objectType, enumType } from 'nexus';
import { definitions } from 'generated/typings/lineDetailsService';

type LineAllowanceEntitlementStatusEnum =
  definitions['LineAllowances']['dataStackAllowances'][0]['status'];
const LineAllowanceEntitlementStatusMembers: LineAllowanceEntitlementStatusEnum[] =
  ['ACTIVE', 'GRACE'];
export const LineAllowanceEntitlementStatus = enumType({
  name: 'LineAllowanceEntitlementStatus',
  members: LineAllowanceEntitlementStatusMembers,
});

type LineAllowanceVolumeTypeEnum =
  definitions['LineAllowances']['dataStackAllowances'][0]['volumeType'];
const LineAllowanceVolumeTypeMembers: LineAllowanceVolumeTypeEnum[] = [
  'KB',
  'MB',
  'GB',
];
export const LineAllowanceVolumeType = enumType({
  name: 'LineAllowanceVolumeType',
  members: LineAllowanceVolumeTypeMembers,
});

type LineAllowanceExtraDetailRenewalStateEnum =
  definitions['LineAllowances']['extras'][0]['renewalState'];
const LineAllowanceExtraDetailRenewalStateMembers: LineAllowanceExtraDetailRenewalStateEnum[] =
  ['GUARANTEE_RENEWAL', 'OFF', 'ON', 'PENDING_PAYMENT'];
export const LineAllowanceExtraDetailRenewalState = enumType({
  name: 'LineAllowanceExtraDetailRenewalState',
  members: LineAllowanceExtraDetailRenewalStateMembers,
});

type LineAllowanceExtraDetailSubtypeEnum =
  definitions['LineAllowances']['extras'][0]['subtype'];
const LineAllowanceExtraDetailSubtypeMembers: LineAllowanceExtraDetailSubtypeEnum[] =
  ['DOMESTIC', 'ROAMING'];
export const LineAllowanceExtraDetailSubtype = enumType({
  name: 'LineAllowanceExtraDetailSubtype',
  members: LineAllowanceExtraDetailSubtypeMembers,
});

type LineAllowanceSpeedAllowancesDetailStatusEnum =
  definitions['LineAllowances']['speedAllowances']['status'];
const LineAllowanceSpeedAllowancesDetailStatusMembers: LineAllowanceSpeedAllowancesDetailStatusEnum[] =
  ['DEFAULT', 'ACTIVE', 'NEXT'];
export const LineAllowanceSpeedAllowancesDetailStatus = enumType({
  name: 'LineAllowanceSpeedAllowancesDetailStatus',
  members: LineAllowanceSpeedAllowancesDetailStatusMembers,
});

export const LineAllowanceCountry = objectType({
  name: 'LineAllowanceCountry',
  definition(t) {
    t.string('code', {
      description: 'Country code value',
    });
    t.string('name', {
      description: 'Name of the country',
    });
    t.nullable.string('network', {
      description: 'Network type supported in country',
    });
  },
});

export const LineAllowanceDataStackAllowance = objectType({
  name: 'LineAllowanceDataStackAllowance',
  definition(t) {
    t.float('capLimit', { description: 'Limit of the data stack allowance' });
    t.string('endDateTime', {
      description: 'Status of the data stack entitlement',
    });
    t.string('id', {
      description: 'Id of the data stack entitlement',
    });
    t.float('remainingVolume', {
      description: 'Remaining from data stack allowance',
    });
    t.string('startDateTime', {
      description: 'Start date of the data stack entitlement',
    });
    t.field('status', {
      type: LineAllowanceEntitlementStatus,
      description: 'Status of the data stack entitlement',
    });
    t.nullable.float('usedVolume', {
      description: 'Used data from the data stack',
    });
    t.field('volumeType', {
      type: LineAllowanceVolumeType,
      description: 'Type/Unit of the volume',
    });
  },
});

export const LineAllowancesExtraDetails = objectType({
  name: 'LineAllowancesExtraDetails',
  definition(t) {
    t.nullable.int('allowedCount', {
      description:
        'The optional number of this type of extra that the customer allowed to have available to activate.',
    });
    t.nullable.int('availableCount', {
      description:
        'The number of this type of extra that the customer currently has available to activate.',
    });
    t.nullable.string('billingFrequencyCode', {
      description: 'Billing frequency code',
    });
    t.nullable.string('billingFrequencyName', {
      description: 'Billing frequency name',
    });
    t.nullable.string('contractRenewalType', {
      description: 'Contract renewal type',
    });
    t.nullable.string('contractTermFrequency', {
      description: 'Contract term frequency',
    });
    t.nullable.int('contractTermNumber', {
      description: 'Contract term number',
    });
    t.nullable.list.field('countries', {
      type: LineAllowanceCountry,
    });
    t.nullable.int('displayPriority', {
      description: 'Display priority of extra',
    });
    t.nullable.list.field('entitlements', {
      type: 'LineEntitlementDetails',
      description: 'Entitlements of the extra',
    });
    t.nullable.boolean('renewable', {
      description: 'Flag to indicate the extra is renewable or not',
    });
    t.string('offerId', {
      description: 'Offer id of the extra',
    });
    t.nullable.string('periodEndDate', {
      description: 'End date of the subscription',
    });
    t.boolean('prepaidBasePlanValuePack', {
      description:
        'Flag to indicate the addon/extra product is prepaid base plan value pack',
    });
    t.nullable.float('price', {
      description: 'Price of the extra product',
    });
    t.nullable.string('priceType', {
      description: 'Price type of the extra',
    });
    t.string('productId', { description: 'Product id of the extra' });
    t.string('productInstanceId', {
      description: 'Product instance id of the extra',
    });
    t.string('productName', {
      description: 'Name of the product',
    });
    t.nullable.string('renewalFrequency', {
      description: 'Renewal frequency of the extra',
    });
    t.nullable.field('renewalState', {
      type: LineAllowanceExtraDetailRenewalState,
      description: 'Renewal state of the extra',
    });
    t.string('status', {
      description: 'Status of the extra',
    });
    t.nullable.string('subscriptionTermName', {
      description: 'Subscription term name',
    });
    t.field('subtype', {
      type: LineAllowanceExtraDetailSubtype,
      description: 'Subtype of the extra',
    });
    t.string('type', {
      description: 'Type of extra',
    });
    t.nullable.string('usageType', {
      description: 'Usage type of the extra',
    });
  },
});

export const LineAllowanceRolloverDetailsRolloverAllowanceRolloverExpiry =
  objectType({
    name: 'LineAllowanceRolloverDetailsRolloverAllowanceRolloverExpiry',
    definition(t) {
      t.float('expiryAmount', {
        description: 'Value of expiry amount',
      });
      t.string('expiryAmountUnit', {
        description: 'Expiry amount unit',
      });
      t.string('expiryDate', {
        description: 'Expiry date time',
      });
    },
  });

export const LineAllowanceRolloverDetailsRolloverAllowance = objectType({
  name: 'LineAllowanceRolloverDetailsRolloverAllowance',
  definition(t) {
    t.float('remainingAmount', {
      description: 'Remaining amount from roll over allowance',
    });
    t.string('remainingUnit', {
      description: 'Remaining amount unit of roll over allowance',
    });
    t.nullable.list.field('rolloverExpiry', {
      type: LineAllowanceRolloverDetailsRolloverAllowanceRolloverExpiry,
      description: 'List of roll over allowance details',
    });
    t.nullable.int('rolloverPriority', {
      description: 'Rollover priority value',
    });
    t.nullable.string('rolloverStatus', {
      description: 'Status of the rollover',
    });
    t.nullable.string('rolloverType', {
      description: 'Type of the rollover',
    });
    t.string('usageType', {
      description: 'Type of usage',
    });
  },
});

export const LineAllowanceRolloverDetails = objectType({
  name: 'LineAllowanceRolloverDetails',
  definition(t) {
    t.nullable.list.field('rolloverAllowances', {
      type: LineAllowanceRolloverDetailsRolloverAllowance,
      description: 'List of rollover allowance detail',
    });
  },
});

export const LineAllowanceSharePlanLineDetailSharerType = enumType({
  name: 'LineAllowanceSharePlanLineDetailSharerType',
  members: ['DATA', 'MOBILE'],
});

export const LineAllowanceSharePlanLineDetailSharePlanType = enumType({
  name: 'LineAllowanceSharePlanLineDetailSharePlanType',
  members: ['LEADER', 'SHARER'],
});

export const LineAllowanceSharePlanLineDetails = objectType({
  name: 'LineAllowanceSharePlanLineDetails',
  definition(t) {
    t.string('lineNumber', {
      description: 'Line number of the sharer plan',
    });
    t.nullable.string('planName', {
      description: 'Plan name of the line',
    });
    t.string('serviceId', {
      description: 'Service id of the sharer line',
    });
    t.nullable.field('sharerType', {
      type: LineAllowanceSharePlanLineDetailSharerType,
      description: 'Sharer type',
    });
    t.field('type', {
      type: LineAllowanceSharePlanLineDetailSharePlanType,
      description: 'Share plan type of the current plan',
    });
  },
});

export const LineAllowanceSharePlanDetails = objectType({
  name: 'LineAllowanceSharePlanDetails',
  definition(t) {
    t.nullable.string('groupId', {
      description: 'Group id of the share plan',
    });
    t.nullable.list.field('lines', {
      type: LineAllowanceSharePlanLineDetails,
      description: 'List of lines shared the share plan',
    });
    t.nullable.field('type', {
      type: LineAllowanceSharePlanLineDetailSharePlanType,
      description: 'Share plan type of the current plan',
    });
  },
});

export const LineAllowanceSpeedAllowancesDetails = objectType({
  name: 'LineAllowanceSpeedAllowancesDetails',
  definition(t) {
    t.field('status', {
      type: LineAllowanceSpeedAllowancesDetailStatus,
      description: 'The status of the speed allowance',
    });
    t.nullable.float('capLimit', {
      description:
        'The optional current speed cap limit associated with the plan in the unit of measure specified by the unitType attribute.',
    });
    t.nullable.string('unitType', {
      description:
        'The optional string representing the type of units the speed cap is measured by.',
    });
    t.nullable.string('offerId', {
      description:
        'The optional identifier of the product associated with the speed allowance',
    });
    t.nullable.string('productName', {
      description:
        'The optional name of the product associated with the speed allowance',
    });
    t.nullable.string('allowanceType', {
      description:
        'The optional type of product associated with this speed allowance',
    });
    t.nullable.string('expiryDateTime', {
      description: 'Expiry date time',
    });
    t.nullable.float('allowanceRemainingAmount', {
      description:
        'The optional data allowance remaining if the speed allowance is expired after a certain amount of data is consumed.',
    });
    t.nullable.string('allowanceRemainingUnit', {
      description:
        'The optional unit of measure for a speed allowance that is expired after a certain amount of data is consumed.',
    });
  },
});

export const LineAllowancesType = objectType({
  name: 'LineAllowancesType',
  definition(t) {
    t.nullable.list.field('dataStackAllowances', {
      type: LineAllowanceDataStackAllowance,
      description: 'Data stack allowance detail list applicable for this plan',
    });
    t.nullable.list.field('entitlements', {
      type: 'LineEntitlementDetails',
      description: 'Entitlements of the plan',
    });
    t.nullable.list.field('extras', {
      type: LineAllowancesExtraDetails,
      description: 'Extras associated with the line',
    });
    t.nullable.field('rolloverDetails', {
      type: LineAllowanceRolloverDetails,
      description: 'Auto purchage roaming product details',
    });
    t.nullable.field('sharePlanDetails', {
      type: LineAllowanceSharePlanDetails,
      description: 'Share plan details associated with the plan',
    });
    t.nullable.field('speedAllowances', {
      type: LineAllowanceSpeedAllowancesDetails,
      description:
        'The information about the speed allowance associated with the plan.',
    });
  },
});

export const LineAllowances = extendType({
  type: 'Line',
  definition(t) {
    t.field('allowances', {
      type: LineAllowancesType,
      async resolve({ lineNumber }, _, { dataSources: { lineDetailsAPI } }) {
        return lineDetailsAPI.getAllowances(lineNumber);
      },
    });
  },
});
