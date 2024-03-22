import { rest } from 'msw';

import usageTransactionMock from './usage-transaction-mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

const handlers = [
  rest.get(
    'http://testhost/v1/line/usage/me/:lineNumber/transactions',
    async (req, res, ctx) => {
      const startDate = req.url.searchParams.get('start');
      const endDate = req.url.searchParams.get('end');
      const size = req.url.searchParams.get('size');

      if (
        startDate === '2020-01-01T00:00:00.000+13:00' &&
        endDate === '2020-03-02T00:00:00.000+13:00' &&
        size === '20'
      ) {
        return res(ctx.delay(responseDelay), ctx.json(usageTransactionMock));
      }

      return res(ctx.delay(responseDelay), ctx.json(usageTransactionMock));
    },
  ),
];

export default handlers;
