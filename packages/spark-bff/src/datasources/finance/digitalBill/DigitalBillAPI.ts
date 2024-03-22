import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/digitalBill';
import { formatQuery } from 'utils/query';
import {
  transformAccountBillingSummary,
  transformAccountTransactions,
} from './helpers/digitalBill.helper';

interface BillFilterParams {
  accountNumber: string;
  startDate?: string;
  endDate?: string;
}

class DigitalBillAPI extends DESLDataSource {
  constructor() {
    super('/v2/finance');
  }

  async getAccountBillingSummary({
    accountNumber,
    startDate,
    endDate,
  }: BillFilterParams) {
    const queryParameters = formatQuery({ startDate, endDate });
    const { breakdown } = await this.get<definitions['BillOverviewSummary']>(
      `/${accountNumber}/bills/summary`,
      queryParameters,
    );
    return transformAccountBillingSummary(breakdown);
  }

  async getAccountTransactions({
    accountNumber,
    startDate,
    endDate,
  }: BillFilterParams) {
    const queryParameters = formatQuery({ startDate, endDate });
    const { details } = await this.get<definitions['BillTransactionDetails']>(
      `/${accountNumber}/bills/transactions`,
      queryParameters,
    );
    return transformAccountTransactions(details);
  }
}

export default DigitalBillAPI;
