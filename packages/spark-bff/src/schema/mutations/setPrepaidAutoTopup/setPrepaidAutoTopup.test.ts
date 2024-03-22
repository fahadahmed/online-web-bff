import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { autoTopupMock } from 'datasources/finance/paymentService/topup/mocks/handlers';
import { addWalletPaymentMethodMock } from 'datasources/finance/walletService/mocks/handlers';

beforeEach(() => {
  server.resetHandlers(...[autoTopupMock, addWalletPaymentMethodMock]);
});

test('returns messages on success for setup with registered card for autotopup when balance is low', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        setPrepaidAutoTopup(
          input: {
            source: DIRECT
            paymentMethodId: "MySpark-SSC1463625391900736-723"
            amount: 10.5
            autoTopupSettings: {
              type: LB
              thresholdAmount: 10
              monthlyTopupLimit: 500
            }
            lineNumber: "0271234567"
          }
          isNewCreditCard: false
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data.setPrepaidAutoTopup).toMatchInlineSnapshot(`
    Object {
      "code": 2000,
      "message": "Request Processed Successfully.",
      "success": true,
    }
  `);
});

test('returns messages on success for setup with registered card for autotopup every 4 weeks', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        setPrepaidAutoTopup(
          input: {
            source: DIRECT
            paymentMethodId: "MySpark-SSC1463625391900736-723"
            amount: 10.5
            autoTopupSettings: { type: RT, firstTopupDate: "2020-11-04" }
            lineNumber: "0271234567"
          }
          isNewCreditCard: false
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data.setPrepaidAutoTopup).toMatchInlineSnapshot(`
    Object {
      "code": 2000,
      "message": "Request Processed Successfully.",
      "success": true,
    }
  `);
});

test('returns messages on success for setup with new card, saving card for future payments when balance is low', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        setPrepaidAutoTopup(
          input: {
            source: DIRECT
            amount: 10.5
            autoTopupSettings: {
              type: LB
              thresholdAmount: 10
              monthlyTopupLimit: 500
            }
            lineNumber: "0271234567"
          }
          isNewCreditCard: true
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
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data.setPrepaidAutoTopup).toMatchInlineSnapshot(`
    Object {
      "code": 2000,
      "message": "Request Processed Successfully.",
      "success": true,
    }
  `);
});

test('returns messages on success for setup with new card, saving card for future payments for autotopup every 4 weeks', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        setPrepaidAutoTopup(
          input: {
            source: DIRECT
            amount: 10.5
            autoTopupSettings: { type: RT, firstTopupDate: "2020-11-04" }
            lineNumber: "0271234567"
          }
          isNewCreditCard: true
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
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data.setPrepaidAutoTopup).toMatchInlineSnapshot(`
    Object {
      "code": 2000,
      "message": "Request Processed Successfully.",
      "success": true,
    }
  `);
});

test('returns messages on success for setup with new card without saving card for future payments when balance is low', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        setPrepaidAutoTopup(
          input: {
            source: DIRECT
            amount: 10.5
            autoTopupSettings: {
              type: LB
              thresholdAmount: 10
              monthlyTopupLimit: 500
            }
            lineNumber: "0271234567"
          }
          isNewCreditCard: true
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
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data.setPrepaidAutoTopup).toMatchInlineSnapshot(`
    Object {
      "code": 2000,
      "message": "Request Processed Successfully.",
      "success": true,
    }
  `);
});

test('returns messages on success for setup with new card without saving card for future payments for autotopup every 4 weeks', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        setPrepaidAutoTopup(
          input: {
            source: DIRECT
            amount: 10.5
            autoTopupSettings: { type: RT, firstTopupDate: "2020-11-04" }
            lineNumber: "0271234567"
          }
          isNewCreditCard: true
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
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data.setPrepaidAutoTopup).toMatchInlineSnapshot(`
    Object {
      "code": 2000,
      "message": "Request Processed Successfully.",
      "success": true,
    }
  `);
});

test('returns error when providing invalid values', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        setPrepaidAutoTopup(
          input: {
            source: DIRECT
            amount: 10.5
            autoTopupSettings: {
              type: LB
              thresholdAmount: 10
              monthlyTopupLimit: 500
            }
            lineNumber: "1271234567"
          }
          isNewCreditCard: true
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
        ) {
          success
          message
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "setPrepaidAutoTopup": Object {
        "code": 4000,
        "message": "Request validation failure.",
        "success": false,
      },
    }
  `);
});
