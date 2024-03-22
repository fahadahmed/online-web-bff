import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { updateSmartCapMock } from 'datasources/line/lineConfiguration/mocks/handlers';

beforeEach(() => {
  server.use(updateSmartCapMock);
});

test('returns success response for update smart cap', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updateSmartCap(
          input: {
            lineNumber: "033227715"
            type: SHARER_LIMIT
            cap: { unit: GB, value: 1.5 }
            isUncapped: false
          }
        ) {
          success
          message
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "updateSmartCap": Object {
        "code": 2000,
        "message": "Success.",
        "success": true,
      },
    }
  `);
});

test('returns error when providing invalid values', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updateSmartCap(
          input: {
            lineNumber: "InvalidRequest"
            type: SHARER_LIMIT
            cap: { unit: GB, value: 1.5 }
            isUncapped: false
          }
        ) {
          success
          message
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "updateSmartCap": Object {
        "code": 4002,
        "message": "General validation problems: invalid units, invalid type, missing cap value, etc.",
        "success": false,
      },
    }
  `);
});
