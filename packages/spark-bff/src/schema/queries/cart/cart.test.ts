import context from 'context';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import { getCartByIdWithoutDatabaseMock } from 'datasources/shop/cart/mocks/handlers';
import {
  getPlansMpdComparisonHandler,
  getProductOffersByOfferIdsHandler,
} from 'datasources/product/offers/mocks/handlers';

jest.mock('context');

const commonHandlers = [
  getCartByIdWithoutDatabaseMock,
  getProductOffersByOfferIdsHandler,
];

const mockSetHeader = jest.fn();
(context as jest.Mock).mockReturnValue({
  res: { setHeader: mockSetHeader },
  loggerContext: {
    sourceIP: '',
    userID: '',
    clientName: '',
    sessionID: '',
    transactionID: '',
  },
});

test('returns success for getting cart list items with cookies', async () => {
  mockServer.use(...commonHandlers, getPlansMpdComparisonHandler);
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        cart(cartId: "success-cart-id", channel: personalshop) {
          accountNumber
          auth {
            isAuthenticated
            isGuest
          }
          bundles {
            bundleId
            categoryId
            filteredItems(actions: [add, delete]) {
              itemId
              title
            }
            isLineNumberRequired
            items {
              description
              isIncluded
              shouldHide
              imageUrl
              itemId
              productOfferingId
              title
              action
              quantity
              billingFrequency
              frequencyType
              frequencyPeriod
              frequencyValue
              dealText
              contractTerm {
                name
                description
                value
                unit
              }
              basePrice {
                taxExclusiveValue
                value
              }
              effectivePrice {
                taxExclusiveValue
                value
              }
              discountPrice {
                taxExclusiveValue
                value
              }
              offerId
              categories
              balanceManagement
              removable
            }
            lineNumber
            offerIds
          }
          cartId
          isAccountNumberRequired
          productOfferImages {
            offerId
            url
          }
          shippableItems {
            description
            imageUrl
            itemId
            quantity
            title
          }
          summaries {
            billingFrequency
            frequencyType
            frequencyPeriod
            frequencyValue
            subtotal
            taxExclusiveSubtotal
            total
            taxExclusiveTotal
            discount
            taxExclusiveDiscount
            gst
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data!.cart.summaries).toMatchSnapshot();
  expect(res.data!.cart.bundles).toMatchSnapshot();
  expect(res.data!.cart.shippableItems).toMatchSnapshot();
  expect(res.data!.cart.productOfferImages).toMatchSnapshot();
});

test('returns 404 when cart id not found', async () => {
  mockServer.use(...commonHandlers);
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        cart(cartId: "random-cart-id", channel: personalss) {
          accountNumber
          auth {
            isAuthenticated
            isGuest
          }
          bundles {
            bundleId
            categoryId
            filteredItems(actions: [add, delete]) {
              itemId
              title
            }
            isLineNumberRequired
            items {
              description
              isIncluded
              shouldHide
              imageUrl
              itemId
              productOfferingId
              title
              action
              quantity
              billingFrequency
              frequencyType
              frequencyPeriod
              frequencyValue
              dealText
              contractTerm {
                name
                description
                value
                unit
              }
              basePrice {
                taxExclusiveValue
                value
              }
              effectivePrice {
                taxExclusiveValue
                value
              }
              discountPrice {
                taxExclusiveValue
                value
              }
              offerId
              categories
              balanceManagement
              removable
            }
            lineNumber
            offerIds
          }
          cartId
          isAccountNumberRequired
          productOfferImages {
            offerId
            url
          }
          shippableItems {
            description
            imageUrl
            itemId
            quantity
            title
          }
          summaries {
            billingFrequency
            frequencyType
            frequencyPeriod
            frequencyValue
            subtotal
            taxExclusiveSubtotal
            total
            taxExclusiveTotal
            discount
            taxExclusiveDiscount
            gst
          }
        }
      }
    `,
  });

  expect(res.errors).toBeDefined();
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [GraphQLError: 404: Not Found],
    ]
  `);
});

test('returns shippable items with no duplicate offering id and correct quantity of delivable items', async () => {
  mockServer.use(...commonHandlers);
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        cart(cartId: "success-shippable-items-cart-id", channel: personalss) {
          accountNumber
          auth {
            isAuthenticated
            isGuest
          }
          bundles {
            bundleId
            categoryId
            filteredItems(actions: [add, delete]) {
              itemId
              title
            }
            isLineNumberRequired
            items {
              description
              isIncluded
              shouldHide
              imageUrl
              itemId
              productOfferingId
              title
              action
              quantity
              billingFrequency
              frequencyType
              frequencyPeriod
              frequencyValue
              dealText
              contractTerm {
                name
                description
                value
                unit
              }
              basePrice {
                taxExclusiveValue
                value
              }
              effectivePrice {
                taxExclusiveValue
                value
              }
              discountPrice {
                taxExclusiveValue
                value
              }
              offerId
              categories
              balanceManagement
              removable
            }
            lineNumber
            offerIds
          }
          cartId
          isAccountNumberRequired
          productOfferImages {
            offerId
            url
          }
          shippableItems {
            description
            imageUrl
            itemId
            quantity
            title
          }
          summaries {
            billingFrequency
            frequencyType
            frequencyPeriod
            frequencyValue
            subtotal
            taxExclusiveSubtotal
            total
            taxExclusiveTotal
            discount
            taxExclusiveDiscount
            gst
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data!.cart.shippableItems).toMatchSnapshot();
});

test('returns successful empty cart response', async () => {
  mockServer.use(...commonHandlers);
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        cart(cartId: "success-empty-cart-id", channel: personalss) {
          accountNumber
          auth {
            isAuthenticated
            isGuest
          }
          bundles {
            bundleId
            categoryId
            filteredItems(actions: [add, delete]) {
              itemId
              title
            }
            isLineNumberRequired
            items {
              description
              isIncluded
              shouldHide
              imageUrl
              itemId
              productOfferingId
              title
              action
              quantity
              billingFrequency
              frequencyType
              frequencyPeriod
              frequencyValue
              dealText
              contractTerm {
                name
                description
                value
                unit
              }
              basePrice {
                taxExclusiveValue
                value
              }
              effectivePrice {
                taxExclusiveValue
                value
              }
              discountPrice {
                taxExclusiveValue
                value
              }
              offerId
              categories
              balanceManagement
              removable
            }
            lineNumber
            offerIds
          }
          cartId
          isAccountNumberRequired
          productOfferImages {
            offerId
            url
          }
          shippableItems {
            description
            imageUrl
            itemId
            quantity
            title
          }
          summaries {
            billingFrequency
            frequencyType
            frequencyPeriod
            frequencyValue
            subtotal
            taxExclusiveSubtotal
            total
            taxExclusiveTotal
            discount
            taxExclusiveDiscount
            gst
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data!.cart).toMatchSnapshot();
});
