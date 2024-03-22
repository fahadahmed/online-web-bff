import context from 'context';
import {
  addBundleMock,
  addBundleFailureMock,
} from 'datasources/shop/cart/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';

jest.mock('context');

beforeEach(() => {
  mockServer.use(addBundleMock);
});

test('returns success for adding item with a new bundle to the cart', async () => {
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
      mutation AddBundles {
        addBundles(
          input: {
            bundles: [
              {
                categoryId: "mobile_postpaid-pc_wx7fl"
                items: [
                  {
                    offerId: "offer_id_1"
                    productInstanceId: "1-2HAZ55550"
                    quantity: 1
                    action: add
                  }
                ]
                lineNumber: "123456"
              }
            ]
            processContext: NewOffer
            channel: personalshop
          }
        ) {
          success
          bundles {
            bundleId
            categoryId
            isAffected
            items {
              itemId
              offerId
            }
          }
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

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addBundles": Object {
        "bundles": Array [
          Object {
            "bundleId": "47e92b98-d01c-49f8-8b64-ec60b7d4685d",
            "categoryId": "mobile",
            "isAffected": true,
            "items": Array [
              Object {
                "itemId": "3c7b5de2-788f-4228-9495-966202657398",
                "offerId": "dollar_39_endless_mobile_plan-of_luqnb",
              },
              Object {
                "itemId": "cc6182b1-9350-452f-b4fb-d822dca218c4",
                "offerId": "trio_sim",
              },
            ],
          },
        ],
        "cart": Object {
          "bundles": Array [
            Object {
              "bundleId": "47e92b98-d01c-49f8-8b64-ec60b7d4685d",
              "items": Array [
                Object {
                  "itemId": "3c7b5de2-788f-4228-9495-966202657398",
                  "title": "Dollar 39 Endless Mobile Plan",
                },
                Object {
                  "itemId": "cc6182b1-9350-452f-b4fb-d822dca218c4",
                  "title": "Sim Card",
                },
              ],
            },
          ],
          "cartId": "success-cart-id",
          "id": "success-cart-id",
        },
        "success": true,
      },
    }
  `);

  expect(mockSetHeader).toBeCalledWith('set-cookie', [
    'CART.SUMMARY.st07=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJ0SWQiOiIxMGFiZjcwNi1hOTBkLTQwMjktYTAwNy0xYTQ0MjJmNzU4MjkiLCJjaGFubmVsIjp7ImlkIjoiYm9fbG92X3NhbGVzY2hhbm5lbF90ZWxlc2FsZXMiLCJuYW1lIjoiVGVsZXNhbGVzIn0sInByaWNlIjpbeyJ0eXBlIjoiUmVjdXJyaW5nIiwiZnJlcXVlbmN5Ijp7InBlcmlvZCI6Ik1vbnRoIiwidmFsdWUiOjF9LCJiYXNlUHJpY2UiOjk5Ljk5LCJlZmZlY3RpdmVQcmljZSI6OTB9LHsidHlwZSI6Ik9uZU9mZiIsImJhc2VQcmljZSI6NSwiZWZmZWN0aXZlUHJpY2UiOjB9XSwiaXRlbXNDb3VudCI6NCwiYWxnIjoiSFMyNTYifQ.4gVTxwYpuXdP2xSKk6ky7GM550VBF6i1IXtkCpcFxAc',
  ]);
});

test('returns success for adding item with a new bundle with an account number to the cart', async () => {
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
      mutation AddBundles {
        addBundles(
          input: {
            bundles: [
              {
                categoryId: "mobile_postpaid-pc_wx7fl"
                items: [
                  {
                    offerId: "offer_id_1"
                    quantity: 1
                    productInstanceId: "1-2HAZ55550"
                    action: add
                  }
                ]
                accountNumber: "123"
              }
            ]
            processContext: NewOffer
            channel: personalshop
          }
        ) {
          success
          bundles {
            bundleId
            categoryId
            isAffected
            items {
              itemId
              offerId
            }
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addBundles": Object {
        "bundles": Array [
          Object {
            "bundleId": "47e92b98-d01c-49f8-8b64-ec60b7d4685d",
            "categoryId": "mobile",
            "isAffected": true,
            "items": Array [
              Object {
                "itemId": "3c7b5de2-788f-4228-9495-966202657398",
                "offerId": "dollar_39_endless_mobile_plan-of_luqnb",
              },
              Object {
                "itemId": "cc6182b1-9350-452f-b4fb-d822dca218c4",
                "offerId": "trio_sim",
              },
            ],
          },
        ],
        "success": true,
      },
    }
  `);

  expect(mockSetHeader).toBeCalledWith('set-cookie', [
    'CART.SUMMARY.st07=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJ0SWQiOiIxMGFiZjcwNi1hOTBkLTQwMjktYTAwNy0xYTQ0MjJmNzU4MjkiLCJjaGFubmVsIjp7ImlkIjoiYm9fbG92X3NhbGVzY2hhbm5lbF90ZWxlc2FsZXMiLCJuYW1lIjoiVGVsZXNhbGVzIn0sInByaWNlIjpbeyJ0eXBlIjoiUmVjdXJyaW5nIiwiZnJlcXVlbmN5Ijp7InBlcmlvZCI6Ik1vbnRoIiwidmFsdWUiOjF9LCJiYXNlUHJpY2UiOjk5Ljk5LCJlZmZlY3RpdmVQcmljZSI6OTB9LHsidHlwZSI6Ik9uZU9mZiIsImJhc2VQcmljZSI6NSwiZWZmZWN0aXZlUHJpY2UiOjB9XSwiaXRlbXNDb3VudCI6NCwiYWxnIjoiSFMyNTYifQ.4gVTxwYpuXdP2xSKk6ky7GM550VBF6i1IXtkCpcFxAc',
  ]);
});

