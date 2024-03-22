import { rest } from 'msw';
import { cloneDeep } from 'lodash';
import { definitions } from 'generated/typings/cartServiceV2';
import db from './db';
import addBundleResponseMock from './add-bundle-response.mock.json';
import addItemsResponseMock from './add-items-response.mock.json';
import cartResponseMock from './get-shopping-cart-response.mock.json';
import failedAddonsCartResponseMock from './get-shopping-cart-failed-addons-response.mock.json';
import emptyCartResponseMock from './get-shopping-cart-empty-response.mock.json';
import genericFailedResponseMock from './generic-failed-response.mock.json';
import genericSuccessResponseMock from './generic-success-response.mock.json';
import sparkIdPlansCartWithAccountNumberMock from './get-cart-spark-id-plans-with-account-number.mock.json';
import jwtCartToken from './jwt-cart-token';
import productItem from './get_product_item.json';
import shippableItemsCartResponseMock from './get-shopping-cart-shippable-items.mock.json';
import netflixVasSubscriptionMock from './get-netflix-subscription.mock.json';
import spotifyVasSubscriptionMock from './get-spotify-subscription.mock.json';
import mcAfeeVasSubscriptionMock from './get-mcafee-subscription.mock.json';
import extrasMock from './get-extras-cart.mock.json';
import changePlanMock from './get-change-plan-cart.mock.json';
import changePlanPrepaidMock from './get-change-plan-prepaid-cart.mock.json';

const baseUrl = 'http://testhost/v1/shopping/cart';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

const cartResponseCopy = cloneDeep(
  cartResponseMock,
) as definitions['CartResponse'];

export const CartIds = {
  ModifyPostpaid: 'ss-vas-modify-postpaid',
  AddPrepaid: 'ss-vas-add-prepaid',
  AddPostpaid: 'ss-vas-add-postpaid',
  AddPostpaidMcAfee: 'ss-vas-add-postpaid-mcafee',
  ChangePaymentMethod: 'ss-vas-change-payment-method',
  ChangePlanPrepaid: 'ss-change-plan-prepaid',
  ChangePlanPostpaid: 'ss-change-plan-postpaid',
  ChangePlanMigration: 'ss-change-plan-migration',
  BuyExtrasPrepaid: 'ss-buy-extras-prepaid',
  BuyExtrasPostpaid: 'ss-buy-extras-postpaid',
  FailedRelatedProducts: 'failed-related-addons',
  Default: 'success-cart-id',
} as const;

interface AddBundleRequestBody {
  bundles: definitions['Bundle'][];
}

interface AddItemToBundleRequestBody {
  items: definitions['AddItemsToCartRequest']['items'];
}

type Bundle = definitions['CartBundle'];
type Items = Bundle['items'];
type Item = Items[0];

