import {
  objectType,
  inputObjectType,
  enumType,
  mutationField,
  stringArg,
  booleanArg,
  nullable,
} from 'nexus';
import { resolveCreditCardTopup } from './creditCardTopup.resolver';

export const ClientType = enumType({
  name: 'ClientType',
  members: ['SMARTPHONE', 'CQ_DESKTOP', 'CQ_MOBILE'],
  description: 'The type of client that initiated the request.',
});

export const TopupSource = enumType({
  name: 'TopupSource',
  members: ['DIRECT', 'WALLET_SELF', 'NEW_CARD'],
  description: 'The source of the payment/card',
});

export const CreditCardTopupResponse = objectType({
  name: 'CreditCardTopupResponse',
  description: 'object containing fields for credit card response',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.string('receiptNumber', {
      description:
        'The receipt number that uniquely identifies this transaction.',
    });
    t.nullable.float('availableBalance', {
      description: 'The total available balance.',
    });
    t.nullable.float('reservedBalance', {
      description: 'The total reserved balance.',
    });
  },
});

export const CreditCardTopupInput = inputObjectType({
  name: 'CreditCardTopupInput',
  description: 'input object containing fields for credit card topup input.',
  definition(t) {
    t.nullable.field('source', {
      type: TopupSource,
      description: 'The source of the payment/card.',
      default: null,
    });
    t.float('amount', {
      description: 'The amount to be paid in NZD',
    });
    t.nullable.string('paymentMethodId', {
      description: 'the unique identifier of this payment method.',
      default: null,
    });
    t.nullable.string('secureTransactionToken', {
      description:
        'the secure transaction token required to pay the amount without persisting any card details.',
      default: null,
    });
  },
});

export const CreditCardTopupArgs = {
  input: CreditCardTopupInput,
  creditCardInput: nullable('CardDetailInput'),
  lineNumber: stringArg(),
  shouldSaveCard: nullable(booleanArg()),
  isNewCreditCard: booleanArg(),
};

export const CreditCardTopupPayment = mutationField('submitCCtopupPayment', {
  type: CreditCardTopupResponse,
  description:
    'Performs topup for the given prepay line number using provided credit card which could be from wallet or registered against the line or new.',
  args: CreditCardTopupArgs,
  resolve: resolveCreditCardTopup,
});
