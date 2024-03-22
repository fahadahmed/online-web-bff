import {
  enumType,
  objectType,
  inputObjectType,
  mutationField,
  booleanArg,
  nullable,
} from 'nexus';
import { resolveCreditCardPayBill } from './creditCardPayBill.resolver';

const AmountType = enumType({
  name: 'AmountType',
  members: ['ONEOFF', 'TOTALDUE', 'TOTALOVERDUE'],
  description: 'The type of payment.',
});

export const CreditCardBillPaymentResponse = objectType({
  name: 'CreditCardBillPaymentResponse',
  description: 'object to hold registered credit card bill payment response',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const NewCardBillPaymentResponse = objectType({
  name: 'NewCardBillPaymentResponse',
  description: 'object to hold new card bill payment response',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const CreditCardBillPaymentRequestInput = inputObjectType({
  name: 'CreditCardBillPaymentRequestInput',
  description:
    'input object having registered credit card bill payment request fields',
  definition(t) {
    t.field('source', {
      type: 'TopupSource',
      description: 'The source of the payment/card.',
    });
    t.nullable.float('amount', {
      description: 'The amount to be paid from the credit card.',
    });
    t.field('amountType', {
      type: AmountType,
      description: 'The type of payment.',
    });
    t.boolean('setupAutoPay', {
      description:
        'Indicates if the given card has to be setup as autopay or not.',
    });
    t.string('paymentMethodId', {
      description: 'The unique identifier of this payment method.',
    });
    t.string('accountNumber', {
      description: 'The account number for which the bill needs to be paid.',
    });
  },
});

export const NewCardOneoffBillPaymentInput = inputObjectType({
  name: 'NewCardOneoffBillPaymentInput',
  description: 'input object having fields for new card one-off bill payment.',
  definition(t) {
    t.float('amount', {
      description: 'The amount to be paid from the credit card.',
    });
    t.field('amountType', {
      type: AmountType,
      description: 'The type of payment.',
    });
    t.boolean('setupAutoPay', {
      description:
        'Indicates if the given card has to be setup as autopay or not.',
    });
    t.string('accountNumber', {
      description: 'The account number for which the bill needs to be paid.',
    });
  },
});

export const NewCardBillPaymentWithRegistrationInput = inputObjectType({
  name: 'NewCardBillPaymentWithRegistrationInput',
  description:
    'input object having fields for new card bill payment with registration.',
  definition(t) {
    t.float('amount', {
      description: 'The amount to be paid from the credit card.',
    });
    t.field('amountType', {
      type: AmountType,
      description: 'The type of payment.',
    });
    t.boolean('setupAutoPay', {
      description:
        'Indicates if the given card has to be setup as autopay or not.',
    });
    t.string('secureTransactionToken', {
      description:
        'the secure transaction token required to pay the amount without persisting any card details.',
    });
    t.string('accountNumber', {
      description: 'The account number for which the bill needs to be paid.',
    });
  },
});

export const CreditCardPaymentWithRegisteredCard = mutationField(
  'processCCPaymentWithRegisteredCard',
  {
    type: CreditCardBillPaymentResponse,
    description:
      'Performs bill payment for the given account number using a registered credit card.',
    args: { input: CreditCardBillPaymentRequestInput },
    resolve(_, { input }, { dataSources: { billPaymentAPI } }) {
      return billPaymentAPI.postCCPaymentWithRegisteredCard(input);
    },
  },
);

export const CreditCardPayBillArgs = {
  input: NewCardOneoffBillPaymentInput,
  creditCardInput: nullable('CardDetailInput'),
  shouldSaveCard: nullable(booleanArg()),
  isNewCreditCard: booleanArg(),
};

export const NewCardOneoffBillPayment = mutationField(
  'processNewCardOneoffBillPayment',
  {
    type: NewCardBillPaymentResponse,
    description:
      'Performs one-off bill payment for the given account number using a new credit card.',
    args: CreditCardPayBillArgs,
    resolve: resolveCreditCardPayBill,
  },
);

export const NewCardBillPaymentWithRegistration = mutationField(
  'processNewCardBillPaymentWithRegistration',
  {
    type: NewCardBillPaymentResponse,
    description:
      'Performs bill payment for the given account number using a new credit card with registration.',
    args: { input: NewCardBillPaymentWithRegistrationInput },
    resolve(_, { input }, { dataSources: { billPaymentAPI } }) {
      return billPaymentAPI.postNewCardBillPaymentWithRegistration(input);
    },
  },
);
