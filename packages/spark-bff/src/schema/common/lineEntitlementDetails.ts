import { enumType, objectType } from 'nexus';
import { definitions } from 'generated/typings/lineDetailsService';

type LineEntitlementQuantityUnitEnum =
  definitions['LineDetails']['entitlements'][0]['entitlementQuantityUnit'];
const LineEntitlementQuantityUnitMembers: LineEntitlementQuantityUnitEnum[] = [
  'GB',
  'MB',
  'MIN',
  'TEXT',
  'MBPS',
];
export const LineEntitlementQuantityUnit = enumType({
  name: 'LineEntitlementQuantityUnit',
  members: LineEntitlementQuantityUnitMembers,
});

export const LineEntitlementDetails = objectType({
  name: 'LineEntitlementDetails',
  definition(t) {
    t.nullable.string('description', {
      description: 'Description of entitlement',
    });
    t.nullable.string('detailedDescription', {
      description: 'Detailed description of entitlement',
    });
    t.nullable.int('displayPriority', {
      description: 'Display priority of entitlement',
    });
    t.string('id', {
      description: 'Id of the entitlement',
    });
    t.string('name', {
      description: 'Name of the entitlement',
    });
    t.nullable.float('quantity', {
      description: 'Quantity of the entitlement',
    });
    t.nullable.string('subtype', {
      description: 'Subtype of the entitlement',
    });
    t.nullable.string('throttleMessage', {
      description: 'The throttle message of the entitlement',
    });
    t.boolean('unlimited', {
      description: 'True, if unlimited quantity',
    });
    t.string('usageType', {
      description: 'Type of the entitlement',
    });
    t.nullable.field('entitlementQuantityUnit', {
      type: LineEntitlementQuantityUnit,
      description: 'The unit of the quantity',
    });
  },
});
