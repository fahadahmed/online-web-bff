import { createTestClient, gql } from 'test/apolloTestUtils';

test('upfrontPayment query responds with correct mocked data', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query UpfrontPaymentQuery($cartId: String!, $channel: CartChannel!) {
        upfrontPayment(cartId: $cartId, channel: $channel) {
          items {
            itemId
            title
            description
            price
            imagePath
          }
          monthlyIfpAmount
          requiredUpfrontAmount
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
