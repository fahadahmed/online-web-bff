import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer, rest } from 'test/server';
import { singleAccountListHandler } from 'datasources/customer/accountsService/mocks/handlers';
import sparkIdPlanCartMock from 'datasources/shop/cart/mocks/get-cart-spark-id-plans.mock.json';
import { updateCartAccountMock as updateCartAccountHandler } from 'datasources/shop/cart/mocks/handlers';

const getCartHandler = rest.get(
  'http://testhost/v1/shopping/cart/:cartId',
  async (req, res, ctx) => {
    const cartId = req.params.cartId as string;

    if (cartId === 'success-spark-id-plans-cart-id') {
      return res(ctx.status(200), ctx.json(sparkIdPlanCartMock));
    }

    return res(ctx.status(404));
  },
);

test('updateCartAccount returns full cart respone', async () => {
  mockServer.use(
    getCartHandler,
    singleAccountListHandler,
    updateCartAccountHandler,
  );

  const { mutate } = createTestClient();

  const res = await mutate({
    mutation: gql`
      mutation UpdateCartAccountMutation {
        updateCartUser(
          cartId: "success-spark-id-plans-cart-id"
          segment: personal
        ) {
          cart {
            id
            cartId
            accountNumber
            bundles {
              bundleId
              items {
                itemId
                title
              }
            }
          }
          screen
          mandatoryAction
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchSnapshot();
});
