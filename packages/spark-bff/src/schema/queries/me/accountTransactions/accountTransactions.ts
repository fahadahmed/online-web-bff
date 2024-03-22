import { objectType, extendType, enumType, stringArg, nullable } from 'nexus';
import { definitions } from 'generated/typings/digitalBill';

type TransactionTypeDESL = definitions['TransactionDetail']['type'];

const transactionTypesFromDESL: TransactionTypeDESL[] = [
  'Charged',
  'Credit',
  'Failed',
  'Payment',
  'Surcharge',
];

/**
 * Cant be mapped with DESL Late Fee type as graphQL does not like space in "Late Fee" enum
 */
const transactionTypes = [...transactionTypesFromDESL, 'Late_Fee'];

export const TransactionType = enumType({
  name: 'TransactionType',
  members: transactionTypes,
  description: 'Transaction types',
});

export const AccountTransactionDetail = objectType({
  name: 'AccountTransactionDetail',
  description: 'Transaction detail',
  definition(t) {
    t.string('date', {
      description: 'The date that this transaction event was recorded',
    });
    t.field('type', {
      description: 'The type of transaction',
      type: 'TransactionType',
    });
    t.string('description', {
      description: 'A description of the payment or adjustment',
    });
    t.float('value', {
      description:
        'The value of the transaction in NZD, represented as a number',
    });
    t.nullable.float('calculatedBalance', {
      description:
        'The calculated balance (amount to pay) following this specific transaction represented as a number',
    });
    t.nullable.string('billId', {
      description: 'The UUID of the digital bill',
    });
  },
});

export const AccountTransactionArgs = {
  accountNumber: stringArg(),
  startDate: nullable(stringArg()),
  endDate: nullable(stringArg()),
};

export const AccountTransactionsDetails = objectType({
  name: 'AccountTransactionsDetails',
  definition(t) {
    t.list.field('details', {
      type: AccountTransactionDetail,
      description:
        'Retrieve an array of transactions (payments, adjustments and charges) associated with an account over a period of time',
    });
  },
});

export const AccountTransactions = extendType({
  type: 'User',
  definition(t) {
    t.field('accountTransactions', {
      type: AccountTransactionsDetails,
      args: AccountTransactionArgs,
      async resolve(
        _,
        { accountNumber, startDate, endDate },
        { dataSources: { digitalBillAPI } },
      ) {
        const details = await digitalBillAPI.getAccountTransactions({
          accountNumber,
          startDate,
          endDate,
        });

        return {
          details,
        };
      },
    });
  },
});
