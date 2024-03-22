import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { updateConnectionPromiseMock } from 'datasources/line/assure/connectionPromise/mocks/handlers';

beforeEach(() => {
  server.resetHandlers(updateConnectionPromiseMock);
});

test('returns success response for updating a connection promise line', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updateConnectionPromiseLine(
          input: {
            lineNumber: "0271234567"
            connectionPromiseId: "1-2DPDH2UQ"
            primaryLine: true
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
  expect(res.data!.updateConnectionPromiseLine).toMatchInlineSnapshot(`
    Object {
      "code": 2000,
      "message": "Success",
      "success": true,
    }
  `);
});

test('returns failure response for updating a primary connection promise line to a secondary record', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updateConnectionPromiseLine(
          input: {
            lineNumber: "123456"
            connectionPromiseId: "1-2DPDH2UP"
            primaryLine: true
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
  expect(res.data!.updateConnectionPromiseLine).toMatchInlineSnapshot(`
    Object {
      "code": 4043,
      "message": "The primary Connection Promise cannot be changed to a secondary record.",
      "success": false,
    }
  `);
});
