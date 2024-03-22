import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import {
  forbiddenGetPlansMpdComparisonHandler,
  getPlansMpdComparisonHandler,
} from 'datasources/product/offers/mocks/handlers';

beforeEach(() => {
  mockServer.use(getPlansMpdComparisonHandler);
});

test('returns the existing mpd lines for account', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        existingMpdLines(cartId: "success-cart-id", channel: personalshop) {
          lineNumber
          description
          currentPrice
          updatedPrice
          currentDiscountPercentage {
            appliedValue
            discountCategory
          }
          existingDiscountPercentage {
            appliedValue
            discountCategory
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test("cart's existingMpdLines returns empty array for guest user", async () => {
  mockServer.use(forbiddenGetPlansMpdComparisonHandler);
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        existingMpdLines(cartId: "success-cart-id", channel: personalshop) {
          lineNumber
          description
          currentPrice
          updatedPrice
          currentDiscountPercentage {
            appliedValue
            discountCategory
          }
          existingDiscountPercentage {
            appliedValue
            discountCategory
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data!.existingMpdLines).toMatchSnapshot();
});
