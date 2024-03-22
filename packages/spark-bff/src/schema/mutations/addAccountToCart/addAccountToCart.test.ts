import context from 'context';
import { updateCartAccountMock } from 'datasources/shop/cart/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';

jest.mock('context');

beforeEach(() => {
  mockServer.use(updateCartAccountMock);
});

test('returns success for associating account to cart', async () => {
  const { mutate } = createTestClient();

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

  const res = await mutate({
    mutation: gql`
      mutation AddAccountToCart {
        addAccountToCart(
          input: {
            cartId: "test-cart-id"
            accountNumber: "test-account-number"
            channel: personalshop
          }
        ) {
          message
          code
          success
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addAccountToCart": Object {
        "code": 2000,
        "message": "Success",
        "success": true,
      },
    }
  `);
});
