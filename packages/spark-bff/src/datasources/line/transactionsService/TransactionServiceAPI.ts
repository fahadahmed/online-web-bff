import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/usageTransactionsService';
import { formatQuery } from 'utils/query';
import { transformTransactionList } from './helpers/transaction.helper';

class TransactionsServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/line/usage/me');
  }

  async getTransactionList(
    lineNumber: string,
    startDateTime: string,
    endDateTime: string,
    size: number,
    paymentStatus: string,
  ) {
    const queryParams = formatQuery({
      start: startDateTime,
      end: endDateTime,
      size,
    });
    const response = await this.get<definitions['UsageTransactions']>(
      `/${lineNumber}/transactions`,
      queryParams,
    );
    return transformTransactionList(response.transactions, paymentStatus);
  }
}

export default TransactionsServiceAPI;
