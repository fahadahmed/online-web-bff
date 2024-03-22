import { subscriptionProductOffersHandler } from 'datasources/product/offers/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

test('returns all the product offer details data with no errors', async () => {
  server.use(subscriptionProductOffersHandler);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query subscriptionProductOffersQuery(
        $lineNumber: String!
        $productInstanceId: String
      ) {
        me {
          line(lineNumber: $lineNumber) {
            subscriptionProductOffers(productInstanceId: $productInstanceId) {
              offerDetails {
                associatedPriceRules {
                  description
                  price {
                    basePrice
                    basePriceExcludingTax
                    effectivePrice
                    effectivePriceExcludingTax
                    frequency {
                      period
                      value
                    }
                    length
                    priceType
                    taxPercentage
                  }
                  pricePointID
                  ruleType
                }
                category {
                  id
                }
                description
                entitlements {
                  name
                }
                group {
                  id
                  name
                }
                id
                images {
                  id
                }
                name
                price {
                  priceType
                }
                productCharacteristics {
                  balanceManagement
                  isIncluded
                  entitledEntity
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
      lineNumber: '027321523',
      productInstanceId: '1-2HA22220',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test('subscriptionProductOffers with invalid product instance ids responds with empty array', async () => {
  server.use(subscriptionProductOffersHandler);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query subscriptionProductOffersQuery(
        $lineNumber: String!
        $productInstanceId: String
      ) {
        me {
          line(lineNumber: $lineNumber) {
            subscriptionProductOffers(productInstanceId: $productInstanceId) {
              offerDetails {
                associatedPriceRules {
                  description
                  price {
                    basePrice
                    basePriceExcludingTax
                    effectivePrice
                    effectivePriceExcludingTax
                    frequency {
                      period
                      value
                    }
                    length
                    priceType
                    taxPercentage
                  }
                  pricePointID
                  ruleType
                }
                category {
                  id
                }
                description
                entitlements {
                  name
                }
                group {
                  id
                  name
                }
                id
                images {
                  id
                }
                name
                price {
                  priceType
                }
                productCharacteristics {
                  balanceManagement
                  isIncluded
                  entitledEntity
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
      lineNumber: '027321523',
      productInstanceId: 'fake-product-instance-id',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
