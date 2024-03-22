import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { accountBalanceMock } from 'datasources/finance/balanceService/mocks/handlers';

beforeEach(() => {
  server.use(accountBalanceMock);
});

test('successfully retrieves the account monetary balance details for a account from Siebel. ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          #accountNumber accepts [0-9]+
          accountBalance(accountNumber: "713012977") {
            accountNumber
            firstName
            lastName
            currentBillCycle
            nextBill {
              billDate
            }
            lastBill {
              billDate
            }
            currentBalance {
              due {
                amount
                crDr
              }
              overdue {
                amount
                crDr
              }
            }
            lastPayment {
              paymentDate
              paymentAmount {
                amount
                crDr
              }
            }
            monthlyPaymentSetup {
              type
              description
              status
              accountDetails {
                bank
                accountName
                accountNumber
                accountNumberSuffix
                bankNumber
                branchNumber
                branchName
              }
              creditCard {
                lastFourDigits
                ccId
                cardIssuer
                cardName
                expiryMonth
                expiryYear
              }
              upcomingPayment {
                paymentDate
                paymentFrequency
                paymentMethodId
                paymentAmount {
                  amount
                  crDr
                }
              }
            }
            summaryMessage {
              primary
              secondary
              tertiary
              status
              primaryCta {
                label
                code
              }
              secondaryCta {
                label
                code
              }
              otherCtas {
                label
                code
              }
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.accountBalance).toMatchSnapshot();
});

test('returns error when the accountNumber is invalid ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          #accountNumber accepts [0-9]+
          accountBalance(accountNumber: "AT713012977") {
            accountNumber
            firstName
            lastName
            currentBillCycle
            nextBill {
              billDate
            }
            lastBill {
              billDate
            }
            currentBalance {
              due {
                amount
                crDr
              }
              overdue {
                amount
                crDr
              }
            }
            lastPayment {
              paymentDate
              paymentAmount {
                amount
                crDr
              }
            }
            monthlyPaymentSetup {
              type
              description
              status
              accountDetails {
                bank
                accountName
                accountNumber
                accountNumberSuffix
                bankNumber
                branchNumber
                branchName
              }
              creditCard {
                lastFourDigits
                ccId
                cardIssuer
                cardName
                expiryMonth
                expiryYear
              }
              upcomingPayment {
                paymentDate
                paymentFrequency
                paymentMethodId
                paymentAmount {
                  amount
                  crDr
                }
              }
            }
            summaryMessage {
              primary
              secondary
              tertiary
              status
              primaryCta {
                label
                code
              }
              secondaryCta {
                label
                code
              }
              otherCtas {
                label
                code
              }
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeDefined();
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [GraphQLError: 400: Bad Request],
    ]
  `);
});

test('successfully retrieves the detail message directly by supplying the account number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        accountBalance(accountNumber: "12345678") {
          detailMessage {
            primary
            secondary
            tertiary
            status
            primaryCta {
              label
              code
            }
            secondaryCta {
              label
              code
            }
            otherCtas {
              label
              code
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.accountBalance.detailMessage).toMatchSnapshot();
});
