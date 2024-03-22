import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { creditCardTopupMock } from 'datasources/finance/paymentService/topup/mocks/handlers';
import { addWalletPaymentMethodMock } from 'datasources/finance/walletService/mocks/handlers';

beforeEach(() => {
  server.use(...[creditCardTopupMock, addWalletPaymentMethodMock]);
});

test('submits credit card topup payment successfully with authorised line and new card, saving the card for future payments', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        submitCCtopupPayment(
          input: { source: WALLET_SELF, amount: 20 }
          isNewCreditCard: true
          shouldSaveCard: true
          creditCardInput: {
            isPreferred: false
            personalisedName: "My card"
            associations: null
            cardDetail: {
              # maskedCardNumber accepts [0-9] and asterisk(*)
              # input length is 16.
              maskedCardNumber: "123412******3443"
              cardName: "John Smith"
              cardType: "VISA CARD"
              expiryMonth: 12
              expiryYear: 2024
              oneTimeToken: "324234-32-432-432-423"
            }
          }
          lineNumber: "AuthorisedLine"
        ) {
          code
          message
          success
          receiptNumber
          availableBalance
          reservedBalance
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitCCtopupPayment": Object {
        "availableBalance": 20,
        "code": 2000,
        "message": "Request Processed Successfully.",
        "receiptNumber": "123562",
        "reservedBalance": 15.5,
        "success": true,
      },
    }
  `);
});

test('submits credit card topup payment successfully with authorised line and new card without saving card for future payments', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        submitCCtopupPayment(
          input: { source: WALLET_SELF, amount: 20 }
          isNewCreditCard: true
          shouldSaveCard: false
          creditCardInput: {
            isPreferred: false
            personalisedName: "My card"
            associations: null
            cardDetail: {
              # maskedCardNumber accepts [0-9] and asterisk(*)
              # input length is 16.
              maskedCardNumber: "123412******3443"
              cardName: "John Smith"
              cardType: "VISA CARD"
              expiryMonth: 12
              expiryYear: 2024
              oneTimeToken: "324234-32-432-432-423"
            }
          }
          lineNumber: "AuthorisedLine"
        ) {
          code
          message
          success
          receiptNumber
          availableBalance
          reservedBalance
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitCCtopupPayment": Object {
        "availableBalance": 20,
        "code": 2000,
        "message": "Request Processed Successfully.",
        "receiptNumber": "123562",
        "reservedBalance": 15.5,
        "success": true,
      },
    }
  `);
});

test('submits credit card topup payment successfully with authorised line and registered card', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        submitCCtopupPayment(
          input: {
            source: WALLET_SELF
            amount: 20
            paymentMethodId: "MySpark-SSC1463625391900736-723"
          }
          isNewCreditCard: false
          shouldSaveCard: false
          lineNumber: "AuthorisedLine"
        ) {
          code
          message
          success
          receiptNumber
          availableBalance
          reservedBalance
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitCCtopupPayment": Object {
        "availableBalance": 20,
        "code": 2000,
        "message": "Request Processed Successfully.",
        "receiptNumber": "123562",
        "reservedBalance": 15.5,
        "success": true,
      },
    }
  `);
});

test('submits credit card topup payment successfully with unauthorised line', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        submitCCtopupPayment(
          input: { source: WALLET_SELF, amount: 20 }
          isNewCreditCard: true
          shouldSaveCard: false
          creditCardInput: {
            isPreferred: true
            personalisedName: "My card"
            associations: null
            cardDetail: {
              # maskedCardNumber accepts [0-9] and asterisk(*)
              # input length is 16.
              maskedCardNumber: "123412******3443"
              cardName: "John Smith"
              cardType: "VISA CARD"
              expiryMonth: 12
              expiryYear: 2024
              oneTimeToken: "324234-32-432-432-423"
            }
          }
          lineNumber: "0278478499"
        ) {
          code
          message
          success
          receiptNumber
          availableBalance
          reservedBalance
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitCCtopupPayment": Object {
        "availableBalance": null,
        "code": 2000,
        "message": "Request Processed Successfully.",
        "receiptNumber": null,
        "reservedBalance": null,
        "success": true,
      },
    }
  `);
});

test('returns error message for invalid lineNumber', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        submitCCtopupPayment(
          input: { source: WALLET_SELF, amount: 20 }
          isNewCreditCard: true
          shouldSaveCard: false
          creditCardInput: {
            isPreferred: false
            personalisedName: "My card"
            associations: null
            cardDetail: {
              # maskedCardNumber accepts [0-9] and asterisk(*)
              # input length is 16.
              maskedCardNumber: "123412******3443"
              cardName: "John Smith"
              cardType: "VISA CARD"
              expiryMonth: 12
              expiryYear: 2024
              oneTimeToken: "324234-32-432-432-423"
            }
          }
          lineNumber: "1234567892"
        ) {
          code
          message
          success
          receiptNumber
          availableBalance
          reservedBalance
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitCCtopupPayment": Object {
        "availableBalance": null,
        "code": 4000,
        "message": "Request validation failure.",
        "receiptNumber": null,
        "reservedBalance": null,
        "success": false,
      },
    }
  `);
});
