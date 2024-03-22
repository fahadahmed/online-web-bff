import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import { extrasHandler } from 'datasources/product/offers/mocks/handlers';

test('returns success for fetching the extras based on lineNumber', async () => {
  mockServer.use(extrasHandler);
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        extras(lineNumber: "0276398120") {
          extrasCategories {
            id
            name
            description
            isCategoryContainer
            visibility
            defaultSelected
            sortOrder
            subCategories {
              id
              name
              visibility
              defaultSelected
              sortOrder
            }
            offers {
              id
              name
              description
              category {
                id
              }
              price {
                priceType
                frequency {
                  period
                  value
                }
                basePrice
                basePriceExcludingTax
              }
              entitlements {
                name
                shortDescription
                iconUrl
                contentKey
                sortOrder
              }
              promotions {
                name
                shortDescription
                iconUrl
                productType
                contentKey
                sortOrder
              }
              supportedDestinations
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
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
