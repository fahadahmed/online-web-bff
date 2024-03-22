import { rest } from 'msw';
import getShortcodes from './getShortcodes.mock.json';

export const getShortcodesMock = rest.get(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/shortcodes`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(getShortcodes));
  },
);
