import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import productsHandlers from 'datasources/product/details/mocks/handlers';
import filtersHandlers from 'datasources/product/filters/mocks/handlers';

beforeEach(() => {
  mockServer.use(...[...productsHandlers, ...filtersHandlers]);
});

test('Returns list of handset offers and their corresponding filters options - personal shop channel', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query ($subcategoryId: String, $channel: CartChannel!) {
        deviceGallery(subcategoryId: $subcategoryId, channel: $channel) {
          filters {
            filterId
            name
            options {
              optionId
              label
              count
            }
          }
          products {
            groupId
            offerId
            name
            description
            discountText
            tag
            brand
            imageUrl
            priceType
            basePrice
            basePriceExcludingTax
            effectivePrice
            effectivePriceExcludingTax
            colors {
              name
              value
              primaryColor
            }
            planId
            ifpId
          }
          subcategories {
            categoryId
            name
          }
          subcategoryId
        }
      }
    `,
    variables: {
      subcategoryId: 'handsets',
      channel: 'personalshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.deviceGallery).toMatchSnapshot();
});

test('Returns list of handset offers and their corresponding filters options - business shop channel', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query ($subcategoryId: String, $channel: CartChannel!) {
        deviceGallery(subcategoryId: $subcategoryId, channel: $channel) {
          filters {
            filterId
            name
            options {
              optionId
              label
              count
            }
          }
          products {
            groupId
            offerId
            name
            description
            discountText
            tag
            brand
            imageUrl
            launchDate
            priceType
            basePrice
            basePriceExcludingTax
            effectivePrice
            effectivePriceExcludingTax
            startPricePoint
            colors {
              name
              value
              primaryColor
            }
            planId
            ifpId
          }
          subcategories {
            categoryId
            name
          }
          subcategoryId
        }
      }
    `,
    variables: {
      subcategoryId: 'handsets',
      channel: 'businessshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.deviceGallery).toMatchSnapshot();
});

test('Returns list of tablet offers and their corresponding filters options', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query ($subcategoryId: String, $channel: CartChannel!) {
        deviceGallery(subcategoryId: $subcategoryId, channel: $channel) {
          filters {
            filterId
            name
            options {
              optionId
              label
              count
            }
          }
          products {
            groupId
            offerId
            name
            description
            discountText
            tag
            brand
            imageUrl
            launchDate
            priceType
            basePrice
            basePriceExcludingTax
            effectivePrice
            effectivePriceExcludingTax
            startPricePoint
            colors {
              name
              value
              primaryColor
            }
            planId
            ifpId
          }
          subcategories {
            categoryId
            name
          }
          subcategoryId
        }
      }
    `,
    variables: {
      subcategoryId: 'tablets',
      channel: 'personalshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.deviceGallery).toMatchSnapshot();
});

test('Returns list of accessories offers and their corresponding filters options', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query ($subcategoryId: String, $channel: CartChannel!) {
        deviceGallery(subcategoryId: $subcategoryId, channel: $channel) {
          filters {
            filterId
            name
            options {
              optionId
              label
              count
            }
          }
          products {
            groupId
            offerId
            name
            description
            discountText
            tag
            brand
            imageUrl
            launchDate
            priceType
            basePrice
            basePriceExcludingTax
            effectivePrice
            effectivePriceExcludingTax
            startPricePoint
            colors {
              name
              value
              primaryColor
            }
            planId
            ifpId
          }
          subcategories {
            categoryId
            name
          }
          subcategoryId
        }
      }
    `,
    variables: {
      channel: 'personalshop',
      subcategoryId: 'accessories',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.deviceGallery).toMatchSnapshot();
});
