import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import { relatedPlansHandler } from 'datasources/product/offers/mocks/handlers';

beforeEach(() => {
  mockServer.use(relatedPlansHandler);
});

test('returns success for fetching the related plans based on categoryId and offeringId', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        relatedPlans(
          input: {
            categoryId: "vas_addon"
            offerIds: ["spotify_premium-of_jystv"]
            channel: personalshop
          }
        ) {
          bundles {
            id
            offerDetails {
              id
              name
              description
              price {
                basePrice
                frequency {
                  period
                  value
                }
                priceType
              }
              images {
                thumbnailUrl
              }
              entitlements {
                name
                iconUrl
                longDescription
                type
              }
              promotions {
                name
                productType
                shortDescription
                longDescription
                iconUrl
              }
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
