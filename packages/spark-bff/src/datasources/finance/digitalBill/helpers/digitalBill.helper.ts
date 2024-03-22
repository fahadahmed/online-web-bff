import { definitions } from 'generated/typings/digitalBill';
import { NexusGenEnums, NexusGenRootTypes } from 'generated/nexusTypes';
import { parseNZD } from 'utils';

type TransactionType = definitions['TransactionDetail']['type'];
type TransactionDetails = definitions['TransactionDetail'][];

export const transformAccountBillingSummary = (
  bills: definitions['SummaryBreakdownDetail'][],
): NexusGenRootTypes['BillSummary'] => {
  return {
    bills: bills.map(({ chargeSummary, ...remainingProps }) => {
      const charges = chargeSummary.map(({ type, value }) => {
        return {
          type,
          value: parseNZD(value),
        };
      });

      const totalValue = charges.reduce((total, { value }) => total + value, 0);

      return {
        charges: [{ type: 'ALL_CHARGES', value: totalValue }, ...charges],
        ...remainingProps,
      };
    }),
  };
};

const mapTransactionType = (
  type: TransactionType,
): NexusGenEnums['TransactionType'] => {
  // GraphQL doesn't like this enum because of the space
  if (type === 'Late Fee') {
    return 'Late_Fee';
  }

  return type;
};

export const transformAccountTransactions = (
  transactionDetails: TransactionDetails,
): NexusGenRootTypes['AccountTransactionDetail'][] => {
  const details = transactionDetails.map(
    ({
      calculatedBalance,
      date,
      type: deslTransactionType,
      value,
      description,
      billId,
    }) => {
      const type: NexusGenEnums['TransactionType'] =
        mapTransactionType(deslTransactionType);

      return { calculatedBalance, date, type, value, description, billId };
    },
  );
  return details;
};