const generateCartId = (requestBody: AddBundleRequestBody) => {
  const {
    items: [{ productOfferingId }],
  } = requestBody.bundles[0];

  switch (productOfferingId) {
    // Subscriptions
    case 'misc583865':
    case 'mcafee-active':
    case 'Netflix': {
      return CartIds.ModifyPostpaid;
    }

    case 'spotify_premium_half_price_prepaid': {
      return CartIds.AddPrepaid;
    }

    case 'neon':
    case 'spark_sport':
    case 'spotify_premium_full_price':
    case 'spotify_premium_half_price_postpaid': {
      return CartIds.AddPostpaid;
    }

    case 'mcafee_standard':
    case 'mcafee_premium': {
      return CartIds.AddPostpaidMcAfee;
    }

    case 'misc050385':
    case 'misc077770':
    case 'netflix_premium': {
      return CartIds.ChangePaymentMethod;
    }

    // Change Plan
    case '32b96d99-2a34-4fc2-a0a5-111c4d36579e':
    case '1f0b37dc-0987-4aed-b2aa-a8f22c277e46':
    case 'f8f6d39c-32ca-4f85-af08-360bae815a76': {
      return CartIds.ChangePlanPrepaid;
    }

    case 'mbundle050820':
    case 'mbundle050516':
    case 'mbundle050665':
    case 'mbundle050666':
    case 'mbundle050586': {
      return CartIds.ChangePlanPostpaid;
    }

    // Buy Extras
    case 'dataextra050782_prepaid':
    case 'dataextra050783_prepaid':
    case 'dataextra050298_prepaid':
    case 'dataextra050333_pre_only':
    case 'dataextra050883_prepaid':
    case 'roamingpack050284_prepaid':
    case 'roamingpack050285_prepaid':
    case 'valuepack050310':
    case 'valuepack050311':
    case 'inttexttalk050301_prepaid':
    case 'talkextra050303_prepaid':
    case 'textextra050306_prepaid':
    case 'talkextra050304_prepaid':
    case 'talkextra050302_prepaid':
    case 'textextra050305_prepaid':
    case 'talktext050337_prepaid':
    case 'vcalling050613_pre_only': {
      return CartIds.BuyExtrasPrepaid;
    }

    case 'roamingpack050574_post_only':
    case 'roamingpack050697_post_only':
    case 'roamingpack050284_postpaid':
    case 'roamingpack050285_postpaid':
    case 'dataextra050883_postpaid':
    case 'misc050307_post_only':
    case 'inttexttalk050301_postpaid': {
      return CartIds.BuyExtrasPostpaid;
    }

    default: {
      // Mock cartId for retail
      // Note: this is only for sake of testing and development as cartId is usually jwt decoded here.
      return db.getCurrentId();
    }
  }
};

export const addBundleMock = rest.post(
  `${baseUrl}/items`,
  async (req, res, ctx) => {
    const getBundle = (productOfferingId: string) => {
      return (cartResponseMock as definitions['CartResponse']).bundles.find(
        (bundle) =>
          bundle.items.find(
            (item) => item.productOfferingId === productOfferingId,
          ),
      );
    };
    const body = req.body as AddBundleRequestBody;
    const { bundles } = body;
    const bundle = bundles[0];
    const cartBundle = getBundle(
      bundle.items[0].productOfferingId,
    ) as definitions['CartBundle'];
    const data = cartResponseMock as definitions['CartData'];

    db.initiateCartDB(data);

    const cartId = generateCartId(body);

    db.addBundle(cartId, cartBundle);

    const response = { ...addBundleResponseMock, cartId };

    return res(
      ctx.status(200),
      ctx.delay(responseDelay),
      ctx.cookie('CART.SUMMARY.st07', jwtCartToken),
      ctx.json(response),
    );
  },
);

export const addBundleFailureMock = rest.post(
  `${baseUrl}/items`,
  async (_, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.delay(responseDelay),
      ctx.json({
        messages: [{ message: 'Invalid Blue Marble Response.', code: 5301 }],
      }),
    );
  },
);

function getItemByProductOfferId(bundleId: string, itemId: string): Item {
  const deletedCartItem = cartResponseCopy.bundles
    .find((bundle) => bundle.id === bundleId)
    .items.find((item) => item.productOfferingId === itemId);

  if (deletedCartItem) {
    return deletedCartItem;
  }

  return {
    ...(productItem as Item),
    id: itemId,
  };
}

export const addItemToBundleMock = rest.post<
  AddItemToBundleRequestBody,
  { cartId: string; bundleId: string }
>(`${baseUrl}/:cartId/bundle/:bundleId/items`, async (req, res, ctx) => {
  const { cartId, bundleId } = req.params;
  const { items } = req.body;

  const item = getItemByProductOfferId(bundleId, items[0].productOfferingId);

  db.addItemToBundle(cartId, bundleId, item);

  return res(
    ctx.status(200),
    ctx.delay(responseDelay),
    ctx.json(genericSuccessResponseMock),
  );
});

