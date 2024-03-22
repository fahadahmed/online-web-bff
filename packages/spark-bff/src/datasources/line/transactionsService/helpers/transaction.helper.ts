import { definitions } from 'generated/typings/usageTransactionsService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

function mapTransactionsList(transactionList: definitions['Transaction'][]) {
  return transactionList.map((transaction) => {
    const { value, type, startDateTime, isDebit, description, currentBalance } =
      transaction;
    return {
      value,
      type,
      startDateTime,
      isDebit,
      description,
      currentBalance,
    };
  });
}

function getFilteredTransactions(
  transactionList: definitions['Transaction'][],
  paymentStatus: string,
) {
  const filteredTransactions = transactionList.filter(
    (transaction) =>
      transaction.paymentDetails.paymentStatus.toString() === paymentStatus,
  );
  return filteredTransactions;
}

export const transformTransactionList = (
  transactionList: definitions['Transaction'][],
  paymentStatus: string,
): NexusGenRootTypes['Transaction'][] => {
  const filteredTransactions = paymentStatus
    ? getFilteredTransactions(transactionList, paymentStatus)
    : transactionList;
  return mapTransactionsList(filteredTransactions);
};
