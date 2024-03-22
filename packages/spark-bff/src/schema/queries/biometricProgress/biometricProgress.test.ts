import { createTestClient, gql } from 'test/apolloTestUtils';

test('biometricProgress query responds with correct mocked data', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query BiometricProgressQuery($cartId: String!, $channel: CartChannel!) {
        biometricProgress(cartId: $cartId, channel: $channel) {
          infoBanner
          isContinueEnabled
          showResend
          steps {
            stepId
            label
            status
          }
        }
      }
    `,
    variables: {
      cartId: 'success-cart-id',
      channel: 'personalshop',
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
