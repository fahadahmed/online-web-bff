import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/product/details/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('returns eligible lines details', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          eligibleLines(offerId: "wearable12345", channel: personalshop) {
            accountNumber
            lineNumber
            offerId
            offerName
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.eligibleLines).toMatchSnapshot();
});
