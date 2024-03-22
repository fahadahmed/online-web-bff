import { rest } from 'msw';

import usageSummaryMock from './usage-summary.mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

const handlers = [
  rest.get(
    'http://testhost/v1/line/usage/me/:lineNumber',
    async (_, res, ctx) => {
      return res(ctx.delay(responseDelay), ctx.json(usageSummaryMock));
    },
  ),
  rest.get('http://testhost/v1/line/usage/me', async (_, res, ctx) => {
    return res(ctx.delay(responseDelay), ctx.json(usageSummaryMock));
  }),
];

export default handlers;
