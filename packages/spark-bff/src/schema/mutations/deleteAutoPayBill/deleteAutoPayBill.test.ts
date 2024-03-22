import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { deleteAutoPayBillMock } from 'datasources/finance/paymentService/billPayment/mocks/handlers';

beforeEach(() => {
  server.use(deleteAutoPayBillMock);
});

test('successfully removes existing monthly payment', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        removeExistingMonthlyPayment(
          input: {
            #accountNumber accepts for example, 746738998
            accountNumber: "758563883"
            #paymentMethodId accepts, for example, 1-S0123-23
            paymentMethodId: "1-S0123-23"
          }
        ) {
          code
          message
          success
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "removeExistingMonthlyPayment": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);
});

test('returns validation failure when Invalid values are provided for accountNumber and paymentMethodId.', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        removeExistingMonthlyPayment(
          input: {
            #accountNumber accepts for example, 746738998
            accountNumber: "AT7585683"
            #paymentMethodId accepts, for example, 1-S0123-23
            paymentMethodId: "id-0123-a23"
          }
        ) {
          code
          message
          success
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "removeExistingMonthlyPayment": Object {
        "code": 4000,
        "message": "Request validation failure.",
        "success": false,
      },
    }
  `);
});
