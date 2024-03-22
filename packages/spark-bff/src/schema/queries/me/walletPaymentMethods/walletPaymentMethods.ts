import {
  extendType,
  enumType,
  objectType,
  nullable,
  arg,
  list,
  stringArg,
} from 'nexus';
import { definitions } from 'generated/typings/walletService';

const PaymentMethodTypes: definitions['PaymentMethod']['type'][] = [
  'CREDIT',
  'BANK',
];

const PaymentMethodAssociationTypes: definitions['PaymentMethod']['associations'][0]['type'][] =
  ['RECURRING'];

const PaymentMethodAccessTypes: definitions['PaymentMethod']['associations'][0]['accessType'][] =
  ['ACCOUNT', 'LINE'];

export const PaymentMethodType = enumType({
  name: 'PaymentMethodType',
  members: PaymentMethodTypes,
  description: 'Indicates if the payment method is a card or bank account.',
});

export const PaymentMethodAssociationType = enumType({
  name: 'PaymentMethodAssociationType',
  members: PaymentMethodAssociationTypes,
  description: 'the type of association, as of now we support only one type.',
});

export const PaymentMethodAccessType = enumType({
  name: 'PaymentMethodAccessType',
  members: PaymentMethodAccessTypes,
  description: 'the access type of the association.',
});

/**
 * @deprecated
 */
export const PaymentMethodCardType = enumType({
  name: 'PaymentMethodCardType',
  members: ['mastercard', 'visa', 'amex', 'diners', 'Unknown'],
  description: 'indicates the card vendor',
});

export const CardBrand = enumType({
  name: 'CardBrand',
  members: ['mastercard', 'visa', 'amex', 'diners'],
  description: 'indicates the card vendor',
});

export const PaymentMethodBankType = enumType({
  name: 'PaymentMethodBankType',
  members: [
    'ANZ_Bank',
    'Bank_of_New_Zealand',
    'Westpac',
    'Industrial_and_Commercial_Bank_of_China_Limited_NZ',
    'ASB_Bank',
    'TSB_Bank',
    'HSBC_Bank_NZ',
    'Citibank_N_A',
    'Kiwibank',
    'Unknown',
  ],
  description: 'the name of the banks.',
});

export const CardDetail = objectType({
  name: 'CardDetail',
  description: 'object to hold the credit card details.',
  definition(t) {
    t.string('maskedCardNumber', {
      description: 'the masked card number',
    });
    t.nullable.string('cardName', {
      description: 'The name on the card',
    });
    t.string('cardType', {
      description: 'indicates the card vendor',
      deprecation: 'Use CardDetail.brand instead',
    });
    t.int('expiryMonth', {
      description: 'the month of expiry on the card',
    });
    t.int('expiryYear', {
      description: 'the year of expiry on the card',
    });
    t.field('creditCardType', {
      type: PaymentMethodCardType,
      description: 'indicates the card vendor',
      deprecation: 'Use CardDetail.brand instead',
    });
    t.nullable.field('brand', {
      type: CardBrand,
      description: 'indicates the card vendor and is ',
    });
  },
});

export const BankAccountDetail = objectType({
  name: 'BankAccountDetail',
  description: 'object to hold the bank details.',
  definition(t) {
    t.string('bankName', {
      description: 'the name of the bank',
    });
    t.string('accountName', {
      description: 'the name of the account',
    });
    t.string('accountNumber', {
      description: 'the account number',
    });
    t.field('bankType', {
      type: PaymentMethodBankType,
      description: 'the allowed bank names',
    });
  },
});

export const PaymentMethodAssociation = objectType({
  name: 'PaymentMethodAssociation',
  description: 'object holding fields for association',
  definition(t) {
    t.field('type', {
      type: PaymentMethodAssociationType,
      description:
        'the type of association, as of now we support only one type.',
    });
    t.field('accessType', {
      type: PaymentMethodAccessType,
      description: 'the access type of the association.',
    });
    t.nullable.string('accountNumber', {
      description:
        'the spark post pay account number if the association is on the account.',
    });
    t.nullable.string('lineNumber', {
      description: 'the spark line number if the association is on the line.',
    });
    t.string('paymentMethodId', {
      description: 'the unique identifier of the associated payment method.',
    });
  },
});

export const PaymentMethod = objectType({
  name: 'PaymentMethod',
  description: 'object containing fields for payment methods.',
  definition(t) {
    t.field('type', {
      type: PaymentMethodType,
      description: 'Indicates if the payment method is a card or bank account.',
    });
    t.nullable.field('source', {
      type: 'PaymentMethodSource',
      description: 'Indicates the source of the payment method association.',
    });
    t.string('paymentMethodId', {
      description: 'the unique identifier of this payment method.',
    });
    t.nullable.string('personalisedName', {
      description:
        'A customised name given by the user for the payment method.',
    });
    t.boolean('isPreferred', {
      description:
        'true indicates that the payment method is chosen as the default method of payment.',
    });
    t.nullable.field('cardDetail', {
      type: CardDetail,
      description: 'credit card details.',
    });
    t.nullable.field('bankAccountDetail', {
      type: BankAccountDetail,
      description: 'bank account information.',
    });
    t.nullable.list.field('associations', {
      type: PaymentMethodAssociation,
      description: 'array holding all associations if any.',
    });
  },
});

const WalletPaymentSourceMembers: definitions['BasePaymentMethodProperties']['source'][] =
  ['WALLET_OTHER', 'WALLET_SELF', 'DIRECT'];

export const WalletPaymentMethodSource = enumType({
  name: 'WalletPaymentMethodSource',
  members: WalletPaymentSourceMembers,
});

export const WalletPaymentMethodsArgs = {
  sources: nullable(list(arg({ type: WalletPaymentMethodSource }))),
  associatedLineNumber: nullable(stringArg()),
};

export const WalletPaymentMethods = extendType({
  type: 'User',
  definition(t) {
    t.list.field('paymentMethods', {
      type: PaymentMethod,
      args: WalletPaymentMethodsArgs,
      description: 'Wallet payment methods for credit card and bank account',
      async resolve(
        _,
        { sources, associatedLineNumber },
        { dataSources: { walletServiceAPI } },
      ) {
        return walletServiceAPI.getWalletPaymentMethods(
          sources,
          associatedLineNumber,
        );
      },
    });
  },
});
