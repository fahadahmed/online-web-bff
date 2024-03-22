import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import productVariantsHandlers from 'datasources/product/details/mocks/handlers';
import productOfferHandlers from 'datasources/product/offers/mocks/handlers';

beforeEach(() => {
  mockServer.use(...productVariantsHandlers, ...productOfferHandlers);
});

test('Testing product variants by group id query, should return product offers of the given groupid', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productVariantsByGroupId(
          input: { groupId: "mock_groupId", offerId: "iphone" }
        ) {
          offerDetails {
            id
            externalId
            name
            description
            stock {
              status
              storeStatus
              warehouseStatus
            }
            associatedPrices {
              basePrice
              basePriceExcludingTax
              effectivePrice
              effectivePriceExcludingTax
              priceFrequencyPeriod
              priceFrequencyValue
              priceLength
              priceType
            }
            associatedPriceRules {
              description
              basePrice
              basePriceExcludingTax
              effectivePrice
              effectivePriceExcludingTax
              priceFrequencyPeriod
              priceFrequencyValue
              priceLength
              priceType
              sources {
                id
              }
            }
            brand
            color
            colorHex
            externalId
            groupId
            groupName
            groupDescription
            primaryCategory {
              id
              name
            }
            soldSeparately
            storage
            isDefault
            isShippable
            isDeferrable
            images {
              id
              description
              standardUrl
              thumbnailUrl
              zoomUrl
            }
            priceType
            priceFrequencyPeriod
            priceFrequencyValue
            basePrice
            basePriceExcludingTax
            effectivePrice
            effectivePriceExcludingTax
            priceLength
            primaryCategory {
              id
              name
            }
            promotions {
              name
              productType
              shortDescription
              longDescription
              iconUrl
              sortOrder
            }
            productSpecificationGroups {
              group
              specifications {
                name
                value
              }
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productVariantsByGroupId).toMatchSnapshot();
});

test('Testing product variants by group id query, should return null for nullable field with no errors', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productVariantsByGroupId(
          input: { groupId: "mandatory-fields-only", offerId: "iphone" }
        ) {
          offerDetails {
            id
            externalId
            name
            description
            soldSeparately
            stock {
              status
              storeStatus
              warehouseStatus
            }
            associatedPrices {
              basePrice
              basePriceExcludingTax
              effectivePrice
              effectivePriceExcludingTax
              priceFrequencyPeriod
              priceFrequencyValue
              priceLength
              priceType
            }
            associatedPriceRules {
              description
              basePrice
              basePriceExcludingTax
              effectivePrice
              effectivePriceExcludingTax
              priceFrequencyPeriod
              priceFrequencyValue
              priceLength
              priceType
              sources {
                id
              }
            }
            brand
            color
            colorHex
            externalId
            groupId
            groupName
            groupDescription
            primaryCategory {
              id
              name
            }
            storage
            isDefault
            isShippable
            isDeferrable
            images {
              id
              description
              standardUrl
              thumbnailUrl
              zoomUrl
            }
            priceType
            priceFrequencyPeriod
            priceFrequencyValue
            basePrice
            basePriceExcludingTax
            effectivePrice
            effectivePriceExcludingTax
            priceLength
            primaryCategory {
              id
              name
            }
            promotions {
              name
              productType
              shortDescription
              longDescription
              iconUrl
              sortOrder
            }
            productSpecificationGroups {
              group
              specifications {
                name
                value
              }
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productVariantsByGroupId).toMatchSnapshot();
});

test('Testing product variants by group id query, should return null when optional field is missing from desl response', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productVariantsByGroupId(
          input: { groupId: "mock_groupId", offerId: "iphone" }
        ) {
          offerDetails {
            id
            externalId
            name
            description
            soldSeparately
            stock {
              status
              storeStatus
              warehouseStatus
            }
            associatedPrices {
              basePrice
              basePriceExcludingTax
              effectivePrice
              effectivePriceExcludingTax
              priceFrequencyPeriod
              priceFrequencyValue
              priceLength
              priceType
            }
            associatedPriceRules {
              description
              basePrice
              basePriceExcludingTax
              effectivePrice
              effectivePriceExcludingTax
              priceFrequencyPeriod
              priceFrequencyValue
              priceLength
              priceType
              sources {
                id
              }
            }
            brand
            color
            colorHex
            externalId
            groupId
            groupName
            groupDescription
            primaryCategory {
              id
              name
            }
            storage
            isDefault
            isShippable
            isDeferrable
            images {
              id
              description
              standardUrl
              thumbnailUrl
              zoomUrl
            }
            priceType
            priceFrequencyPeriod
            priceFrequencyValue
            basePrice
            basePriceExcludingTax
            effectivePrice
            effectivePriceExcludingTax
            priceLength
            primaryCategory {
              id
              name
            }
            promotions {
              name
              productType
              shortDescription
              longDescription
              iconUrl
              sortOrder
            }
            productSpecificationGroups {
              group
              specifications {
                name
                value
              }
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productVariantsByGroupId).toMatchSnapshot();
});

test('Testing product variants by group id query, should return product offer of the given offerId, when groupId is null', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productVariantsByGroupId(input: { groupId: null, offerId: "iphone" }) {
          offerDetails {
            id
            externalId
            name
            description
            soldSeparately
            stock {
              status
              storeStatus
              warehouseStatus
            }
            associatedPrices {
              basePrice
              basePriceExcludingTax
              effectivePrice
              effectivePriceExcludingTax
              priceFrequencyPeriod
              priceFrequencyValue
              priceLength
              priceType
            }
            associatedPriceRules {
              description
              basePrice
              basePriceExcludingTax
              effectivePrice
              effectivePriceExcludingTax
              priceFrequencyPeriod
              priceFrequencyValue
              priceLength
              priceType
              sources {
                id
              }
            }
            brand
            color
            colorHex
            externalId
            groupId
            groupName
            groupDescription
            primaryCategory {
              id
              name
            }
            storage
            isDefault
            isShippable
            isDeferrable
            images {
              id
              description
              standardUrl
              thumbnailUrl
              zoomUrl
            }
            priceType
            priceFrequencyPeriod
            priceFrequencyValue
            basePrice
            basePriceExcludingTax
            effectivePrice
            effectivePriceExcludingTax
            priceLength
            primaryCategory {
              id
              name
            }
            promotions {
              name
              productType
              shortDescription
              longDescription
              iconUrl
              sortOrder
            }
            productSpecificationGroups {
              group
              specifications {
                name
                value
              }
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productVariantsByGroupId).toMatchSnapshot();
});
