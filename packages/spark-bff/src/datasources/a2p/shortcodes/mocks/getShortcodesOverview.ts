import { rest } from 'msw';
import getShortcodesOverview from './getShortcodesOverview.mock.json';

export const getAdminShortcodesOverviewMock = rest.get(
  `http://testhost/v1/services/a2p-messaging/shortcodes/overview`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(getShortcodesOverview));
  },
);
