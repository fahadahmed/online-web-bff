import { rest } from 'msw';
import prepaidBalanceDetails from './prepaid-balance.mock.json';

const baseUrl = 'http://testhost/v1/finance/balance/';

export const prepaidBalanceMock = rest.get(
  `${baseUrl}prepaid/:lineNumber`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(prepaidBalanceDetails));
  },
);

const handlers = [prepaidBalanceMock];

export default handlers;
