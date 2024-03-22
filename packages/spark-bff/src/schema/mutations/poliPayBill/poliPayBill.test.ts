import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { addPoliPayBillMock } from 'datasources/finance/paymentService/billPayment/mocks/handlers';

beforeEach(() => {
  server.use(addPoliPayBillMock);
});

test('returns success response for poli payment', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        initiatePOLi(
          input: {
            #accountNumber accepts [0-9]+
            accountNumber: "713012977"
            amount: 10.0
            amountType: TOTALOVERDUE
          }
        ) {
          poliPayResponse {
            token
            redirectUrl
          }
          code
          success
          message
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "initiatePOLi": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "poliPayResponse": Object {
          "redirectUrl": "https://www.polipay.com/sadasda/dsada",
          "token": "h4hj324hj23hj4hj234hj23hj",
        },
        "success": true,
      },
    }
  `);
});

test('returns request validation failure when giving invalid accountNumber.', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        initiatePOLi(
          input: {
            #accountNumber accepts [0-9]+
            accountNumber: "T-7890-4894-955"
            amount: 10.0
            amountType: TOTALOVERDUE
          }
        ) {
          poliPayResponse {
            token
            redirectUrl
          }
          code
          success
          message
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "initiatePOLi": Object {
        "code": 4000,
        "message": "Request validation failure.",
        "poliPayResponse": null,
        "success": false,
      },
    }
  `);
});
