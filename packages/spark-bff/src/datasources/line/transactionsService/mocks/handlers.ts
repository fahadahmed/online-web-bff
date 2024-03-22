import { rest } from 'msw';
import transactionListMock from './transaction-list.mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

export const getTransactionListMock = rest.get(
  'http://testhost/v1/line/usage/me/:lineNumber/transactions',
  async (_, res, ctx) => {
    return res(
      ctx.delay(responseDelay),
      ctx.status(200),
      ctx.json(transactionListMock),
    );
  },
);

const handlers = [getTransactionListMock];

export default handlers;