export const addItemsHandler = rest.post(
  `${baseUrl}/:cartId/bundle/:bundleId/items`,
  async (req, res, ctx) => {
    const { cartId } = req.params;

    if (cartId === 'success-cart-id') {
      return res(
        ctx.status(200),
        ctx.delay(responseDelay),
        ctx.cookie('CART.SUMMARY.st07', jwtCartToken),
        ctx.json(addItemsResponseMock),
      );
    }

    return res(ctx.status(500), ctx.json(genericFailedResponseMock));
  },
);

function getMockCartDataById(cartId: string) {
  switch (cartId) {
    case 'success-cart-id':
      return cartResponseMock;

    case 'success-empty-cart-id':
      return emptyCartResponseMock;

    case 'success-shippable-items-cart-id':
      return shippableItemsCartResponseMock;

    default:
      return null;
  }
}

interface GetCartParams {
  cartId: string;
  fetchKey: string;
}

export const getCartByIdWithoutDatabaseMock = rest.get<GetCartParams>(
  `${baseUrl}/:cartId`,
  async (req, res, ctx) => {
    const cartId = req.params.cartId as string;

    if (cartId === CartIds.ModifyPostpaid)
      return res(ctx.status(200), ctx.json(netflixVasSubscriptionMock));

    if (
      cartId === CartIds.AddPrepaid ||
      cartId === CartIds.AddPostpaid ||
      cartId === CartIds.ChangePaymentMethod
    ) {
      return res(ctx.status(200), ctx.json(spotifyVasSubscriptionMock));
    }

    if (cartId === CartIds.AddPostpaidMcAfee) {
      return res(ctx.status(200), ctx.json(mcAfeeVasSubscriptionMock));
    }

    if (
      cartId === CartIds.BuyExtrasPrepaid ||
      cartId === CartIds.BuyExtrasPostpaid
    ) {
      return res(ctx.status(200), ctx.json(extrasMock));
    }

    if (
      cartId === CartIds.ChangePlanPostpaid ||
      cartId === CartIds.ChangePlanMigration
    ) {
      return res(ctx.status(200), ctx.json(changePlanMock));
    }
    if (cartId === CartIds.ChangePlanPrepaid) {
      return res(ctx.status(200), ctx.json(changePlanPrepaidMock));
    }

    if (cartId === CartIds.FailedRelatedProducts) {
      return res(ctx.status(200), ctx.json(failedAddonsCartResponseMock));
    }

    const responseBody = getMockCartDataById(cartId);
    if (!responseBody) {
      return res(ctx.status(404), ctx.delay(responseDelay));
    }

    return res(
      ctx.status(200),
      ctx.json(responseBody),
      ctx.delay(responseDelay),
    );
  },
);

/**
 * @deprecated use getCartByIdWithoutDatabaseMock instead
 */
export const getCartByIdMock = rest.get<GetCartParams>(
  `${baseUrl}/:cartId`,
  async (req, res, ctx) => {
    const cartId = req.params.cartId as string;

    if (cartId === CartIds.ModifyPostpaid)
      return res(ctx.status(200), ctx.json(netflixVasSubscriptionMock));

    if (
      cartId === CartIds.AddPrepaid ||
      cartId === CartIds.AddPostpaid ||
      cartId === CartIds.ChangePaymentMethod
    ) {
      return res(ctx.status(200), ctx.json(spotifyVasSubscriptionMock));
    }

    if (cartId === CartIds.AddPostpaidMcAfee) {
      return res(ctx.status(200), ctx.json(mcAfeeVasSubscriptionMock));
    }

    if (
      cartId === CartIds.BuyExtrasPrepaid ||
      cartId === CartIds.BuyExtrasPostpaid
    ) {
      return res(ctx.status(200), ctx.json(extrasMock));
    }

    if (
      cartId === CartIds.ChangePlanPostpaid ||
      cartId === CartIds.ChangePlanMigration
    ) {
      return res(ctx.status(200), ctx.json(changePlanMock));
    }
    if (cartId === CartIds.ChangePlanPrepaid) {
      return res(ctx.status(200), ctx.json(changePlanPrepaidMock));
    }

    if (cartId === CartIds.FailedRelatedProducts) {
      return res(ctx.status(200), ctx.json(failedAddonsCartResponseMock));
    }

    const data = getMockCartDataById(cartId) as definitions['CartData'];

    db.initiateCartDB(data);
    const cartItem = db.getById(cartId);

    return cartItem
      ? res(ctx.status(200), ctx.json(cartItem), ctx.delay(responseDelay))
      : res(ctx.status(404), ctx.delay(responseDelay));
  },
);

