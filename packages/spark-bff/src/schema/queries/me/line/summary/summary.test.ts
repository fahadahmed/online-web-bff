import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/line/lineSummary/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('returns all the Line Number for line ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "033478552") {
            summary {
              accountNumber
              balanceManagement
              accountNumber
              type
              lineNumber
              status
              offerId
              offerName
              parentLine
              secondaryLineNumbers
              packageId
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});
