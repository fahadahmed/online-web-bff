import { rest } from 'msw';
import accountBalanceDetails from './account-balance.mock.json';

const baseUrl = 'http://testhost/v1/finance/balance/';

export const accountBalanceMock = rest.get<unknown, { accountNumber: string }>(
  `${baseUrl}account/:accountNumber`,
  async ({ params: { accountNumber } }, res, ctx) => {
    if (accountNumber.match(/^\d+$/) !== null) {
      return res(ctx.status(200), ctx.json(accountBalanceDetails));
    }
    /* If the accountNumber does not match the given pattern, [0-9]+
    for example, 713012977, then it returns failure response, "Bad Request" */
    return res(ctx.status(400), ctx.json({}));
  },
);

const handlers = [accountBalanceMock];

export default handlers;
