import { submitOrderMock } from 'datasources/shop/order/mocks/handlers';
import { addWalletPaymentMethodMock } from 'datasources/finance/walletService/mocks/handlers';
import { registerCardHandler } from 'datasources/finance/paymentService/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';

beforeEach(() => {
  mockServer.use(
    submitOrderMock,
    addWalletPaymentMethodMock,
    registerCardHandler,
  );
});

test('return success for submitOrder with saved payment method', async () => {
  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation SubmitOrderWithSavedPaymentMethod($input: SubmitOrderInput!) {
        submitOrder(input: $input) {
          code
          message
          success
          orderNumber
          confirmationEmailId
        }
      }
    `,
    variables: {
      input: {
        cartId: 'ONL36752564563',
        channel: 'personalshop',
        lineNumber: '123123123',
        cardToSave: {
          amount: 120.0,
          cardholderName: 'Brandon Johnston',
          token: 'test-token',
        },
      },
    },
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
