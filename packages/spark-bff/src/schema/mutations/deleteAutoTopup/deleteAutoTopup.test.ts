import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { deleteAutoTopupMock } from 'datasources/finance/paymentService/topup/mocks/handlers';

beforeEach(() => {
  server.use(deleteAutoTopupMock);
});

test('returns messages on success for delete auto topup', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        deleteAutoTopup(input: { lineNumber: "0271234567" }) {
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
      "deleteAutoTopup": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
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
        deleteAutoTopup(input: { lineNumber: "1271234567" }) {
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
      "deleteAutoTopup": Object {
        "code": 4000,
        "message": "Request validation failure.",
        "success": false,
      },
    }
  `);
});
