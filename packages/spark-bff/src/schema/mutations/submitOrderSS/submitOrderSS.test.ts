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

test('Return failure for submitting Cancel (default) Order submission', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: { cartId: "abc", amount: 0, cancel: true, channel: personalss }
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
      "submitOrderSS": Object {
        "code": 9001,
        "confirmationEmailId": null,
        "message": "Internal server error",
        "orderNumber": null,
        "success": false,
      },
    }
  `);
});

test('Return success for submitting New Card', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: {
            cartId: "ONL36752564563"
            channel: personalss
            amount: 7.9
            lineNumber: "123123123"
            newCard: { shouldSaveCard: false, token: "token" }
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
      "submitOrderSS": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('Return success for submitting New Card with its saving', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: {
            cartId: "ONL36752564563"
            channel: personalss
            amount: 7.9
            lineNumber: "123123123"
            newCard: { shouldSaveCard: true, token: "token" }
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
      "submitOrderSS": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('Return success for submitting Existing Card', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: {
            cartId: "ONL36752564563"
            channel: personalss
            amount: 7.9
            lineNumber: "123123123"
            existingCard: {
              paymentMethodId: "MySpark-SSC1593745698013696-58453"
              paymentMethodSource: DIRECT
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
      "submitOrderSS": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('Return success for submitting Existing Card with its registering', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: {
            cartId: "ONL36752564563"
            channel: personalss
            amount: 7.9
            lineNumber: "123123123"
            existingCard: {
              paymentMethodId: "MySpark-SSC1593745698013696-58453"
              paymentMethodSource: WALLET_SELF
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
      "submitOrderSS": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('Return failure for submitting Existing Card without lineNumber', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: {
            cartId: "ONL36752564563"
            channel: personalss
            amount: 7.9
            existingCard: {
              paymentMethodId: "MySpark-SSC1593745698013696-58453"
              paymentMethodSource: WALLET_SELF
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
      "submitOrderSS": Object {
        "code": 5001,
        "confirmationEmailId": null,
        "message": "lineNumber is required",
        "orderNumber": null,
        "success": false,
      },
    }
  `);
});

test('Return success for submitting Prepaid Balance', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: {
            cartId: "ONL36752564563"
            channel: personalss
            amount: 7.9
            prepaidBalance: true
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
      "submitOrderSS": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('Return success for submitting Account', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: {
            cartId: "ONL36752564563"
            channel: personalss
            amount: 7.9
            account: true
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
      "submitOrderSS": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('Return success for submitting Voucher Balance', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: {
            cartId: "ONL36752564563"
            channel: personalss
            amount: 7.9
            voucher: true
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
      "submitOrderSS": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('Return success for submitting Cancel', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: {
            cartId: "ONL36752564563"
            channel: personalss
            amount: 0
            cancel: true
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
      "submitOrderSS": Object {
        "code": 2000,
        "confirmationEmailId": "sdfsdfsd@sdfsd.fsd",
        "message": "Order Successfully Initiated.",
        "orderNumber": "ONL36752564563",
        "success": true,
      },
    }
  `);
});

test('Return failure for submitting invalid data', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation {
        submitOrderSS(
          input: { cartId: "ONL36752564563", amount: 7.9, channel: personalss }
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
      "submitOrderSS": Object {
        "code": 5001,
        "confirmationEmailId": null,
        "message": "Invalid action.",
        "orderNumber": null,
        "success": false,
      },
    }
  `);
});
