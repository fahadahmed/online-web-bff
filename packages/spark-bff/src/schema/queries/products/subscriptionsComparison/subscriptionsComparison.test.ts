import {
  getSubscriptionsComparisonHandler,
  getProductOffersByOfferIdsHandler,
} from 'datasources/product/offers/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

test('returns the subscriptions comparison data with no errors', async () => {
  server.use(
    getSubscriptionsComparisonHandler,
    getProductOffersByOfferIdsHandler,
  );

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        subscriptionsComparison(
          cartId: "abc"
          bundleId: "123"
          channel: personalss
        ) {
          comparisons {
            recommendationId
            available {
              offerId
              offerName
              brand
              isIncluded
              price {
                description
                basePrice
                frequencyPeriod
              }
            }
            unavailable {
              offerId
              offerName
              brand
              isIncluded
              price {
                description
                basePrice
                frequencyPeriod
              }
            }
            ctas {
              type
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
