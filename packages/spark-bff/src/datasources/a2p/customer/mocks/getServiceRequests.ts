import { rest } from 'msw';
import getServiceRequests from './getServiceRequests.mock.json';

export const getServiceRequestsMock = rest.get(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/service-requests`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(getServiceRequests));
  },
);
