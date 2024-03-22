import { enumType, objectType } from 'nexus';
import { definitions } from 'generated/typings/balanceService';

export const BalanceManagement = enumType({
  name: 'BalanceManagement',
  members: ['PREPAID', 'POSTPAID'],
  description:
    'Whether the service follows a prepaid billing model, or a postpaid model',
});

export const BalanceMessageStatus = enumType({
  name: 'BalanceMessageStatus',
  members: ['WARNING', 'IMPORTANT', 'POSITIVE', 'NORMAL', 'UNAVAILABLE'],
  description: 'message status',
});

type CtaCodeMembers = definitions['CtaDetails']['code'];
const balanceCtaCodeMembers: CtaCodeMembers[] = [
  'PAY_BILL',
  'SETUP_MONTHLY_PAYMENT',
  'MANAGE_MONTHLY_PAYMENT',
  'VIEW_LATEST_BILL',
  'VIEW_IFP',
  'ADD_CREDIT',
  'GET_HELP_WITH_BILL',
  'VIEW_TRANSACTION_DETAIL',
  'TOPUP',
  'MANAGE_AUTO_TOPUP',
  'SETUP_AUTO_TOPUP',
  'BUY_PACK_OR_EXTRA',
  'MANAGE_PACK_OR_EXTRA',
  'MESSAGE_US',
];

const CtaCode = enumType({
  name: 'CtaCode',
  members: balanceCtaCodeMembers,
  description: 'CTA code',
});

export const OperationTypeCtaDetails = objectType({
  name: 'OperationTypeCtaDetails',
  definition(t) {
    t.string('label', {
      description: 'CTA label',
    });
    t.nullable.field('code', {
      type: CtaCode,
      description: 'CTA code',
    });
  },
});

export const BalanceInformationMessage = objectType({
  name: 'BalanceInformationMessage',
  description: 'object to hold fields for summary and detail messages',
  definition(t) {
    t.string('primary', {
      description: 'Primary message',
    });
    t.nullable.string('secondary', {
      description: 'secondary message',
    });
    t.nullable.string('tertiary', {
      description: 'tertiary message',
    });
    t.nullable.field('status', {
      type: BalanceMessageStatus,
      description: 'message status',
    });
    t.field('primaryCta', {
      type: OperationTypeCtaDetails,
      description: 'primary CTA details',
    });
    t.nullable.field('secondaryCta', {
      type: OperationTypeCtaDetails,
      description: 'secondary CTA details',
    });
    t.nullable.list.field('otherCtas', {
      type: OperationTypeCtaDetails,
      description: 'other CTA details',
    });
  },
});
