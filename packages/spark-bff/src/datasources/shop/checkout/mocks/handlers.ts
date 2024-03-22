import { rest } from 'msw';
import { definitions } from 'generated/typings/checkoutSectionV2';
import { CartIds } from '../../cart/mocks/handlers';
import accountVerificationFailureMock from './account-verification-failure-response.mock.json';
import genericSuccessResponseMock from './generic-success-response.mock.json';
import genericFailedResponseMock from './generic-failed-response.mock.json';

import businessShopCheckoutStructureMock from './businessShopCheckoutStructure.mock.json';
import personalShopCheckoutStructureMock from './personalShopCheckoutStructure.mock.json';

import {
  ssChangePlanMigrationMock,
  ssChangePlanPostpaidMock,
  ssChangePlanPrepaidMock,
} from './selfServiceChangePlan';
import { ssExtrasPostpaidMock, ssExtrasPrepaidMock } from './selfServiceExtras';
import {
  ssVasAddPostpaidMcAfeeMock,
  ssVasAddPostpaidMock,
  ssVasAddPrepaidMock,
  ssVasChangePaymentMethodMock,
  ssVasModifyPostpaidMock,
} from './selfServiceVAS';

import db from './db';

const baseUrl = 'http://testhost/v1/shopping/checkout/cart';
const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

type MockResponse = {
  sections: definitions['CheckoutStructureSection'][];
};

interface SelfServiceCartMocks {
  [key: string]: MockResponse;
}

const selfServiceCartMocks: SelfServiceCartMocks = {
  [CartIds.ChangePaymentMethod]: ssVasChangePaymentMethodMock,
  [CartIds.AddPrepaid]: ssVasAddPrepaidMock,
  [CartIds.AddPostpaid]: ssVasAddPostpaidMock,
  [CartIds.AddPostpaidMcAfee]: ssVasAddPostpaidMcAfeeMock,
  [CartIds.ModifyPostpaid]: ssVasModifyPostpaidMock,
  [CartIds.BuyExtrasPrepaid]: ssExtrasPrepaidMock,
  [CartIds.BuyExtrasPostpaid]: ssExtrasPostpaidMock,
  [CartIds.ChangePlanPrepaid]: ssChangePlanPrepaidMock,
  [CartIds.ChangePlanPostpaid]: ssChangePlanPostpaidMock,
  [CartIds.ChangePlanMigration]: ssChangePlanMigrationMock,
};

const selfServiceCartIds = Object.keys(selfServiceCartMocks);

export const getCheckoutStructureHandler = rest.get<
  unknown,
  { cartId: string }
>(`${baseUrl}/:cartId/details`, async (req, res, ctx) => {
  const {
    params: { cartId },
  } = req;
  if (selfServiceCartIds.includes(cartId)) {
    const mockResponse = selfServiceCartMocks[cartId];
    return res(
      ctx.delay(responseDelay),
      ctx.status(200),
      ctx.json(mockResponse),
    );
  }

  const channel = req.url.searchParams.get('channel');
  if (channel === 'businessshop') {
    return res(
      ctx.delay(responseDelay),
      ctx.status(200),
      ctx.json(businessShopCheckoutStructureMock),
    );
  }

  return res(
    ctx.delay(responseDelay),
    ctx.status(200),
    ctx.json(personalShopCheckoutStructureMock),
  );
});

export const getCheckoutDataHandler = rest.get<unknown, { cartId: string }>(
  `${baseUrl}/:cartId`,
  async (req, res, ctx) => {
    const { cartId } = req.params;
    const data = db.getCheckoutData(cartId);

    return data
      ? res(ctx.delay(responseDelay), ctx.status(200), ctx.json(data))
      : res(ctx.delay(responseDelay), ctx.json({ sections: null }));
  },
);

type CheckoutRequest = definitions['SubmitCheckoutSectionRequest'];

export const saveCheckoutStepSuccessHandler = rest.post<
  CheckoutRequest,
  { cartId: string; sectionId: string }
>(`${baseUrl}/:cartId/section/:sectionId`, async (req, res, ctx) => {
  const { steps } = req.body;
  const { cartId, sectionId } = req.params;

  if (cartId === 'bad-cart-id') {
    return res(
      ctx.delay(responseDelay),
      ctx.status(500),
      ctx.json(genericFailedResponseMock),
    );
  }
  if (cartId === 'failed-verification-cart-id') {
    return res(
      ctx.delay(responseDelay),
      ctx.status(200),
      ctx.json(accountVerificationFailureMock),
    );
  }
  db.addSection({ cartId, sectionId, steps });
  return res(
    ctx.delay(responseDelay),
    ctx.status(200),
    ctx.json(genericSuccessResponseMock),
  );
});

const handlers = [
  getCheckoutDataHandler,
  getCheckoutStructureHandler,
  saveCheckoutStepSuccessHandler,
];

export default handlers;
