import { rest } from 'msw';
import getContentProviders from './getContentProviders.mock.json';

export const getContentProvidersMock = rest.get(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/content-providers`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(getContentProviders));
  },
);
