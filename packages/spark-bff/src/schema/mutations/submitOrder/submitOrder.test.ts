import { submitOrderMock } from 'datasources/shop/order/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import { registerCardHandler } from '../../../datasources/finance/paymentService/mocks/handlers';
import { addWalletPaymentMethodMock } from '../../../datasources/finance/walletService/mocks/handlers';

beforeEach(() => {
  mockServer.use(
    submitOrderMock,
    registerCardHandler,
    addWalletPaymentMethodMock,
  );
});

test('return success for order submission', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrder(
          input: { cartId: "ONL36752564563", channel: personalshop }
        ) {
          code
          message
          success
          orderNumber
          confirmationEmailId
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitOrder": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('return failure for order submission', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrder(input: { cartId: "abc", channel: personalshop }) {
          code
          message
          success
          orderNumber
          confirmationEmailId
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitOrder": Object {
        "code": 9001,
        "confirmationEmailId": null,
        "message": "Internal server error",
        "orderNumber": null,
        "success": false,
      },
    }
  `);
});

test('return success for register card with savedPaymentMethod', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrder(
          input: {
            cartId: "ONL36752564563"
            channel: personalshop
            savedPaymentMethod: {
              amount: 7.9
              paymentMethodId: "MySpark-SSC1593745698013696-58453"
            }
          }
        ) {
          code
          message
          success
          orderNumber
          confirmationEmailId
        }
      }
    `,
  });
  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitOrder": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('return success for register card with cardToSave', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrder(
          input: {
            cartId: "ONL36752564563"
            channel: personalshop
            cardToSave: {
              amount: 7.9
              token: "738ef849-e3e8-4bf6-9b35-f3e25c2643fc"
            }
          }
        ) {
          code
          message
          success
          orderNumber
          confirmationEmailId
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitOrder": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});
