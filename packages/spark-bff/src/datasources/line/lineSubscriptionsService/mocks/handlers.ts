import { rest } from 'msw';
import lineSubscriptionsService from './line-subscriptions-service.mock.json';
import noLineAccessSubscriptions from './line-subscriptions-no-access.json';
import unhandledErrorSubscriptions from './line-subscriptions-unhandled-error.json';
import neonSubscription from './neon-subscription.mock.json';
import netflixSubscription from './netflix-subscription.mock.json';
import skySportSubscription from './sky-sport-subscription.mock.json';
import sparkSportSubscription from './spark-sport-subscription.mock.json';
import spotifySubscription from './spotify-subscription.mock.json';
import spotifySubscriptionActive from './spotify-subscription-active.mock.json';
import mcafeeSubscriptionActive from './mcafee-subscription.mock.json';
import mcafeeSubscriptionNotActive from './mcafee-subscription-not-active.mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

export const subscriptionsHandlers = rest.get(
  'http://testhost/v1/lines/subscriptions/me',
  async (_, res, ctx) => {
    return res(ctx.delay(responseDelay), ctx.json(lineSubscriptionsService));
  },
);

export const subscriptionOfferWhenNoLineAccessHandler = rest.get(
  'http://testhost/v1/lines/subscriptions/me',
  async (_, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.delay(responseDelay),
      ctx.json(noLineAccessSubscriptions),
    );
  },
);

export const unhandledErrorSubscriptionsHandler = rest.get(
  'http://testhost/v1/lines/subscriptions/me',
  async (_, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.delay(responseDelay),
      ctx.json(unhandledErrorSubscriptions),
    );
  },
);

const handlers = [
  subscriptionsHandlers,
  rest.get(
    'http://testhost/v1/lines/:lineNumber/subscriptions/:productInstanceId',
    async ({ params: { lineNumber, productInstanceId } }, res, ctx) => {
      if (lineNumber === '0278675179') {
        switch (productInstanceId) {
          case '1-2HAZ11110': // neon
            return res(ctx.status(200), ctx.json(neonSubscription));
          case '1-2HA22220': // netflix
            return res(ctx.status(200), ctx.json(netflixSubscription));
          case '1-2HA33330': // sky sport
            return res(ctx.status(200), ctx.json(skySportSubscription));
          case '1-2HA44440': // spark sport
            return res(ctx.status(200), ctx.json(sparkSportSubscription));
          case '1-2HAZ55550': // spotify
            return res(ctx.status(200), ctx.json(spotifySubscription));
          case '1-2HAZ77770': // spotify active (change payment)
            return res(ctx.status(200), ctx.json(spotifySubscriptionActive));
          case '1-VX31188': // mcafee active
            return res(ctx.status(200), ctx.json(mcafeeSubscriptionActive));
          case '1-VX31189': // mcaFee not active
            return res(ctx.status(200), ctx.json(mcafeeSubscriptionNotActive));
          default:
            break;
        }
      }
      return null;
    },
  ),
];

export default handlers;
