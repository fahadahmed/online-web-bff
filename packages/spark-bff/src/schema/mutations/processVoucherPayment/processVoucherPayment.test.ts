import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { voucherTopupMock } from 'datasources/finance/paymentService/topup/mocks/handlers';

beforeEach(() => {
  server.use(voucherTopupMock);
});

test('returns values on successful topup ', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        processVoucherPayment(
          input: { voucherNumber: "1919181716151", lineNumber: "0271234567" }
        ) {
          code
          message
          success
          voucherResponse {
            redeemedAmount
            receiptNumber
            reservedBalance
            availableBalance
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "processVoucherPayment": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
        "voucherResponse": Object {
          "availableBalance": 20.5,
          "receiptNumber": "123562",
          "redeemedAmount": 20.5,
          "reservedBalance": 0,
        },
      },
    }
  `);
});

test('returns redeemed amount on successful topup for UnAuthorisedLine ', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        processVoucherPayment(
          input: {
            voucherNumber: "1919181716151"
            lineNumber: "UnAuthorisedLine"
          }
        ) {
          code
          message
          success
          voucherResponse {
            redeemedAmount
            receiptNumber
            reservedBalance
            availableBalance
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "processVoucherPayment": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
        "voucherResponse": Object {
          "availableBalance": null,
          "receiptNumber": null,
          "redeemedAmount": 20.6,
          "reservedBalance": null,
        },
      },
    }
  `);
});

test('returns error when providing invalid values', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        processVoucherPayment(
          input: { voucherNumber: "1919181716151", lineNumber: "1271234567" }
        ) {
          code
          message
          success
          voucherResponse {
            redeemedAmount
            receiptNumber
            reservedBalance
            availableBalance
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "processVoucherPayment": Object {
        "code": 4000,
        "message": "Request validation failure.",
        "success": false,
        "voucherResponse": null,
      },
    }
  `);
});

test('returns error message when providing invalid voucher number', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        processVoucherPayment(
          input: { voucherNumber: "000000000000", lineNumber: "0271234567" }
        ) {
          code
          message
          success
          voucherResponse {
            redeemedAmount
            receiptNumber
            reservedBalance
            availableBalance
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "processVoucherPayment": Object {
        "code": 4001,
        "message": "That code has expired. Please try a new code or another payment method.",
        "success": false,
        "voucherResponse": null,
      },
    }
  `);
});
