import { objectType, inputObjectType, mutationField, enumType } from 'nexus';

export const PaymentMethodSource = enumType({
  name: 'PaymentMethodSource',
  members: ['WALLET_SELF', 'WALLET_OTHER', 'DIRECT'],
  description: 'Indicates the source of the payment method association.',
});

export const BankAccountInformation = inputObjectType({
  name: 'BankAccountInformation',
  description:
    'input object holding the bank details. Mandatory if the type is BANK',
  definition(t) {
    t.string('bankName', {
      description: 'the name of the bank',
    });
    t.string('accountNumber', {
      description: 'the account number',
    });
    t.string('accountName', {
      description: 'the name of the account',
    });
  },
});

export const Association = inputObjectType({
  name: 'Association',
  description: 'object holding fields for association',
  definition(t) {
    t.field('type', {
      type: 'PaymentMethodAssociationType',
      description:
        'the type of association, as of now we support only one type.',
    });
    t.field('accessType', {
      type: 'PaymentMethodAccessType',
      description: 'the access type of the association.',
    });
    t.nullable.string('accountNumber', {
      description:
        'the spark post pay account number if teh association is on the account.',
    });
    t.nullable.string('lineNumber', {
      description: 'the spark line number if the association is on the line.',
    });
    t.string('paymentMethodId', {
      description: 'the unique identifier of the associated payment method.',
    });
  },
});

export const CardDetailInformation = inputObjectType({
  name: 'CardDetailInformation',
  description:
    'input object holding the card details. Mandatory if the type is CREDIT.',
  definition(t) {
    t.string('maskedCardNumber', {
      description: 'the masked card number.',
    });
    t.nullable.string('cardName', {
      description: 'The name on the card',
    });
    t.string('cardType', {
      description: 'indicates the card vendor',
    });
    t.int('expiryMonth', {
      description: 'the month of expiry on the card',
    });
    t.int('expiryYear', {
      description: 'the year of expiry on the card',
    });
    t.nullable.string('token', {
      description: 'The token representing the card in Bambora.',
    });
    t.nullable.string('oneTimeToken', {
      description:
        'temporary representation of the token until registration in Bambora',
    });
    t.nullable.string('secureTransactionToken', {
      description:
        'The secure transaction token provided by bambora to register the card',
    });
  },
});

export const BankAccountDetailInput = inputObjectType({
  name: 'BankAccountDetailInput',
  description: 'input object having fields for bank account detail',
  definition(t) {
    t.boolean('isPreferred', {
      description:
        'true indicates that he payment method is chosen as the default method of payment.',
    });
    t.field('bankAccountDetail', {
      type: BankAccountInformation,
      description:
        'Object holding the bank details. Mandatory if the type is BANK.',
    });
    t.nullable.list.field('associations', {
      type: Association,
      description: 'array holding all associations if any.',
    });
    t.nullable.string('personalisedName', {
      description: 'A customised name given by the user for the payment method',
    });
  },
});

export const RestOfAddWalletPaymentMethodResponse = objectType({
  name: 'RestOfAddWalletPaymentMethodResponse',
  description:
    'object having fields for rest of the add wallet payment method response',
  definition(t) {
    t.nullable.boolean('isDuplicate', {
      description: 'true indicates that this payment method already exists.',
    });
    t.string('paymentMethodId', {
      description: 'the unique identifier of this payment method.',
    });
    t.nullable.field('source', {
      type: PaymentMethodSource,
      description: 'Indicates the source of the payment method association.',
    });
  },
});

export const AddWalletPaymentMethodResponse = objectType({
  name: 'AddWalletPaymentMethodResponse',
  description:
    'object to hold fields in response when adding payment method to wallet.',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.field('addWalletPaymentMethodResponse', {
      type: RestOfAddWalletPaymentMethodResponse,
      description: 'rest of the add wallet payment method response.',
    });
  },
});

export const AddWalletBankAccount = mutationField('addBankAccountToWallet', {
  type: AddWalletPaymentMethodResponse,
  description: 'adds a new bank account to a users digital wallet.',
  args: { input: BankAccountDetailInput },
  resolve(_, { input }, { dataSources: { walletServiceAPI } }) {
    return walletServiceAPI.postBankAccountToWallet(input);
  },
});

export const CardDetailInput = inputObjectType({
  name: 'CardDetailInput',
  description: 'input object having fields for card detail',
  definition(t) {
    t.boolean('isPreferred', {
      description:
        'true indicates that the payment method is chosen as the default method of payment',
    });
    t.nullable.string('personalisedName', {
      description:
        'A customised name given by the user for the payment method.',
    });
    t.field('cardDetail', {
      type: CardDetailInformation,
      description:
        'Object holding the card details. Mandatory if the type is CREDIT.',
    });
    t.nullable.list.field('associations', {
      type: Association,
      description: 'array holding all associations if any.',
    });
  },
});

export const AddWalletCreditCard = mutationField('addCreditCardToWallet', {
  type: AddWalletPaymentMethodResponse,
  description: 'adds a new credit card to a users digital wallet',
  args: { input: CardDetailInput },
  resolve(_, { input }, { dataSources: { walletServiceAPI } }) {
    return walletServiceAPI.postCreditCardToWallet(input);
  },
});
