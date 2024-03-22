import { objectType, extendType, stringArg, enumType, queryField } from 'nexus';

export const MonthlyPaymentSetupType = enumType({
  name: 'MonthlyPaymentSetupType',
  members: ['CC', 'DD', 'RCC'],
  description: 'Monthly payment setup type',
});

export const CreditDebitMarker = enumType({
  name: 'CreditDebitMarker',
  members: ['CR', 'DR'],
  description: 'Credit/Debit marker',
});

export const PaymentAmount = objectType({
  name: 'PaymentAmount',
  definition(t) {
    t.nullable.float('amount', {
      description: 'Amount value',
    });
    t.nullable.field('crDr', {
      type: CreditDebitMarker,
      description: 'Credit/Debit marker',
    });
  },
});

export const CurrentBalance = objectType({
  name: 'CurrentBalance',
  definition(t) {
    t.nullable.field('due', {
      type: PaymentAmount,
      description: 'current due amount',
    });
    t.nullable.field('overdue', {
      type: PaymentAmount,
      description: 'current overdue amount',
    });
  },
});

export const AccountDetails = objectType({
  name: 'AccountDetails',
  description: 'object to hold fields for Direct debit/Bank account details',
  definition(t) {
    t.nullable.string('bank', {
      description: 'Bank name',
    });
    t.nullable.string('accountName', {
      description: 'account name',
    });
    t.nullable.string('accountNumber', {
      description: 'account number',
    });
    t.nullable.string('accountNumberSuffix', {
      description: 'Bank account suffix',
    });
    t.nullable.string('bankNumber', {
      description: 'Bank number',
    });
    t.nullable.string('branchNumber', {
      description: 'Branch number',
    });
    t.nullable.string('branchName', {
      description: 'Branch name',
    });
  },
});

export const CreditCard = objectType({
  name: 'CreditCard',
  description: 'object to hold fields for credit card details',
  definition(t) {
    t.nullable.string('lastFourDigits', {
      description: 'Last 4 digits of the card',
    });
    t.nullable.string('ccId', {
      description: 'Credit card token of the card',
    });
    t.nullable.string('cardName', {
      description: 'Card name',
    });
    t.nullable.string('cardIssuer', {
      description: 'Card issuer',
    });
    t.nullable.string('expiryMonth', {
      description: 'Card expiry month',
    });
    t.nullable.string('expiryYear', {
      description: 'Card expiry year',
    });
  },
});

export const UpcomingPayment = objectType({
  name: 'UpcomingPayment',
  description: 'object to hold fields for upcoming payment details',
  definition(t) {
    t.nullable.string('paymentDate', {
      description: 'Future dated payment date',
    });
    t.nullable.string('paymentFrequency', {
      description: 'Payment frequency',
    });
    t.nullable.string('paymentMethodId', {
      description: 'Payment method id',
    });
    t.nullable.field('paymentAmount', {
      type: PaymentAmount,
      description: 'Upcoming payment amount',
    });
  },
});

export const MonthlyPaymentSetup = objectType({
  name: 'MonthlyPaymentSetup',
  description: 'object to hold fields for monthly payment setup',
  definition(t) {
    t.nullable.field('type', {
      type: MonthlyPaymentSetupType,
      description: 'Monthly payment setup type',
    });
    t.nullable.string('description', {
      description: 'Description of the monthly payment setup type',
    });
    t.nullable.string('status', {
      description: 'Monthly payment setup status',
    });
    t.nullable.field('accountDetails', {
      type: AccountDetails,
      description: 'Direct debit/Bank account details',
    });
    t.nullable.field('creditCard', {
      type: CreditCard,
      description: 'Credit card details',
    });
    t.nullable.field('upcomingPayment', {
      type: UpcomingPayment,
      description: 'Upcoming payment details',
    });
  },
});

export const LastBill = objectType({
  name: 'LastBill',
  description: 'object to hold fields for last bill details',
  definition(t) {
    t.nullable.string('billDate', {
      description: 'Last bill date',
    });
  },
});

export const NextBill = objectType({
  name: 'NextBill',
  description: 'object to hold fields for next bill details',
  definition(t) {
    t.nullable.string('billDate', {
      description: 'Next bill date',
    });
  },
});

export const LastPayment = objectType({
  name: 'LastPayment',
  description: 'object to hold fields for last payment details',
  definition(t) {
    t.nullable.string('paymentDate', {
      description: 'Last payment date',
    });
    t.nullable.field('paymentAmount', {
      type: PaymentAmount,
      description: 'Last payment amount',
    });
  },
});

export const AccountBalance = objectType({
  name: 'AccountBalance',
  description: 'object to hold account balance details',
  definition(t) {
    t.string('accountNumber', {
      description: 'Account number',
    });
    t.nullable.string('firstName', {
      description: 'First name',
    });
    t.nullable.string('lastName', {
      description: 'Last name',
    });
    t.nullable.field('currentBalance', {
      type: CurrentBalance,
      description: 'current balance detail',
    });
    t.nullable.field('lastBill', {
      type: LastBill,
      description: 'last bill date',
    });
    t.nullable.field('nextBill', {
      type: NextBill,
      description: 'Next bill date',
    });
    t.nullable.int('currentBillCycle', {
      description: 'current billing cycle of the account',
    });
    t.nullable.field('summaryMessage', {
      type: 'BalanceInformationMessage',
      description: 'contains messages to be shown in summary page',
    });
    t.nullable.field('lastPayment', {
      type: LastPayment,
      description: 'last payment details',
    });
    t.nullable.list.field('monthlyPaymentSetup', {
      type: MonthlyPaymentSetup,
      description: 'monthly Payment Setup',
    });
    t.nullable.field('detailMessage', {
      type: 'BalanceInformationMessage',
      description: 'detail message',
    });
  },
});

export const AccountBalanceDetail = extendType({
  type: 'User',
  definition(t) {
    t.field('accountBalance', {
      type: AccountBalance,
      description:
        'Retrieves the account monetary balance details for a account from Siebel.',
      args: { accountNumber: stringArg() },
      async resolve(
        _,
        { accountNumber },
        { dataSources: { balanceServiceAPI } },
      ) {
        return balanceServiceAPI.getAccountBalance(accountNumber);
      },
    });
  },
});

export const AccountBalanceDetailMessageQuery = queryField('accountBalance', {
  type: AccountBalance,
  args: {
    accountNumber: stringArg(),
  },
  async resolve(_, { accountNumber }, { dataSources: { balanceServiceAPI } }) {
    return balanceServiceAPI.getAccountBalance(accountNumber);
  },
});
