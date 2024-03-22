import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { submitRecommendationHandler } from 'datasources/shop/cart/mocks/handlers';

test('submit recommendation successfully', async () => {
  server.use(submitRecommendationHandler);

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation SubmitRecommendationTestMutation(
        $input: SubmitRecommendationInput!
      ) {
        submitRecommendation(input: $input) {
          code
          message
          success
        }
      }
    `,
    variables: {
      input: {
        cartId: 'mock-cart-id',
        bundleId: 'mock-bundle-id',
        channel: 'personalss',
        recommendations: [
          {
            recommendationId: 'mock-recommendation-id',
            action: 'INFORM',
          },
        ],
      },
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "submitRecommendation": Object {
        "code": 2000,
        "message": "Success",
        "success": true,
      },
    }
  `);
});
