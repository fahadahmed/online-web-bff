import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import accessMocks from 'datasources/user/access/mocks/handlers';
import usageTransactionMocks from 'datasources/line/usage/usageTransactionsService/mocks';

beforeEach(() => {
  server.use(...accessMocks, ...usageTransactionMocks);
});

test('returns all the Usage Transaction when parameters for line Number of line', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "033227715") {
            usageTransactions(
              start: "2020-01-01T00:00:00.000+13:00"
              end: "2020-03-02T00:00:00.000+13:00"
              size: "20"
            ) {
              transactions {
                transactionType
                startDateTime
                endDateTime
                previousBalance
                currentBalance
                description
                value
                type
                isDebit
              }
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});
