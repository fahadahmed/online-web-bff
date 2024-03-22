import { enumType, objectType } from 'nexus';
import { definitions } from 'generated/typings/orderServiceV2';

const FeasibilityReasonMembers: definitions['FeasibilityResponse']['feasibilityReason'][] =
  [
    'ALLOWED',
    'IN_PROGRESS',
    'CALL_CENTRE',
    'TERMINATE',
    'CHANGE_OFFER',
    'PORT_OUT',
    'SERVICE_NOT_ACTIVATED',
    'UNKNOWN',
  ];

const FeasibilityReason = enumType({
  name: 'FeasibilityReason',
  members: FeasibilityReasonMembers,
});

export const OrderFeasibility = objectType({
  name: 'OrderFeasibility',
  definition(t) {
    t.boolean('orderFeasible');
    t.field('feasibilityReason', {
      type: FeasibilityReason,
    });
  },
});
