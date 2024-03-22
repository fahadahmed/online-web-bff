import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { addWalletPaymentMethodMock } from 'datasources/finance/walletService/mocks/handlers';

beforeEach(() => {
  server.resetHandlers(addWalletPaymentMethodMock);
});

test('returns success response when adding bank account to wallet with input values in all the fields', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addBankAccountToWallet(
          input: {
            isPreferred: true
            personalisedName: "my bank name"
            associations: null
            bankAccountDetail: {
              bankName: "ANZ Bank"
              accountNumber: "12-3456-7890123-00"
              accountName: "John Smith"
            }
          }
        ) {
          addWalletPaymentMethodResponse {
            paymentMethodId
            isDuplicate
            source
          }
          message
          success
          code
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addBankAccountToWallet": Object {
        "addWalletPaymentMethodResponse": Object {
          "isDuplicate": null,
          "paymentMethodId": "MySpark-SSC1463625391900736-723",
          "source": null,
        },
        "code": 2000,
        "message": "Request successfully processed",
        "success": true,
      },
    }
  `);
});

test('returns error response when giving empty values for required field', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addBankAccountToWallet(
          input: {
            isPreferred: true
            personalisedName: "my bank name"
            associations: null
            bankAccountDetail: {
              bankName: "ANZ Bank"
              accountNumber: ""
              accountName: "John Smith"
            }
          }
        ) {
          addWalletPaymentMethodResponse {
            paymentMethodId
            isDuplicate
            source
          }
          message
          success
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addBankAccountToWallet": Object {
        "addWalletPaymentMethodResponse": null,
        "code": 4100,
        "message": "Bank account Details missing for adding bank account to wallet.",
        "success": false,
      },
    }
  `);
});

test('returns success response for adding credit card to wallet using one time token', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addCreditCardToWallet(
          input: {
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
        ) {
          addWalletPaymentMethodResponse {
            paymentMethodId
            isDuplicate
            source
          }
          message
          success
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addCreditCardToWallet": Object {
        "addWalletPaymentMethodResponse": Object {
          "isDuplicate": null,
          "paymentMethodId": "MySpark-SSC1463625391900736-723",
          "source": null,
        },
        "code": 2000,
        "message": "Request successfully processed",
        "success": true,
      },
    }
  `);
});

test('returns success response for adding credit card to wallet using secure transaction token', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addCreditCardToWallet(
          input: {
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
              secureTransactionToken: "324234-32-432-432-423"
            }
          }
        ) {
          addWalletPaymentMethodResponse {
            paymentMethodId
            isDuplicate
            source
          }
          message
          success
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addCreditCardToWallet": Object {
        "addWalletPaymentMethodResponse": Object {
          "isDuplicate": null,
          "paymentMethodId": "MySpark-SSC1463625391900736-723",
          "source": null,
        },
        "code": 2000,
        "message": "Request successfully processed",
        "success": true,
      },
    }
  `);
});

test('returns error for adding credit card to wallet when using both one time token and secure transaction token', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addCreditCardToWallet(
          input: {
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
              secureTransactionToken: "324234-32-432-432-423"
            }
          }
        ) {
          addWalletPaymentMethodResponse {
            paymentMethodId
            isDuplicate
            source
          }
          message
          success
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addCreditCardToWallet": Object {
        "addWalletPaymentMethodResponse": null,
        "code": 4000,
        "message": "BAD REQUEST",
        "success": false,
      },
    }
  `);
});

test('returns error when neither one time token nor secure transaction token is provided', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addCreditCardToWallet(
          input: {
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
            }
          }
        ) {
          addWalletPaymentMethodResponse {
            paymentMethodId
            isDuplicate
            source
          }
          message
          success
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addCreditCardToWallet": Object {
        "addWalletPaymentMethodResponse": null,
        "code": 4101,
        "message": "Either OneTimeToken Or SecureTransactionToken is mandatory for add a card to wallet.",
        "success": false,
      },
    }
  `);
});

test('returns error when invalid maskedCardNumber is provided', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addCreditCardToWallet(
          input: {
            isPreferred: true
            personalisedName: "My card"
            associations: null
            cardDetail: {
              # maskedCardNumber accepts [0-9] and asterisk(*)
              # input length is 16.
              maskedCardNumber: "1-1291******3-43"
              cardName: "John Smith"
              cardType: "VISA"
              expiryMonth: 12
              expiryYear: 2024
            }
          }
        ) {
          addWalletPaymentMethodResponse {
            paymentMethodId
            isDuplicate
            source
          }
          message
          success
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addCreditCardToWallet": Object {
        "addWalletPaymentMethodResponse": null,
        "code": 4000,
        "message": "Request validation failure.",
        "success": false,
      },
    }
  `);
});
