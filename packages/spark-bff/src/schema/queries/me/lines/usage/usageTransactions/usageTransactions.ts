import { enumType, extendType, nullable, objectType, stringArg } from 'nexus';

export const UsageTransactionType = enumType({
  name: 'UsageTransactionType',
  members: ['CHARGE', 'PAYMENT', 'ADJUSTMENT'],
});

export const UsageTransactions = objectType({
  name: 'UsageTransactions',
  definition(t) {
    t.field('transactionType', {
      type: UsageTransactionType,
      description: 'The type of transaction',
    });
    t.string('startDateTime', {
      description: 'The start of this transaction',
    });
    t.string('endDateTime', {
      description:
        'The end of this transaction.  In the case of a payment or adjustment the endDateTime will be equal to the startDateTime as those are instantaneous events',
    });
    t.float('previousBalance', {
      description: 'The line balance prior to this transaction in NZD',
    });
    t.float('currentBalance', {
      description: 'The line balance prior to this transaction in NZD',
    });
    t.string('description', {
      description:
        'Description of the transaction, e.g. the type of activity or product purchase',
    });
    t.float('value', {
      description: 'The value of the transaction in NZD',
    });
    t.boolean('isDebit', {
      description:
        'Indicates if the transaction is a debit, e.g. charge, or credit (payment). Note adjustments could potentially be either a debit or credit depending on the type applied.',
    });
    t.string('type', {
      description: 'A customer-friendly term for the type of transaction',
    });
  },
});

export const LineUsageTransactions = objectType({
  name: 'LineUsageTransactions',
  definition(t) {
    t.list.field('transactions', {
      type: UsageTransactions,
      description:
        'The transactions associated with this line sorted in reverse chronological order (i.e. newest first).',
    });
  },
});

export const UsageTransactionArgs = {
  start: nullable(stringArg()),
  end: nullable(stringArg()),
  size: nullable(stringArg()),
};

export const LineWithUsageTransactions = extendType({
  type: 'Line',
  definition(t) {
    t.field('usageTransactions', {
      type: LineUsageTransactions,
      args: UsageTransactionArgs,
      async resolve(
        { lineNumber },
        params,
        { dataSources: { usageTransactionServiceAPI } },
      ) {
        const { start, end, size } = params;
        return usageTransactionServiceAPI.getUsageTransaction(
          lineNumber,
          start,
          end,
          size,
        );
      },
    });
  },
});
