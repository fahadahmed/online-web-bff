import { rest } from 'msw';
import addContentProviderResponse from './addContentProviderResponse.mock.json';

export const addContentProviderMock = rest.post(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/content-providers`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(addContentProviderResponse));
  },
);
