import { objectType, extendType, stringArg } from 'nexus';

export const PrepaidBalance = objectType({
  name: 'PrepaidBalance',
  description: 'object to hold prepaid balance details',
  definition(t) {
    t.string('lineNumber', {
      description: 'Line number',
    });
    t.float('balance', {
      description: 'account current balance',
    });
    t.nullable.string('balanceExpiryDate', {
      description: 'balance Expiry date',
    });
    t.nullable.string('retrievalDate', {
      description: 'Retrieval date',
    });
    t.nullable.float('lastTopUpAmount', {
      description: 'Last topup amount',
    });
    t.nullable.string('lastTopUpDate', {
      description: 'Last topup date',
    });
    t.nullable.field('detailMessage', {
      type: 'BalanceInformationMessage',
      description: 'detail message',
    });
    t.nullable.field('summaryMessage', {
      type: 'BalanceInformationMessage',
      description: 'Contains messages to be shown in summary page',
    });
  },
});

export const PrepaidBalanceDetail = extendType({
  type: 'User',
  definition(t) {
    t.field('prepaidBalance', {
      type: PrepaidBalance,
      description: 'Retrieves the prepaid balance details for a linenumber.',
      args: { lineNumber: stringArg() },
      async resolve(
        _,
        { lineNumber },
        { dataSources: { prepaidBalanceServiceAPI } },
      ) {
        return prepaidBalanceServiceAPI.getPrepaidBalance(lineNumber);
      },
    });
  },
});
