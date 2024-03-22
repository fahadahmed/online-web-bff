import { rest } from 'msw';

export const modifyContentProviderMock = rest.put(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/content-providers/:contentProviderId`,
  async (_, res, ctx) => {
    return res(ctx.status(200));
  },
);
