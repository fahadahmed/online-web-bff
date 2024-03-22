import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { accountTransactionsMock } from 'datasources/finance/digitalBill/mocks/handlers';

beforeEach(() => {
  server.use(accountTransactionsMock);
});

test('returns transactions when provided with a valid account number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          accountTransactions(accountNumber: "1234567") {
            details {
              date
              type
              description
              value
              calculatedBalance
              billId
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchSnapshot();
});
