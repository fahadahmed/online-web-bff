import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { accountBillingSummaryMock } from 'datasources/finance/digitalBill/mocks/handlers';

beforeEach(() => {
  server.use(accountBillingSummaryMock);
});

test('returns a list of bill details on success', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          billSummary(accountNumber: "433136667") {
            bills {
              date
              title
              billId
              charges {
                type
                value
              }
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.billSummary).toMatchSnapshot();
});

test('returns a list of bill details when provided with start and end dates', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          billSummary(
            accountNumber: "433136667"
            startDate: "14/07/20"
            endDate: "14/01/20"
          ) {
            bills {
              date
              title
              billId
              charges {
                type
                value
              }
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.billSummary).toMatchSnapshot();
});
