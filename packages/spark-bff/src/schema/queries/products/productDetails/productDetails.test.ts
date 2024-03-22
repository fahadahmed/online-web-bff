import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import handlers from 'datasources/product/details/mocks/handlers';

beforeEach(() => {
  mockServer.use(...handlers);
});

test('Testing subcategory query for postpaid plans', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productDetails(categoryId: "postpaid", channel: "personalshop") {
          code
          message
          success
          id
          name
          description
          isCategoryContainer
          subCategories {
            id
            name
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productDetails).toMatchSnapshot();
});

test('Testing endless plan query', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productDetails(categoryId: "endless_plans", channel: "personalshop") {
          code
          message
          success
          id
          name
          description
          isCategoryContainer
          subCategories {
            id
            name
          }
          plans {
            planDetails {
              planId
              description
              planName
              contentKey
              categoryIdentifiers
            }
            price {
              priceType
              pricePeriod
              priceFrequency
              basePrice
              basePriceExcludingTax
            }
            contractTerm {
              name
              description
              value
              unit
            }
            entitlements {
              name
              shortDescription
              longDescription
              quantity
              iconUrl
              sortOrder
              contentKey
            }
            planImages {
              description
              sortOrder
              defaultUrl
              zoomUrl
              standardUrl
              thumbnailUrl
              tinyUrl
            }
            group {
              id
              name
            }
            promotions {
              name
              shortDescription
              longDescription
              productType
              sortOrder
              contentKey
            }
            productCharacteristics {
              addedInCart
              balanceManagement
              basePlanOfferId
              entitledEntity
              isDeferrable
              isFeatured
              isIncluded
              isShippable
              partnerId
              soldSeparately
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productDetails).toMatchSnapshot();
});

test('testing rollover plan query', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productDetails(categoryId: "rollover_plan", channel: "personalshop") {
          code
          message
          success
          id
          name
          description
          isCategoryContainer
          subCategories {
            id
            name
          }
          plans {
            planDetails {
              planId
              description
              planName
              categoryIdentifiers
            }
            price {
              priceType
              pricePeriod
              priceFrequency
              basePrice
            }
            entitlements {
              name
              shortDescription
              longDescription
              quantity
              iconUrl
              sortOrder
            }
            planImages {
              description
              sortOrder
              defaultUrl
              zoomUrl
              standardUrl
              thumbnailUrl
              tinyUrl
            }
            group {
              id
              name
            }
            promotions {
              name
              productType
            }
            productCharacteristics {
              addedInCart
              balanceManagement
              basePlanOfferId
              entitledEntity
              isDeferrable
              isFeatured
              isIncluded
              isShippable
              partnerId
              soldSeparately
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productDetails).toMatchSnapshot();
});

test('Testing gold plan query', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productDetails(categoryId: "gold_plan", channel: "personalshop") {
          code
          message
          success
          id
          name
          description
          isCategoryContainer
          subCategories {
            id
            name
          }
          plans {
            planDetails {
              planId
              description
              planName
              categoryIdentifiers
            }
            price {
              priceType
              pricePeriod
              priceFrequency
              basePrice
            }
            entitlements {
              name
              shortDescription
              longDescription
              quantity
              iconUrl
              sortOrder
            }
            planImages {
              description
              sortOrder
              defaultUrl
              zoomUrl
              standardUrl
              thumbnailUrl
              tinyUrl
            }
            group {
              id
              name
            }
            promotions {
              name
              productType
            }
            productCharacteristics {
              addedInCart
              balanceManagement
              basePlanOfferId
              entitledEntity
              isDeferrable
              isFeatured
              isIncluded
              isShippable
              partnerId
              soldSeparately
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productDetails).toMatchSnapshot();
});

test('Testing wearable plan query', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productDetails(categoryId: "wearable_plan", channel: "personalshop") {
          code
          message
          success
          id
          name
          description
          isCategoryContainer
          subCategories {
            id
            name
          }
          plans {
            planDetails {
              planId
              description
              planName
              categoryIdentifiers
            }
            price {
              priceType
              pricePeriod
              priceFrequency
              basePrice
            }
            entitlements {
              name
              shortDescription
              longDescription
              quantity
              iconUrl
              sortOrder
            }
            planImages {
              description
              sortOrder
              defaultUrl
              zoomUrl
              standardUrl
              thumbnailUrl
              tinyUrl
            }
            group {
              id
              name
            }
            promotions {
              name
              productType
            }
            productCharacteristics {
              addedInCart
              balanceManagement
              basePlanOfferId
              entitledEntity
              isDeferrable
              isFeatured
              isIncluded
              isShippable
              partnerId
              soldSeparately
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productDetails).toMatchSnapshot();
});

test('Testing prepaid extra pack query', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        productDetails(categoryId: "prepaid_extra", channel: "personalshop") {
          code
          message
          success
          id
          name
          description
          isCategoryContainer
          subCategories {
            id
            name
            subCategories {
              id
              name
            }
          }
          plans {
            planDetails {
              planId
              description
              planName
              categoryIdentifiers
            }
            price {
              priceType
              pricePeriod
              priceFrequency
              basePrice
            }
            entitlements {
              name
              shortDescription
              longDescription
              quantity
              iconUrl
              sortOrder
            }
            planImages {
              description
              sortOrder
              defaultUrl
              zoomUrl
              standardUrl
              thumbnailUrl
              tinyUrl
            }
            group {
              id
              name
            }
            promotions {
              name
              productType
            }
            productCharacteristics {
              addedInCart
              balanceManagement
              basePlanOfferId
              entitledEntity
              isDeferrable
              isFeatured
              isIncluded
              isShippable
              partnerId
              soldSeparately
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.productDetails).toMatchSnapshot();
});
