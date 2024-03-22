import {
  booleanArg,
  enumType,
  inputObjectType,
  mutationField,
  nullable,
  objectType,
} from 'nexus';
import { definitions } from 'generated/typings/paymentService';
import { resolveSetPrepaidAutoTopup } from './setPrepaidAutoTopup.resolver';

const autoTopupTypeMembers: definitions['AutoTopupSettings']['type'][] = [
  'LB',
  'RT',
];

const AutoTopupResponse = objectType({
  name: 'AutoTopupResponse',
  description: 'The response object of a voucher topup',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const AutoTopupType = enumType({
  name: 'AutoTopupType',
  members: autoTopupTypeMembers,
});

const AutoTopupSettings = inputObjectType({
  name: 'AutoTopupSettings',
  description: 'The settings for the auto topup',
  definition(t) {
    t.field('type', {
      type: AutoTopupType,
      description: 'The type of autotopup',
    });
    t.nullable.string('firstTopupDate', {
      description: 'The first topup date, mandatory for RT',
    });
    t.nullable.float('thresholdAmount', {
      description: 'The threshold to trigger LB, mandatory for LB',
    });
    t.nullable.float('monthlyTopupLimit', {
      description: 'The monthly LB topup limit, mandatory for LB',
    });
  },
});

const AutoTopupInput = inputObjectType({
  name: 'AutoTopupInput',
  description:
    'Object containing input fields required to process a voucher topup',
  definition(t) {
    t.field('source', {
      type: 'TopupSource',
      description: 'The source of the payment/card.',
    });
    t.float('amount', {
      description: 'The auto topup amount in NZD',
    });
    t.nullable.string('paymentMethodId', {
      description: 'This is the unique identifier of the payment method used',
    });
    t.nullable.string('secureTransactionToken', {
      description:
        'the secure transaction token required to pay the amount without persisting any card details.',
      default: null,
    });
    t.field('autoTopupSettings', {
      type: AutoTopupSettings,
      description: 'The settings for the auto topup',
    });
    t.string('lineNumber', {
      description:
        'The prepay line number that is requesting for autotopup and the user has access to',
    });
  },
});

export const SetPrepaidAutoTopupArgs = {
  input: AutoTopupInput,
  creditCardInput: nullable('CardDetailInput'),
  isNewCreditCard: booleanArg(),
};

export const SetPrepaidAutoTopup = mutationField('setPrepaidAutoTopup', {
  type: AutoTopupResponse,
  description: 'Sets up automatic topups for a line',
  args: SetPrepaidAutoTopupArgs,
  resolve: resolveSetPrepaidAutoTopup,
});
