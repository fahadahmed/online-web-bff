import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import handlers from 'datasources/product/offers/mocks/handlers';

beforeEach(() => {
  mockServer.use(...handlers);
});

test('Testing related ifp query, should return related ifp offers of the given cart (simulated)', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        relatedIfp(
          input: {
            bundles: [{ id: "bundle-1", items: [{ id: "iphone_256gb" }] }]
          }
        ) {
          id
          name
          description
          promotions {
            shortDescription
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.relatedIfp).toMatchSnapshot();
});

test('Testing related ifp query, should return related ifp offers of the given cart (real)', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        relatedIfp(
          input: {
            cartId: "mock-cart-id"
            bundles: [{ id: "bundle-1", items: [{ id: "iphone_128gb" }] }]
          }
        ) {
          id
          name
          description
          promotions {
            shortDescription
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.relatedIfp).toMatchSnapshot();
});

test('Testing related ifp query, should handle empty offer response', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        relatedIfp(
          input: { bundles: [{ id: "bundle-1", items: [{ id: "empty" }] }] }
        ) {
          id
          name
          description
          promotions {
            shortDescription
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.relatedIfp).toMatchSnapshot();
});
