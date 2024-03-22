import {
  subscriptionOffersHandler,
  subscriptionOffersNoLineAccesHandler,
  subscriptionOffersUnhandledErrorHandler,
} from 'datasources/product/offers/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

test('returns all subscription offers data with no errors', async () => {
  server.use(subscriptionOffersHandler);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        subscriptionOffers {
          name
          lineNumbers
          accountNumbers
          offerDetails {
            offerId
            name
            description
            category {
              categoryId
            }
            price {
              priceType
              frequency {
                period
                value
              }
              basePrice
              effectivePrice
              description
            }
            group {
              groupId
              name
              description
              sortOrder
              isDefault
              images {
                imageId
                description
                sortOrder
                defaultUrl
                zoomUrl
                standardUrl
                thumbnailUrl
                tinyUrl
                type
              }
            }
            images {
              imageId
              description
              sortOrder
              defaultUrl
              zoomUrl
              standardUrl
              thumbnailUrl
              tinyUrl
              type
            }
            entitlements {
              name
              shortDescription
              longDescription
              quantity
              iconUrl
              sortOrder
            }
            promotions {
              name
              shortDescription
              longDescription
              sortOrder
              productType
            }
            productFeatures {
              color
              primaryColor
              colorHex
              brand
              band
            }
            productCharacteristics {
              isShippable
              partnerId
              entitledEntity
              balanceManagement
            }
            associatedPriceRules {
              description
              pricePointID
              ruleType
              price {
                priceType
                basePrice
                effectivePrice
                frequency {
                  period
                  value
                }
              }
            }
          }
          ctas {
            ctaType
            label
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test('Empty subscription offers when user doesnt have line access', async () => {
  server.use(...[subscriptionOffersNoLineAccesHandler]);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        subscriptionOffers {
          name
          lineNumbers
          accountNumbers
          offerDetails {
            offerId
            name
            description
            category {
              categoryId
            }
            price {
              priceType
              frequency {
                period
                value
              }
              basePrice
              effectivePrice
              description
            }
            group {
              groupId
              name
              description
              sortOrder
              isDefault
              images {
                imageId
                description
                sortOrder
                defaultUrl
                zoomUrl
                standardUrl
                thumbnailUrl
                tinyUrl
                type
              }
            }
            images {
              imageId
              description
              sortOrder
              defaultUrl
              zoomUrl
              standardUrl
              thumbnailUrl
              tinyUrl
              type
            }
            entitlements {
              name
              shortDescription
              longDescription
              quantity
              iconUrl
              sortOrder
            }
            promotions {
              name
              shortDescription
              longDescription
              sortOrder
              productType
            }
            productFeatures {
              color
              primaryColor
              colorHex
              brand
              band
            }
            productCharacteristics {
              isShippable
              partnerId
              entitledEntity
              balanceManagement
            }
            associatedPriceRules {
              description
              pricePointID
              ruleType
              price {
                priceType
                basePrice
                effectivePrice
                frequency {
                  period
                  value
                }
              }
            }
          }
          ctas {
            ctaType
            label
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test('when unsupported error code is returned', async () => {
  server.use(...[subscriptionOffersUnhandledErrorHandler]);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        subscriptionOffers {
          name
          lineNumbers
        }
      }
    `,
  });

  expect(res.errors).not.toBeUndefined();
});
