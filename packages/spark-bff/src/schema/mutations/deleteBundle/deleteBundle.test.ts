import context from 'context';
import { deleteBundleMock } from 'datasources/shop/cart/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

jest.mock('context');

beforeEach(() => {
  server.use(deleteBundleMock);
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

test('returns success response for delete cart bundle on request succeed', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        deleteBundle(
          input: {
            cartId: "success-cart-id"
            channel: personalshop
            bundleId: "dollar_59_endless_mobile_plan-of_tskxp"
          }
        ) {
          message
          code
          success
          cart {
            id
            cartId
            bundles {
              bundleId
              items {
                itemId
                title
              }
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "deleteBundle": Object {
        "cart": Object {
          "bundles": Array [
            Object {
              "bundleId": "f4abe282-ac3a-4ba9-9b84-655486784325",
              "items": Array [
                Object {
                  "itemId": "f8f3f20a-e100-4de5-b013-6effd77fe792",
                  "title": "$79.99 Endless Plan",
                },
                Object {
                  "itemId": "7b7360df-f79e-4ee5-9e03-a653d4874315",
                  "title": "Spotify Premium",
                },
                Object {
                  "itemId": "f68a7ca0-e6e4-4b52-966c-29b6fd63adee",
                  "title": "iPhone 13 Pro 128GB - Graphite",
                },
                Object {
                  "itemId": "109c861e-e438-4b47-a525-57566f290904",
                  "title": "Interest free payment over 24 months",
                },
              ],
            },
            Object {
              "bundleId": "f2b09286-4a6c-4415-8571-c418e8b5ac2b",
              "items": Array [
                Object {
                  "itemId": "34ea9285-150a-4f62-a6ff-15cfcbcb0e8f",
                  "title": "$20 Prepaid Value Pack",
                },
                Object {
                  "itemId": "2ae5a775-dad8-44df-8ec0-88bee05d464b",
                  "title": "Spotify Premium",
                },
              ],
            },
            Object {
              "bundleId": "bb7ee884-e02a-43c0-bcca-703ed0ec0c4d",
              "items": Array [
                Object {
                  "itemId": "ce7b812f-88a5-47b3-9277-f94bbe095434",
                  "title": "Neon",
                },
              ],
            },
            Object {
              "bundleId": "66eb43c7-295b-4d86-ad3d-5e09ce43fc37",
              "items": Array [
                Object {
                  "itemId": "2de00c16-9e22-40af-98d2-784b64821baa",
                  "title": "$59.99 Endless Plan",
                },
                Object {
                  "itemId": "e258d2d9-4bf5-4686-b870-239072ee1f8d",
                  "title": "Spotify Premium",
                },
              ],
            },
          ],
          "cartId": "success-cart-id",
          "id": "success-cart-id",
        },
        "code": 2000,
        "message": "Success",
        "success": true,
      },
    }
  `);

  expect(mockSetHeader).toBeCalledWith('set-cookie', [
    'CART.SUMMARY.st07=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJ0SWQiOiIxMGFiZjcwNi1hOTBkLTQwMjktYTAwNy0xYTQ0MjJmNzU4MjkiLCJjaGFubmVsIjp7ImlkIjoiYm9fbG92X3NhbGVzY2hhbm5lbF90ZWxlc2FsZXMiLCJuYW1lIjoiVGVsZXNhbGVzIn0sInByaWNlIjpbeyJ0eXBlIjoiUmVjdXJyaW5nIiwiZnJlcXVlbmN5Ijp7InBlcmlvZCI6Ik1vbnRoIiwidmFsdWUiOjF9LCJiYXNlUHJpY2UiOjk5Ljk5LCJlZmZlY3RpdmVQcmljZSI6OTB9LHsidHlwZSI6Ik9uZU9mZiIsImJhc2VQcmljZSI6NSwiZWZmZWN0aXZlUHJpY2UiOjB9XSwiaXRlbXNDb3VudCI6NCwiYWxnIjoiSFMyNTYifQ.4gVTxwYpuXdP2xSKk6ky7GM550VBF6i1IXtkCpcFxAc',
  ]);
});

test('returns error response for delete cart bundle on request failed', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        deleteBundle(
          input: {
            cartId: "error-cart-id"
            channel: personalshop
            bundleId: "error-bundle-id"
          }
        ) {
          message
          code
          success
        }
      }
    `,
  });
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [GraphQLError: 404: Not Found],
    ]
  `);
  expect(res.data).toBeNull();
});
