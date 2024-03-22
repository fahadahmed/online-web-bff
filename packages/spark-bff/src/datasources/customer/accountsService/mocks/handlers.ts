import { rest } from 'msw';
import accountSummaryMock from './account-summary.mock.json';
import emptyAccountListMock from './empty-account-list.mock.json';
import singleAccountListMock from './single-account-list.mock.json';
import accountListMock from './account-list.mock.json';
import guestAccountListMock from './guest-account-list.mock.json';
import unauthorizedAccountListMock from './unauthorized-account-list.mock.json';

const baseUrl = 'http://testhost/v1/customer/account';

export const accountSummaryHandler = rest.get<unknown, { accountId: string }>(
  `${baseUrl}/:accountId/summary`,
  async (req, res, ctx) => {
    const { accountId } = req.params;
    if (accountId.match(/^\d+$/) !== null) {
      return res(ctx.status(200), ctx.json(accountSummaryMock));
    }
    /* If the accountNumber does not match the given pattern, [0-9]+
    for example, 713012977, then it returns failure response, "Bad Request" */
    return res(ctx.status(400), ctx.json({}));
  },
);

export const accountListHandler = rest.get(
  `${baseUrl}/me/list`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(accountListMock));
  },
);

export const singleAccountListHandler = rest.get(
  `${baseUrl}/me/list`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(singleAccountListMock));
  },
);

export const emptyAccountListHandler = rest.get(
  `${baseUrl}/me/list`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(emptyAccountListMock));
  },
);

export const unauthorizedAccountListHandler = rest.get(
  `${baseUrl}/me/list`,
  async (_, res, ctx) => {
    return res(ctx.status(401), ctx.json(unauthorizedAccountListMock));
  },
);

export const guestAccountListHandler = rest.get(
  `${baseUrl}/me/list`,
  async (_, res, ctx) => {
    return res(ctx.status(403), ctx.json(guestAccountListMock));
  },
);

const handlers = [accountSummaryHandler, accountListHandler];

export default handlers;
