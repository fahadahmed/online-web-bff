import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import { relatedAddonsHandler } from 'datasources/product/offers/mocks/handlers';
import { getCartByIdMock } from 'datasources/shop/cart/mocks/handlers';

beforeEach(() => {
  mockServer.use(...[relatedAddonsHandler], ...[getCartByIdMock]);
});

test('returns success for fetching the related plans based on categoryId and offeringId', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query RelatedAddons(
        $bundleId: String!
        $cartId: String!
        $channel: CartChannel!
        $itemIds: [String!]!
      ) {
        relatedAddons(
          bundleId: $bundleId
          cartId: $cartId
          channel: $channel
          itemIds: $itemIds
        ) {
          addonAction
          addonsCart {
            cartId
            accountNumber
            isAccountNumberRequired
          }
          addonsProducts {
            accessoryBundles {
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
            }
            vasBundles {
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
            }
            insuranceBundles {
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
            }
          }
        }
      }
    `,
    variables: {
      bundleId: 'fake-bundle-id',
      cartId: 'success-cart-id',
      channel: 'businessshop',
      itemIds: 'fake-item-id',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.relatedAddons.addonAction).toBe('displayProducts');
  expect(res.data).toMatchSnapshot();
});

test('When cart query fails "showErrorScreen" should be shown', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query RelatedAddons(
        $bundleId: String!
        $cartId: String!
        $channel: CartChannel!
        $itemIds: [String!]!
      ) {
        relatedAddons(
          bundleId: $bundleId
          cartId: $cartId
          channel: $channel
          itemIds: $itemIds
        ) {
          addonAction
          addonsCart {
            cartId
            accountNumber
            isAccountNumberRequired
          }
          addonsProducts {
            accessoryBundles {
              id
            }
            vasBundles {
              id
            }
            insuranceBundles {
              id
            }
          }
        }
      }
    `,
    variables: {
      bundleId: 'fake-bundle-id',
      cartId: 'fail-cart-id',
      channel: 'businessshop',
      itemIds: 'fake-item-id',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.relatedAddons.addonAction).toBe('showErrorScreen');
  expect(res.data).toMatchSnapshot();
});

test('When addonProducts query fails due to mismatch bundleId "navigateBack" should be shown', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query RelatedAddons(
        $bundleId: String!
        $cartId: String!
        $channel: CartChannel!
        $itemIds: [String!]!
      ) {
        relatedAddons(
          bundleId: $bundleId
          cartId: $cartId
          channel: $channel
          itemIds: $itemIds
        ) {
          addonAction
          addonsCart {
            cartId
            accountNumber
            isAccountNumberRequired
          }
          addonsProducts {
            accessoryBundles {
              id
            }
            vasBundles {
              id
            }
            insuranceBundles {
              id
            }
          }
        }
      }
    `,
    variables: {
      bundleId: 'fail-bundle-id',
      cartId: 'success-cart-id',
      channel: 'businessshop',
      itemIds: 'fake-item-id',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.relatedAddons.addonAction).toBe('navigateBack');
  expect(res.data).toMatchSnapshot();
});

test('When addonProducts query fails but has a matching bundleId & itemId "showErrorScreen" should be shown', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query RelatedAddons(
        $bundleId: String!
        $cartId: String!
        $channel: CartChannel!
        $itemIds: [String!]!
      ) {
        relatedAddons(
          bundleId: $bundleId
          cartId: $cartId
          channel: $channel
          itemIds: $itemIds
        ) {
          addonAction
          addonsCart {
            cartId
            accountNumber
            isAccountNumberRequired
          }
          addonsProducts {
            accessoryBundles {
              id
            }
            vasBundles {
              id
            }
            insuranceBundles {
              id
            }
          }
        }
      }
    `,
    variables: {
      bundleId: 'fail-bundle-id',
      cartId: 'failed-related-addons',
      channel: 'businessshop',
      itemIds: 'fake-item-id',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.relatedAddons.addonAction).toBe('showErrorScreen');
  expect(res.data).toMatchSnapshot();
});

test('When related addons displays no products it should return cart but no products and give a "redirect" action', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query RelatedAddons(
        $bundleId: String!
        $cartId: String!
        $channel: CartChannel!
        $itemIds: [String!]!
      ) {
        relatedAddons(
          bundleId: $bundleId
          cartId: $cartId
          channel: $channel
          itemIds: $itemIds
        ) {
          addonAction
          addonsCart {
            cartId
            accountNumber
            isAccountNumberRequired
          }
          addonsProducts {
            accessoryBundles {
              id
            }
            vasBundles {
              id
            }
            insuranceBundles {
              id
            }
          }
        }
      }
    `,
    variables: {
      bundleId: 'empty-addons-id',
      cartId: 'success-cart-id',
      channel: 'businessshop',
      itemIds: 'fake-item-id',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.relatedAddons.addonAction).toBe('redirect');
  expect(res.data).toMatchSnapshot();
});
