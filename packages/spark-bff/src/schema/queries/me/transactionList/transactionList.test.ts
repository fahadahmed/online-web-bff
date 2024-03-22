import { getTransactionListMock } from 'datasources/line/transactionsService/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

beforeEach(() => {
  server.use(getTransactionListMock);
});

test('returns lineNumber transactions list', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          transactionList(
            lineNumber: "021023456"
            startDate: "01/01/21"
            endDate: "06/06/21"
            size: 6
          ) {
            value
            type
            startDateTime
            isDebit
            description
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.transactionList).toMatchSnapshot();
});

test('returns lineNumber transactions list with paymentstatus APPLIED only', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          transactionList(
            lineNumber: "021023456"
            startDate: "01/01/21"
            endDate: "06/06/21"
            size: 6
            paymentStatus: APPLIED
          ) {
            value
            type
            startDateTime
            isDebit
            description
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.transactionList).toMatchSnapshot();
});
