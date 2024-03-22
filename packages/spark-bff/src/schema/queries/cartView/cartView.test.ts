import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer, rest } from 'test/server';
import {
  accountListHandler,
  emptyAccountListHandler,
  guestAccountListHandler,
} from 'datasources/customer/accountsService/mocks/handlers';
import guestEmptyCartMock from 'datasources/shop/cart/mocks/get-cart-guest-empty.mock.json';
import guestPlansCartMock from 'datasources/shop/cart/mocks/get-cart-guest-plans.mock.json';
import sparkIdPlanCartMock from 'datasources/shop/cart/mocks/get-cart-spark-id-plans.mock.json';
import sparkIdPlanCartWithAccountNumberMock from 'datasources/shop/cart/mocks/get-cart-spark-id-plans-with-account-number.mock.json';

const getCartHandler = rest.get(
  'http://testhost/v1/shopping/cart/:cartId',
  async (req, res, ctx) => {
    const cartId = req.params.cartId as string;

    if (cartId === 'success-guest-empty-cart-id') {
      return res(ctx.status(200), ctx.json(guestEmptyCartMock));
    }

    if (cartId === 'success-guest-plans-cart-id') {
      return res(ctx.status(200), ctx.json(guestPlansCartMock));
    }

    if (cartId === 'success-spark-id-plans-cart-id') {
      return res(ctx.status(200), ctx.json(sparkIdPlanCartMock));
    }

    if (cartId === 'success-spark-id-plans-with-account-number-cart-id') {
      return res(
        ctx.status(200),
        ctx.json(sparkIdPlanCartWithAccountNumberMock),
      );
    }

    return res(ctx.status(404));
  },
);

test('cartView responds with null cart and EMPTY_SCREEN for cart error scenario', async () => {
  mockServer.use(getCartHandler, guestAccountListHandler);

  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query CartViewQuery($cartId: String!, $channel: CartChannel!) {
        cartView(cartId: $cartId, channel: $channel) {
          id
          cart {
            id
            cartId
            bundles {
              bundleId
              items {
                itemId
                title
              }
            }
          }
          screen
          mandatoryAction
        }
      }
    `,
    variables: {
      cartId: 'fail-cart-id',
      channel: 'personalshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test('cartView responds with cart and EMPTY_SCREEN for empty cart scenario', async () => {
  mockServer.use(getCartHandler, guestAccountListHandler);

  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query CartViewQuery($cartId: String!, $channel: CartChannel!) {
        cartView(cartId: $cartId, channel: $channel) {
          id
          cart {
            id
            cartId
            bundles {
              bundleId
              items {
                itemId
                title
              }
            }
          }
          screen
          mandatoryAction
        }
      }
    `,
    variables: {
      cartId: 'success-guest-empty-cart-id',
      channel: 'personalshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test('cartView responds with cart and OVERVIEW_SCREEN for guest scenario', async () => {
  mockServer.use(getCartHandler, guestAccountListHandler);

  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query CartViewQuery($cartId: String!, $channel: CartChannel!) {
        cartView(cartId: $cartId, channel: $channel) {
          id
          cart {
            id
            cartId
            bundles {
              bundleId
              items {
                itemId
                title
              }
            }
          }
          screen
          mandatoryAction
        }
      }
    `,
    variables: {
      cartId: 'success-guest-plans-cart-id',
      channel: 'personalshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test('cartView responds with cart, OVERVIEW_SCREEN and CHOOSE_ACCOUNT mandatory action for Spark Id cart without account number scenario', async () => {
  mockServer.use(getCartHandler, accountListHandler);

  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query CartViewQuery($cartId: String!, $channel: CartChannel!) {
        cartView(cartId: $cartId, channel: $channel) {
          id
          cart {
            id
            cartId
            bundles {
              bundleId
              items {
                itemId
                title
              }
            }
          }
          screen
          mandatoryAction
        }
      }
    `,
    variables: {
      cartId: 'success-spark-id-plans-cart-id',
      channel: 'personalshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test('cartView responds with cart, OVERVIEW_SCREEN and no mandatory action for Spark Id cart with account number scenario', async () => {
  mockServer.use(getCartHandler, accountListHandler);

  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query CartViewQuery($cartId: String!, $channel: CartChannel!) {
        cartView(cartId: $cartId, channel: $channel) {
          id
          cart {
            id
            cartId
            bundles {
              bundleId
              items {
                itemId
                title
              }
            }
          }
          screen
          mandatoryAction
        }
      }
    `,
    variables: {
      cartId: 'success-spark-id-plans-with-account-number-cart-id',
      channel: 'personalshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test('cartView responds with cart and NO_ACCOUNT_SCREEN for Spark Id cart with no accounts scenario', async () => {
  mockServer.use(getCartHandler, emptyAccountListHandler);

  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query CartViewQuery($cartId: String!, $channel: CartChannel!) {
        cartView(cartId: $cartId, channel: $channel) {
          id
          cart {
            id
            cartId
            bundles {
              bundleId
              items {
                itemId
                title
              }
            }
          }
          screen
          mandatoryAction
        }
      }
    `,
    variables: {
      cartId: 'success-spark-id-plans-cart-id',
      channel: 'personalshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
