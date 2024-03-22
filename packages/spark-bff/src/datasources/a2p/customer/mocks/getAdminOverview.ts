import { rest } from 'msw';
import getAdminOverview from './getAdminOverview.mock.json';

export const getAdminOverviewMock = rest.get(
  `http://testhost/v1/services/a2p-messaging/customers/overview`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAdminOverview));
  },
);
