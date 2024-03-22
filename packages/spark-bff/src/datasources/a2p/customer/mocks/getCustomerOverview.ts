import { rest } from 'msw';
import getCustomerOverview from './getCustomerOverview.mock.json';

export const getCustomerOverviewMock = rest.get(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/overview`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(getCustomerOverview));
  },
);

export const getCustomerOverviewMockWhenNoCustomer = rest.get(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/overview`,
  async (_, res, ctx) => {
    return res(ctx.status(404), ctx.json({}));
  },
);