test('returns success for cancel subscription', async () => {
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
      mutation AddBundles {
        addBundles(
          input: {
            bundles: [
              {
                categoryId: "mobile_postpaid-pc_wx7fl"
                items: [
                  {
                    offerId: "1-2HAZ55550"
                    action: modify
                    productCharacteristics: { autoRenew: OFF }
                    productInstanceId: "1-2HAZ55550"
                  }
                ]
                lineNumber: "123456"
                accountNumber: "123"
              }
            ]
            processContext: ManageVAS
            channel: personalshop
          }
        ) {
          success
          cartId
          bundles {
            bundleId
            categoryId
            items {
              itemId
              offerId
            }
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addBundles": Object {
        "bundles": Array [
          Object {
            "bundleId": "47e92b98-d01c-49f8-8b64-ec60b7d4685d",
            "categoryId": "mobile",
            "items": Array [
              Object {
                "itemId": "3c7b5de2-788f-4228-9495-966202657398",
                "offerId": "dollar_39_endless_mobile_plan-of_luqnb",
              },
              Object {
                "itemId": "cc6182b1-9350-452f-b4fb-d822dca218c4",
                "offerId": "trio_sim",
              },
            ],
          },
        ],
        "cartId": "success-cart-id",
        "success": true,
      },
    }
  `);

  expect(mockSetHeader).not.toBeCalledWith();
});

test('when add bundle fails in BM', async () => {
  mockServer.use(addBundleFailureMock);

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
      mutation AddBundles {
        addBundles(
          input: {
            bundles: [
              {
                categoryId: "mobile_postpaid-pc_wx7fl"
                items: [
                  {
                    offerId: "offer_id_1"
                    action: modify
                    productCharacteristics: { autoRenew: OFF }
                    productInstanceId: "1-2HAZ55550"
                  }
                ]
                lineNumber: "123456"
                accountNumber: "123"
              }
            ]
            processContext: ManageVAS
            channel: personalshop
          }
        ) {
          success
          cartId
          bundles {
            bundleId
            categoryId
            items {
              itemId
              offerId
            }
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addBundles": Object {
        "bundles": null,
        "cartId": null,
        "success": false,
      },
    }
  `);

  expect(mockSetHeader).not.toBeCalledWith();
});
