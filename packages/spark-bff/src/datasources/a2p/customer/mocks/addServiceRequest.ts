import { rest } from 'msw';
import addServiceRequestResponse from './addServiceRequestResponse.mock.json';

export const addServiceRequestMock = rest.post(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/service-requests`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(addServiceRequestResponse));
  },
);
