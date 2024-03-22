import { rest } from 'msw';
import { definitions } from 'generated/typings/productDetailServiceV2';
import deviceOfferByOfferIdsMock from './product-offers-by-offer-ids-device.mock.json';
import internalServerErrorMock from './internal-server-error.mock.json';
import productOffersByOfferIdsMock from './product-offers-by-offer-ids.mock.json';
import productOffersMock from './product-offers.mock.json';
import relatedAddonsMockResponse from './related-addons.mock.json';
import relatedIfpMock from './relatedIfp-default.mock.json';
import relatedIfpMockEmpty from './relatedIfp-empty.mock.json';
import relatedIfpMockVariant from './relatedIfp-variant.mock.json';
import emptyRelatedPlansMockResponse from './empty-related-addons.mock.json';
import relatedPlansMockResponse from './related-plans.mock.json';
import subscriptionOffersMock from './subscription-offers.mock.json';
import subscriptionProductOffersNetflixMock from './subscription-product-offers-netflix.mock.json';
import subscriptionProductOffersMcAfeeMock from './subscription-product-offers-mcafee.mock.json';
import subscriptionProductOffersMockNoResults from './subscription-product-offers-no-results.mock.json';
import planProductOffersPrepaidMock from './plan-product-offers-prepaid.mock.json';
import planProductOffersPostpaidMock from './plan-product-offers-postpaid.mock.json';
import planProductOffersMockNoResults from './plan-product-offers-no-results.mock.json';
import extrasPostpaidMockResponse from './extrasPostpaid.mock.json';
import extrasPrepaidMockResponse from './extrasPrepaid.mock.json';
import subscriptionsComparisonMock from './subscriptions-comparison.mock.json';
import plansComparisonMock from './plans-comparison.mock.json';
import noLineAccessSubscriptions from './no-line-access-subscriptions.json';
import unhandledSubscriptionsError from './unhandled-error-subscriptions.json';
import genericFailedResponseMock from './generic-failure-response.mock.json';
import forbiddenFailureMock from './forbiddenFailure.mock.json';

const v1BaseUrl = 'http://testhost/v1/products/offers';
const v2BaseUrl = 'http://testhost/v2/products/offers';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

export const productOffersHandler = rest.post<
  definitions['FetchCompatibleProductDetailsRequest']
>(`${v1BaseUrl}/subscriptions/search`, async (req, res, ctx) => {
  const { cartId } = req.body;

  if (cartId === 'success-cart-id') {
    return res(ctx.status(200), ctx.json(productOffersMock));
  }
  return res(ctx.status(400), ctx.json(internalServerErrorMock));
});

export const subscriptionOffersNoLineAccesHandler = rest.get(
  `${v2BaseUrl}/subscriptions/me`,
  async (_, res, ctx) => {
    return res(ctx.status(400), ctx.json(noLineAccessSubscriptions));
  },
);

export const subscriptionOffersUnhandledErrorHandler = rest.get(
  `${v2BaseUrl}/subscriptions/me`,
  async (_, res, ctx) => {
    return res(ctx.status(400), ctx.json(unhandledSubscriptionsError));
  },
);

export const subscriptionOffersHandler = rest.get(
  `${v2BaseUrl}/subscriptions/me`,
  async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        subscriptions: subscriptionOffersMock.subscriptions,
      }),
    );
  },
);

export const relatedPlansHandler = rest.post(
  `${v1BaseUrl}/plans/search`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(relatedPlansMockResponse));
  },
);

export const extrasHandler = rest.get(
  `${v2BaseUrl}/extras/lines/:lineNumber/categories`,
  async (req, res, ctx) => {
    const { lineNumber } = req.params;
    if (lineNumber === '0276398120') {
      return res(ctx.json(extrasPrepaidMockResponse));
    }
    return res(ctx.json(extrasPostpaidMockResponse));
  },
);

export const relatedAddonsHandler = rest.post<
  definitions['FetchCompatibleProductDetailsRequest']
>(`${v1BaseUrl}/deviceaddons/search`, async (req, res, ctx) => {
  if (req.body.bundles[0].id === 'empty-addons-id')
    return res(ctx.status(200), ctx.json(emptyRelatedPlansMockResponse));

  if (req.body.bundles[0].id === 'fail-bundle-id')
    return res(ctx.status(500), ctx.json(genericFailedResponseMock));

  return res(ctx.status(200), ctx.json(relatedAddonsMockResponse));
});

