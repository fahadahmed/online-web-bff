import context from 'context';
import { deleteItemFromBundleMock } from 'datasources/shop/cart/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

jest.mock('context');

beforeEach(() => {
  server.use(deleteItemFromBundleMock);
});

afterAll(() => {
  jest.resetAllMocks();
});

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

test('returns success response for delete item from a cart bundle on request succeed', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        deleteItemFromBundle(
          input: {
            cartId: "success-cart-id"
            channel: personalshop
            bundleId: "bundle2"
            itemId: "bundle2-item2"
          }
        ) {
          message
          code
          success
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "deleteItemFromBundle": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);

  expect(mockSetHeader).toBeCalledWith('set-cookie', [
    'CART.SUMMARY.local=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJ0SWQiOiIxMGFiZjcwNi1hOTBkLTQwMjktYTAwNy0xYTQ0MjJmNzU4MjkiLCJjaGFubmVsIjp7ImlkIjoiYm9fbG92X3NhbGVzY2hhbm5lbF90ZWxlc2FsZXMiLCJuYW1lIjoiVGVsZXNhbGVzIn0sInByaWNlIjpbeyJ0eXBlIjoiUmVjdXJyaW5nIiwiZnJlcXVlbmN5Ijp7InBlcmlvZCI6Ik1vbnRoIiwidmFsdWUiOjF9LCJiYXNlUHJpY2UiOjk5Ljk5LCJlZmZlY3RpdmVQcmljZSI6OTB9LHsidHlwZSI6Ik9uZU9mZiIsImJhc2VQcmljZSI6NSwiZWZmZWN0aXZlUHJpY2UiOjB9XSwiaXRlbXNDb3VudCI6NCwiYWxnIjoiSFMyNTYifQ.4gVTxwYpuXdP2xSKk6ky7GM550VBF6i1IXtkCpcFxAc',
  ]);
});

test('returns error response for delete item from cart bundle on request failed', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        deleteItemFromBundle(
          input: {
            cartId: "error-cart-id"
            channel: personalshop
            bundleId: "error-bundle-id"
            itemId: "error-item-id"
          }
        ) {
          message
          code
          success
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "deleteItemFromBundle": Object {
        "code": 9001,
        "message": "Internal server error",
        "success": false,
      },
    }
  `);
});
