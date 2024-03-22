import { rest } from 'msw';
import userAccess from './user-access.json';
import lineSummary from './line-summary.json';

const handlers = [
  rest.get('http://testhost/v2/user/access/me', async (_, res, ctx) => {
    return res(ctx.json(userAccess));
  }),
  rest.get('http://testhost/v1/lines/me/summary', async (_, res, ctx) => {
    return res(ctx.json(lineSummary));
  }),
];

export default handlers;
