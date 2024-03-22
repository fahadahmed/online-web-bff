import { rest } from 'msw';
import getUsage from './getUsage.mock.json';

export const getUsageMock = rest.get(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/usage`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(getUsage));
  },
);

export const getUsageMockNoCustomer = rest.get(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/usage`,
  async (_, res, ctx) => {
    return res(ctx.status(404), ctx.json({}));
  },
);
