import { rest } from 'msw';
import userInfoConsumer from './user-info-consumer.json';
import userInfoBusiness from './user-info-business.json';

export const userConsumerInfoMock = rest.get(
  'http://testhost/v1/user/oidc/userInfo',
  async (_, res, ctx) => {
    return res(ctx.json(userInfoConsumer));
  },
);

export const userBusinessInfoMock = rest.get(
  'http://testhost/v1/user/oidc/userInfo',
  async (_, res, ctx) => {
    return res(ctx.json(userInfoBusiness));
  },
);

export const unauthenticatedUserInfoMock = rest.get(
  'http://testhost/v1/user/oidc/userInfo',
  async (_, res, ctx) => {
    return res(ctx.status(401));
  },
);

export const internalServerErrorUserInfoMock = rest.get(
  'http://testhost/v1/user/oidc/userInfo',
  async (_, res, ctx) => {
    return res(ctx.status(500));
  },
);

const handlers = [userConsumerInfoMock];

export default handlers;