export const getCartByUserMock = rest.get<GetCartParams>(
  `${baseUrl}`,
  async (_, res, ctx) => {
    db.initiateCartDB();

    const cartId = db.getCurrentId();
    const cartItem = db.getById(cartId);

    return cartItem
      ? res(ctx.status(200), ctx.json(cartItem), ctx.delay(responseDelay))
      : res(ctx.status(400), ctx.delay(responseDelay));
  },
);

export const updateCartAccountMock = rest.patch(
  `${baseUrl}/:cartId`,
  async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(sparkIdPlansCartWithAccountNumberMock),
      ctx.delay(responseDelay),
    );
  },
);

export const deleteBundleMock = rest.delete<
  unknown,
  { cartId: string; bundleId: string }
>(`${baseUrl}/:cartId/bundle/:bundleId`, (req, res, ctx) => {
  if (
    req.url.pathname ===
    '/v1/shopping/cart/error-cart-id/bundle/error-bundle-id'
  ) {
    return res(ctx.status(404), ctx.json(genericFailedResponseMock));
  }

  db.initiateCartDB();
  db.deleteBundle(req.params.cartId, req.params.bundleId);

  return res(
    ctx.status(200),
    ctx.cookie('CART.SUMMARY.st07', jwtCartToken),
    ctx.json(cartResponseMock),
    ctx.delay(responseDelay),
  );
});

export const deleteItemFromBundleMock = rest.delete<
  unknown,
  { cartId: string; bundleId: string; itemId: string }
>(
  `${baseUrl}/:cartId/bundle/:bundleId/items/:itemId`,
  async (req, res, ctx) => {
    const { cartId, bundleId, itemId } = req.params;

    if (itemId === 'error-item-id') {
      return res(ctx.status(404), ctx.json(genericFailedResponseMock));
    }

    db.initiateCartDB();
    db.deleteItemFromBundle(cartId, bundleId, itemId);

    return res(
      ctx.status(200),
      ctx.cookie('CART.SUMMARY.local', jwtCartToken),
      ctx.delay(responseDelay),
      ctx.json(genericSuccessResponseMock),
    );
  },
);

export const initiateCheckoutHandler = rest.post<unknown, { cartId: string }>(
  `${baseUrl}/:cartId/checkout`,
  async (req, res, ctx) => {
    const { cartId } = req.params;
    if (Object.values<string>(CartIds).includes(cartId)) {
      return res(
        ctx.status(200),
        ctx.json(genericSuccessResponseMock),
        ctx.delay(responseDelay),
      );
    }

    return res(
      ctx.status(404),
      ctx.json(genericFailedResponseMock),
      ctx.delay(responseDelay),
    );
  },
);

export const submitRecommendationHandler = rest.post(
  `${baseUrl}/:cartId/bundle/:bundleId/recommendations`,
  async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(responseDelay),
      ctx.json(cartResponseMock),
    );
  },
);

const handlers = [
  addBundleMock,
  addItemToBundleMock,
  addItemsHandler,
  getCartByUserMock,
  getCartByIdMock,
  deleteBundleMock,
  deleteItemFromBundleMock,
  initiateCheckoutHandler,
  updateCartAccountMock,
  submitRecommendationHandler,
];

export default handlers;
