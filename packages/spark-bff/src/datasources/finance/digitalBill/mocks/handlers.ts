import { rest } from 'msw';
import accountBillingSummary from './account-billing-summary.mock.json';
import accountTransactions from './account-transactions.mock.json';

const baseUrl = 'http://testhost/v2/finance';

export const accountBillingSummaryMock = rest.get(
  `${baseUrl}/:accountNumber/bills/summary`,
  async (_, res, ctx) => {
    return res(ctx.json(accountBillingSummary));
  },
);

export const accountTransactionsMock = rest.get(
  `${baseUrl}/:accountNumber/bills/transactions`,
  async (_, res, ctx) => {
    return res(ctx.json(accountTransactions));
  },
);

const handlers = [accountBillingSummaryMock, accountTransactionsMock];

export default handlers;
