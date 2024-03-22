import { rest } from 'msw';
import getShortcodes from './getShortcodes.mock.json';

export const getAdminShortcodesMock = rest.get(
  `http://testhost/v1/services/a2p-messaging/shortcodes`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(getShortcodes));
  },
);
