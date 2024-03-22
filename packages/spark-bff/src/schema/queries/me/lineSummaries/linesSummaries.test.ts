import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/line/lineSummary/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('returns summary of all the lines', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query LineSummaries {
        me {
          lineSummaries {
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
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.lineSummaries).toMatchSnapshot();
});

test('returns summary of only broadband lines', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query LineSummaries {
        me {
          lineSummaries(lineTypes: [BROADBAND]) {
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
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.lineSummaries).toMatchSnapshot();
});
