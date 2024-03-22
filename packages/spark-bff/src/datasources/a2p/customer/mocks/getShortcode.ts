import { rest } from 'msw';
import getShortcode from './getShortcode.mock.json';

export const getShortcodeMock = rest.get(
  `http://testhost/v1/services/a2p-messaging/customers/:customerNumber/shortcodes/:shortcodeNumber`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(getShortcode));
  },
);
