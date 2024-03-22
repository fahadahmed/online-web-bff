import { getPlansMpdComparisonHandler } from 'datasources/product/offers/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

test('returns the plans comparison data with no errors', async () => {
  server.use(getPlansMpdComparisonHandler);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        plansMpdComparison(cartId: "abc", channel: personalss) {
          cartId
          bundles {
            lineNumber
            id
            items {
              productOfferingId
              name
              action
              price {
                priceType
                period
                basePrice
                effectivePrice
                discount {
                  discountType
                  appliedValue
                }
              }
            }
          }
          existingPlans {
            productOfferingId
            name
            currentPrice {
              priceType
              period
              basePrice
              effectivePrice
              discount {
                discountType
                appliedValue
              }
            }
            updatedPrice {
              priceType
              period
              basePrice
              effectivePrice
              discount {
                discountType
                appliedValue
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
