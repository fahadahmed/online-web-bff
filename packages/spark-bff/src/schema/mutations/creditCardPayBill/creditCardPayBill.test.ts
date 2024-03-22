import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { addCreditCardPayBillMock } from 'datasources/finance/paymentService/billPayment/mocks/handlers';
import { addWalletPaymentMethodMock } from 'datasources/finance/walletService/mocks/handlers';

beforeEach(() => {
  server.use(addCreditCardPayBillMock, addWalletPaymentMethodMock);
});

test('returns success for credit card payment with registered card', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        processCCPaymentWithRegisteredCard(
          input: {
            source: WALLET_SELF
            paymentMethodId: "MySpark-SSC1556495550670674-279490"
            amount: 30
            amountType: ONEOFF
            setupAutoPay: false
            #accountNumber accepts [0-9]+
            accountNumber: "713012977"
          }
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
      "processCCPaymentWithRegisteredCard": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);
});

test('returns success for new card one-off bill payment with new card and saving for future payments.', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        processNewCardOneoffBillPayment(
          input: {
            amountType: ONEOFF
            setupAutoPay: false
            amount: 10.0
            #accountNumber accepts [0-9]+
            accountNumber: "713012977"
          }
          creditCardInput: {
            isPreferred: true
            personalisedName: "My card"
            associations: null
            cardDetail: {
              # maskedCardNumber accepts [0-9] and asterisk(*)
              # input length is 16.
              maskedCardNumber: "123412******3443"
              cardName: "John Smith"
              cardType: "VISA"
              expiryMonth: 12
              expiryYear: 2024
              oneTimeToken: "324234-32-432-432-423"
            }
          }
          shouldSaveCard: true
          isNewCreditCard: true
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
      "processNewCardOneoffBillPayment": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);
});

test('returns success for new card one-off bill payment with new card without saving for future payments.', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        processNewCardOneoffBillPayment(
          input: {
            amountType: ONEOFF
            setupAutoPay: false
            amount: 10.0
            #accountNumber accepts [0-9]+
            accountNumber: "713012977"
          }
          creditCardInput: {
            isPreferred: true
            personalisedName: "My card"
            associations: null
            cardDetail: {
              # maskedCardNumber accepts [0-9] and asterisk(*)
              # input length is 16.
              maskedCardNumber: "123412******3443"
              cardName: "John Smith"
              cardType: "VISA"
              expiryMonth: 12
              expiryYear: 2024
              oneTimeToken: "324234-32-432-432-423"
            }
          }
          shouldSaveCard: false
          isNewCreditCard: true
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
      "processNewCardOneoffBillPayment": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);
});

test('returns success for new card bill payment with registration.', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        processNewCardBillPaymentWithRegistration(
          input: {
            amountType: TOTALDUE
            setupAutoPay: false
            amount: 10.0
            secureTransactionToken: "9446hjk453jhk5hjk43j5h43jjk5h4jhk534j7"
            #accountNumber accepts [0-9]+
            accountNumber: "713012977"
          }
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
      "processNewCardBillPaymentWithRegistration": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);
});

test('returns error for new card bill payment with Invalid accountNumber.', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        processNewCardBillPaymentWithRegistration(
          input: {
            amountType: TOTALDUE
            setupAutoPay: false
            amount: 10.0
            secureTransactionToken: "9446hjk453jhk5hjk43j5h43jjk5h4jhk534j7"
            #accountNumber accepts [0-9]+
            accountNumber: "T-7890-4894-955"
          }
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
      "processNewCardBillPaymentWithRegistration": Object {
        "code": 4000,
        "message": "Request validation failure.",
        "success": false,
      },
    }
  `);
});
