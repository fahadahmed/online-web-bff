import {
  arg,
  objectType,
  stringArg,
  extendType,
  intArg,
  list,
  nullable,
  enumType,
} from 'nexus';

export const PaymentStatusType = enumType({
  name: 'PaymentStatusType',
  members: ['APPLIED', 'FAILED'],
  description: 'enums for successful and unsuccessful transactions',
});

export const TransactionListArgs = {
  lineNumber: stringArg(),
  startDate: nullable(stringArg()),
  endDate: nullable(stringArg()),
  size: nullable(intArg()),
  paymentStatus: nullable(arg({ type: PaymentStatusType })),
};

export const Transaction = objectType({
  name: 'Transaction',
  description: 'object contatining transactions List details',
  definition(t) {
    t.float('value', {
      description: 'The value of the transaction in NZD',
    });
    t.string('type', {
      description: 'A customer-friendly term for the type of transaction',
    });
    t.string('startDateTime', {
      description:
        'The start date-time used in the query placed to the downstream SingleView datasource',
    });
    t.boolean('isDebit', {
      description:
        'Indicates if the transaction is a debit, e.g. charge, or credit (payment). Note adjustments could potentially be either a debit or credit depending on the type applied.',
    });
    t.string('description', {
      description:
        'Description of the transaction, e.g. the type of activity or product purchase.',
    });
    t.float('currentBalance', {
      description: 'The users prepay current balance in NZD',
    });
  },
});

export const TransactionList = extendType({
  type: 'User',
  definition(t) {
    t.field('transactionList', {
      type: list(Transaction),
      description: 'Transactions for line number',
      args: TransactionListArgs,
      async resolve(
        _,
        { lineNumber, startDate, endDate, size, paymentStatus },
        { dataSources: { transactionServiceAPI } },
      ) {
        return transactionServiceAPI.getTransactionList(
          lineNumber,
          startDate,
          endDate,
          size,
          paymentStatus,
        );
      },
    });
  },
});
