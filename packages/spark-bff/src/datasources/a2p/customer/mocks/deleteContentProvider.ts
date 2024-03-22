import { rest } from 'msw';

export const deleteContentProviderMock = rest.delete(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/content-providers/:contentProviderId`,
  async (_, res, ctx) => {
    return res(ctx.status(200));
  },
);
