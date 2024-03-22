import { rest } from 'msw';
import changeNameUser from './change-name-user.json';

export const userChangeNameInfoMock = rest.patch(
  'http://testhost/v1/user/identity/me',
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(changeNameUser));
  },
);

const handlers = [userChangeNameInfoMock];

export default handlers;
