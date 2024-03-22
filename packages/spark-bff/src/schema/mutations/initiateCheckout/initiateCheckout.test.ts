import { initiateCheckoutHandler } from 'datasources/shop/cart/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';

beforeEach(() => {
  mockServer.use(initiateCheckoutHandler);
});

test('returns success for initiating checkout process with a valid cart id', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        initiateCheckout(
          input: { cartId: "success-cart-id", channel: personalshop }
        ) {
          message
          code
          success
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "initiateCheckout": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);
});

test('returns error response for initiating checkout process with a bad cart id', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        initiateCheckout(
          input: { cartId: "bad-cart-id", channel: personalshop }
        ) {
          message
          code
          success
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "initiateCheckout": Object {
        "code": 9001,
        "message": "Internal server error",
        "success": false,
      },
    }
  `);
});
