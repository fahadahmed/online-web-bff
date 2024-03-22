import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/line/lineSubscriptionsService/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('Returns a subscription for a given lineNumber and productInstanceId. Does not include billing information but does include CTAs.', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "0278675179") {
            subscription(productInstanceId: "1-2HAZ11110") {
              offer {
                offerId
                name
                productInstanceId
              }
              bundleOffer {
                bundleOfferId
                name
                productInstanceId
              }
              assetStartDate
              accountNumber
              lineNumber
              status {
                type
                label
              }
              nextRenewalDate
              ctas {
                type
                label
                webLink
              }
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchSnapshot();
});
