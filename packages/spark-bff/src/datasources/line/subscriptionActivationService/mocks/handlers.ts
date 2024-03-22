import { rest } from 'msw';
import lineSubscriptionActivationSuccessMock from './line-subscription-activation-success.mock.json';
import lineSubscriptionActivationSuccessWithLockTtlMock from './line-subscription-activation-success-with-localttl.mock.json';
import lineSubscriptionActivationFail4001Mock from './line-subscription-activation-fail4001.mock.json';
import lineSubscriptionActivationFail4002Mock from './line-subscription-activation-fail4002.mock.json';
import lineSubscriptionActivationFail4003Mock from './line-subscription-activation-fail4003.mock.json';
import lineSubscriptionActivationFail4004Mock from './line-subscription-activation-fail4004.mock.json';
import lineSubscriptionActivationFail4005Mock from './line-subscription-activation-fail4005.mock.json';
import lineSubscriptionActivationFail4006Mock from './line-subscription-activation-fail4006.mock.json';
import lineSubscriptionActivationFail4007Mock from './line-subscription-activation-fail4007.mock.json';
import lineSubscriptionActivationFail4008Mock from './line-subscription-activation-fail4008.mock.json';
import lineSubscriptionActivationFail9001Mock from './line-subscription-activation-fail9001.mock.json';

export const getLineSubscriptionActivationMock = rest.get(
  'http://testhost/v1/lines/:lineNumber/subscriptions/:productInstanceId/activation',
  async ({ params: { lineNumber, productInstanceId } }, res, ctx) => {
    if (lineNumber === '999999') {
      switch (productInstanceId) {
        case '4001':
          return res(
            ctx.status(400),
            ctx.json(lineSubscriptionActivationFail4001Mock),
          );
        case '4002':
          return res(
            ctx.status(400),
            ctx.json(lineSubscriptionActivationFail4002Mock),
          );
        case '4003':
          return res(
            ctx.status(400),
            ctx.json(lineSubscriptionActivationFail4003Mock),
          );
        case '4004':
          return res(
            ctx.status(400),
            ctx.json(lineSubscriptionActivationFail4004Mock),
          );
        case '4005':
          return res(
            ctx.status(400),
            ctx.json(lineSubscriptionActivationFail4005Mock),
          );
        case '4006':
          return res(
            ctx.status(400),
            ctx.json(lineSubscriptionActivationFail4006Mock),
          );
        case '4007':
          return res(
            ctx.status(401),
            ctx.json(lineSubscriptionActivationFail4007Mock),
          );
        case '4008':
          return res(
            ctx.status(403),
            ctx.json(lineSubscriptionActivationFail4008Mock),
          );
        case '9001':
          return res(
            ctx.status(500),
            ctx.json(lineSubscriptionActivationFail9001Mock),
          );
        default:
          break;
      }
    }

    if (lineNumber === '888888') {
      return res(
        ctx.status(200),
        ctx.json(lineSubscriptionActivationSuccessWithLockTtlMock),
      );
    }

    return res(
      ctx.status(200),
      ctx.json(lineSubscriptionActivationSuccessMock),
    );
  },
);

const handlers = [getLineSubscriptionActivationMock];

export default handlers;
