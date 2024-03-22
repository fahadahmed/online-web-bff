import { planProductOffersHandler } from 'datasources/product/offers/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

test('returns all the product offer details data with no errors', async () => {
  server.use(planProductOffersHandler);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query planProductOffersQuery(
        $lineNumber: String!
        $packInstanceId: String
      ) {
        me {
          line(lineNumber: $lineNumber) {
            planProductOffers(packInstanceId: $packInstanceId) {
              offerDetails {
                id
                name
                description
                price {
                  frequency {
                    period
                    value
                  }
                  basePrice
                }
                entitlements {
                  name
                  shortDescription
                  longDescription
                  iconUrl
                  sortOrder
                }
                promotions {
                  name
                  productType
                  shortDescription
                  longDescription
                  iconUrl
                  sortOrder
                }
              }
              notifications {
                recommendationId
                text
                title
                type
              }
            }
          }
        }
      }
    `,
    variables: {
      lineNumber: '0276404520',
      packInstanceId: 'legacy050114',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
