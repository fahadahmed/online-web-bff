import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { addTopupPoliPayBillMock } from 'datasources/finance/paymentService/topup/mocks/handlers';

beforeEach(() => {
  server.use(addTopupPoliPayBillMock);
});

test('returns success response for top up poli payment', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        initiateTopPOLi(
          input: {
            #lineNumber accepts [0-9]+
            lineNumber: "713012977"
            amount: 10.0
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
      "initiateTopPOLi": Object {
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
        initiateTopPOLi(
          input: {
            #lineNumber accepts [0-9]+
            lineNumber: "T-7890-4894-955"
            amount: 10.0
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
      "initiateTopPOLi": Object {
        "code": 4000,
        "message": "Request validation failure.",
        "poliPayResponse": null,
        "success": false,
      },
    }
  `);
});
