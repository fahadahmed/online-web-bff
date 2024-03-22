import context from 'context';
import { addItemsHandler } from 'datasources/shop/cart/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';

import { LoggerContext } from '../../../types';

jest.mock('context');

export const mockSetHeader = jest.fn();

export function setContext(loggerContext: LoggerContext) {
  (context as jest.Mock).mockReturnValue({
    res: { setHeader: mockSetHeader },
    loggerContext,
  });
}

afterEach(() => {
  jest.resetAllMocks();
});

test('returns success for adding item to an existing bundle to the cart', async () => {
  mockServer.use(addItemsHandler);

  const { mutate } = createTestClient();

  setContext({
    sourceIP: '',
    userID: '',
    clientName: '',
    sessionID: '',
    transactionID: '',
  });

  const res = await mutate({
    mutation: gql`
      mutation addItemsToBundle($input: AddItemsToBundleInput!) {
        addItemsToBundle(input: $input) {
          message
          code
          success
        }
      }
    `,
    variables: {
      input: {
        bundleId: 'fake-bundle-id',
        cartId: 'success-cart-id',
        items: [
          {
            itemId: 'abc1234',
            quantity: 1,
            action: 'modify',
          },
        ],
        channel: 'personalshop',
      },
    },
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addItemsToBundle": Object {
        "code": 2000,
        "message": "Success",
        "success": true,
      },
    }
  `);

  expect(mockSetHeader).toBeCalledWith('set-cookie', [
    'CART.SUMMARY.st07=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJ0SWQiOiIxMGFiZjcwNi1hOTBkLTQwMjktYTAwNy0xYTQ0MjJmNzU4MjkiLCJjaGFubmVsIjp7ImlkIjoiYm9fbG92X3NhbGVzY2hhbm5lbF90ZWxlc2FsZXMiLCJuYW1lIjoiVGVsZXNhbGVzIn0sInByaWNlIjpbeyJ0eXBlIjoiUmVjdXJyaW5nIiwiZnJlcXVlbmN5Ijp7InBlcmlvZCI6Ik1vbnRoIiwidmFsdWUiOjF9LCJiYXNlUHJpY2UiOjk5Ljk5LCJlZmZlY3RpdmVQcmljZSI6OTB9LHsidHlwZSI6Ik9uZU9mZiIsImJhc2VQcmljZSI6NSwiZWZmZWN0aXZlUHJpY2UiOjB9XSwiaXRlbXNDb3VudCI6NCwiYWxnIjoiSFMyNTYifQ.4gVTxwYpuXdP2xSKk6ky7GM550VBF6i1IXtkCpcFxAc',
  ]);

  mockSetHeader.mockReset();
});

test('returns failure for adding item to an existing bundle to the cart', async () => {
  mockServer.use(addItemsHandler);

  const { mutate } = createTestClient();

  setContext({
    sourceIP: '',
    userID: '',
    clientName: '',
    sessionID: '',
    transactionID: '',
  });

  const res = await mutate({
    mutation: gql`
      mutation addItemsToBundle($input: AddItemsToBundleInput!) {
        addItemsToBundle(input: $input) {
          message
          code
          success
        }
      }
    `,
    variables: {
      input: {
        bundleId: 'fake-bundle-id',
        cartId: 'fail-cart-id',
        items: [
          {
            itemId: 'abc1234',
            quantity: 1,
            action: 'modify',
          },
        ],
        channel: 'personalshop',
      },
    },
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addItemsToBundle": Object {
        "code": 9001,
        "message": "Internal server error",
        "success": false,
      },
    }
  `);

  expect(mockSetHeader).not.toBeCalled();
});
