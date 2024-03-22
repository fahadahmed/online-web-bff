import { rest } from 'msw';
import modifyShortcodeResponse from './modifyShortcode.mock.json';

export const modifyShortcodeMock = rest.patch(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/shortcodes/:shortcodeNumber`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(modifyShortcodeResponse));
  },
);
