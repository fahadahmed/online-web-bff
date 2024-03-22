import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { deleteConnectionPromiseMock } from 'datasources/line/assure/connectionPromise/mocks/handlers';

beforeEach(() => {
  server.resetHandlers(deleteConnectionPromiseMock);
});

test('returns success response for deleting a connection promise line', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        deleteConnectionPromiseLine(
          input: { lineNumber: "0271234567", connectionPromiseId: "1-2DPDH2UQ" }
        ) {
          success
          message
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.deleteConnectionPromiseLine).toMatchInlineSnapshot(`
    Object {
      "code": 2000,
      "message": "success",
      "success": true,
    }
  `);
});

test('returns failure response for deleting the primary connection promise line', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        deleteConnectionPromiseLine(
          input: { lineNumber: "123456", connectionPromiseId: "1-2DPDH2UQ" }
        ) {
          success
          message
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.deleteConnectionPromiseLine).toMatchInlineSnapshot(`
    Object {
      "code": 4042,
      "message": "The primary Connection Promise record cannot be deleted if a secondary record exists.",
      "success": false,
    }
  `);
});
