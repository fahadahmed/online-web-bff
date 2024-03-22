import { walletPaymentMethodMock } from 'datasources/finance/walletService/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

beforeEach(() => {
  server.use(walletPaymentMethodMock);
});

test('returns cardDetails and bankAccountDetails', async () => {
  server.use(walletPaymentMethodMock);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          paymentMethods {
            type
            source
            paymentMethodId
            personalisedName
            isPreferred
            associations {
              type
              accessType
              accountNumber
              lineNumber
              paymentMethodId
            }
            cardDetail {
              ...card
            }
            bankAccountDetail {
              ...bank
            }
          }
        }
      }

      fragment card on CardDetail {
        maskedCardNumber
        cardName
        cardType
        expiryMonth
        expiryYear
        creditCardType
        brand
      }

      fragment bank on BankAccountDetail {
        bankName
        accountName
        accountNumber
        bankType
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.paymentMethods).toMatchSnapshot();
});

test('returns payment methods filtered by sources', async () => {
  server.use(walletPaymentMethodMock);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query PaymentMethods($sources: [WalletPaymentMethodSource!]) {
        me {
          paymentMethods(sources: $sources) {
            type
            source
            paymentMethodId
          }
        }
      }
    `,
    variables: {
      sources: ['DIRECT', 'WALLET_SELF'],
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.me.paymentMethods).toMatchSnapshot();
});

test('returns payment methods filtered by associated line number', async () => {
  server.use(walletPaymentMethodMock);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query PaymentMethods(
        $sources: [WalletPaymentMethodSource!]
        $associatedLineNumber: String
      ) {
        me {
          paymentMethods(
            sources: $sources
            associatedLineNumber: $associatedLineNumber
          ) {
            type
            source
            paymentMethodId
          }
        }
      }
    `,
    variables: {
      sources: ['DIRECT'],
      associatedLineNumber: '0278675180',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.me.paymentMethods).toMatchSnapshot();
});
