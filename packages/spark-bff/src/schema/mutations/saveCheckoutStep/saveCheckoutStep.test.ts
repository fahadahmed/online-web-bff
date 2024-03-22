import { getCartByIdMock } from 'datasources/shop/cart/mocks/handlers';
import {
  saveCheckoutStepSuccessHandler,
  getCheckoutDataHandler,
  getCheckoutStructureHandler,
} from 'datasources/shop/checkout/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import db from 'datasources/shop/checkout/mocks/db';

beforeEach(() => {
  db.clearDB();
});

afterAll(() => {
  db.clearDB();
});

test('saveCheckoutStep mutation responds with standard success shape', async () => {
  server.use(saveCheckoutStepSuccessHandler);

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation SaveCheckoutStep($input: SaveCheckoutStepInput!) {
        saveCheckoutStep(input: $input) {
          code
          message
          success
        }
      }
    `,
    variables: {
      input: {
        bundleId: 'fake-bundle-id',
        cartId: 'fake-cart-id',
        channel: 'personalshop',
        rootFields: [
          {
            name: 'fake-field',
            value: 'fake-value',
          },
        ],
        options: [
          {
            name: 'chooseNumber',
            value: 'Select a new number',
            parentOption: null,
            fields: [],
          },
          {
            name: 'new_mobile_number',
            value: '021123456',
            parentOption: {
              name: 'chooseNumber',
              value: 'Select a new number',
            },
            fields: [],
          },
        ],
        itemId: 'fake-item-id',
        sectionId: 'success-section-id',
        stepId: 'fake-step-id',
      },
    },
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "saveCheckoutStep": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);
});

test('saveCheckoutStep mutation responds with standard error shape', async () => {
  server.use(saveCheckoutStepSuccessHandler);

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation SaveCheckoutStep($input: SaveCheckoutStepInput!) {
        saveCheckoutStep(input: $input) {
          code
          message
          success
        }
      }
    `,
    variables: {
      input: {
        cartId: 'bad-cart-id',
        channel: 'personalshop',
        sectionId: 'fail-section-id',
        stepId: 'fake-step-id',
        rootFields: [],
        options: [
          {
            parentOption: null,
            name: 'chooseNumber',
            value: 'Select a new number',
            fields: [],
          },
        ],
      },
    },
  });

  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "saveCheckoutStep": Object {
        "code": 9001,
        "message": "Internal server error",
        "success": false,
      },
    }
  `);
});

test('SaveStep failing due to data validation', async () => {
  server.use(saveCheckoutStepSuccessHandler);

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation SaveCheckoutStep($input: SaveCheckoutStepInput!) {
        saveCheckoutStep(input: $input) {
          code
          message
          success
        }
      }
    `,
    variables: {
      input: {
        cartId: 'failed-verification-cart-id',
        channel: 'personalshop',
        sectionId: 'fail-section-id',
        stepId: 'fake-step-id',
        rootFields: [],
        options: [
          {
            parentOption: null,
            name: 'chooseNumber',
            value: 'Select a new number',
            fields: [],
          },
        ],
      },
    },
  });
  expect(res.errors).not.toBeDefined();
  expect(res.data).toBeDefined();
});

test('saveCheckoutStep mutation responds with standard success shape', async () => {
  server.use(
    saveCheckoutStepSuccessHandler,
    getCartByIdMock,
    getCheckoutDataHandler,
    getCheckoutStructureHandler,
  );

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation SaveCheckoutStep($input: SaveCheckoutStepInput!) {
        saveCheckoutStep(input: $input) {
          code
          message
          success
          cart(cartId: "success-cart-id", channel: personalshop) {
            bundles {
              bundleId
            }
          }
          checkoutData(cartId: "success-cart-id", channel: personalshop) {
            sections {
              sectionId
            }
          }
          checkoutStructure(cartId: "success-cart-id", channel: personalshop) {
            sections {
              sectionId
            }
          }
        }
      }
    `,
    variables: {
      input: {
        bundleId: 'fake-bundle-id',
        cartId: 'fake-cart-id',
        channel: 'personalshop',
        rootFields: [
          {
            name: 'fake-field',
            value: 'fake-value',
          },
        ],
        options: [],
        itemId: 'fake-item-id',
        sectionId: 'success-section-id',
        stepId: 'fake-step-id',
      },
    },
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "saveCheckoutStep": Object {
        "cart": Object {
          "bundles": Array [
            Object {
              "bundleId": "f4abe282-ac3a-4ba9-9b84-655486784325",
            },
            Object {
              "bundleId": "f2b09286-4a6c-4415-8571-c418e8b5ac2b",
            },
            Object {
              "bundleId": "bb7ee884-e02a-43c0-bcca-703ed0ec0c4d",
            },
            Object {
              "bundleId": "66eb43c7-295b-4d86-ad3d-5e09ce43fc37",
            },
          ],
        },
        "checkoutData": Object {
          "sections": Array [],
        },
        "checkoutStructure": Object {
          "sections": Array [
            Object {
              "sectionId": "setup",
            },
            Object {
              "sectionId": "prepaidPersonalDetails",
            },
            Object {
              "sectionId": "review",
            },
            Object {
              "sectionId": "payment",
            },
          ],
        },
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);
});