export const relatedIfpHandler = rest.post<
  definitions['FetchCompatibleProductDetailsRequest']
>(`${v1BaseUrl}/ifp/search`, async (req, res, ctx) => {
  const requestOffer = req.body.bundles[0].items[0];

  if (
    requestOffer.offeringId?.includes('128gb') ||
    requestOffer.id?.includes('128gb')
  ) {
    return res(
      ctx.delay(responseDelay),
      ctx.status(200),
      ctx.json(relatedIfpMockVariant),
    );
  }
  if (
    requestOffer.offeringId?.includes('empty') ||
    requestOffer.id?.includes('empty')
  ) {
    return res(
      ctx.delay(responseDelay),
      ctx.status(200),
      ctx.json(relatedIfpMockEmpty),
    );
  }
  return res(
    ctx.delay(responseDelay),
    ctx.status(200),
    ctx.json(relatedIfpMock),
  );
});

export const getProductOffersByOfferIdsHandler = rest.get(
  `${v1BaseUrl}/details`,
  async (req, res, ctx) => {
    const offerIdParams = req.url.searchParams.get('offerIds');
    const externalIdParams = req.url.searchParams.get('externalIds');

    const paramOfferIds: string[] = offerIdParams
      ? offerIdParams.split(',')
      : externalIdParams.split(',');

    const offerDetails = productOffersByOfferIdsMock.offerDetails.filter(
      (offer) =>
        paramOfferIds?.includes(offerIdParams ? offer.id : offer.externalId),
    );

    if (offerIdParams?.includes('iphone')) {
      return res(ctx.status(200), ctx.json(deviceOfferByOfferIdsMock));
    }

    return res(
      ctx.status(200),
      ctx.json({ ...productOffersByOfferIdsMock, offerDetails }),
    );
  },
);

export const subscriptionProductOffersHandler = rest.get(
  `${v2BaseUrl}/subscriptions/lines/:lineNumber/:productInstanceId`,
  async (req, res, ctx) => {
    const { lineNumber, productInstanceId } = req.params;

    if (lineNumber === '0278675179') {
      if (productInstanceId === '1-2HA22220') {
        return res(
          ctx.status(200),
          ctx.json(subscriptionProductOffersNetflixMock),
        );
      }

      if (productInstanceId === '1-VX31188') {
        return res(
          ctx.status(200),
          ctx.json(subscriptionProductOffersMcAfeeMock),
        );
      }
    }

    return res(
      ctx.status(200),
      ctx.json(subscriptionProductOffersMockNoResults),
    );
  },
);

export const planProductOffersHandler = rest.get(
  `${v2BaseUrl}/plans/lines/:lineNumber`,
  async (req, res, ctx) => {
    const { lineNumber } = req.params;
    if (lineNumber === '0276404520') {
      // prepaid
      return res(ctx.status(200), ctx.json(planProductOffersPrepaidMock));
    }
    if (lineNumber === '0211615249') {
      // postpaid
      return res(ctx.status(200), ctx.json(planProductOffersPostpaidMock));
    }
    return res(ctx.status(200), ctx.json(planProductOffersMockNoResults));
  },
);

export const getSubscriptionsComparisonHandler = rest.get(
  `${v1BaseUrl}/plans/comparison/subscriptions`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(subscriptionsComparisonMock));
  },
);

export const getPlansMpdComparisonHandler = rest.get(
  `${v1BaseUrl}/plans/comparison/mpd`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(plansComparisonMock));
  },
);

export const forbiddenGetPlansMpdComparisonHandler = rest.get(
  `${v1BaseUrl}/plans/comparison/mpd`,
  async (_, res, ctx) => {
    return res(ctx.status(403), ctx.json(forbiddenFailureMock));
  },
);

const handlers = [
  getProductOffersByOfferIdsHandler,
  productOffersHandler,
  relatedAddonsHandler,
  relatedIfpHandler,
  relatedPlansHandler,
  extrasHandler,
  subscriptionOffersHandler,
  subscriptionProductOffersHandler,
  planProductOffersHandler,
  getSubscriptionsComparisonHandler,
  getPlansMpdComparisonHandler,
];

export default handlers;
