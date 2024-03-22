import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { addConnectionPromiseMock } from 'datasources/line/assure/connectionPromise/mocks/handlers';

beforeEach(() => {
  server.resetHandlers(addConnectionPromiseMock);
});

test('returns success response for adding new connection promise line', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addConnectionPromiseLine(
          input: { lineNumber: "0271234567", primaryLine: true }
        ) {
          connectionPromiseId
          success
          message
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.addConnectionPromiseLine).toMatchInlineSnapshot(`
    Object {
      "code": 2000,
      "connectionPromiseId": "1-2DPDH4UQ",
      "message": "Success",
      "success": true,
    }
  `);
});

test('returns error response when connection promise is not supported for the line number', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addConnectionPromiseLine(
          input: { lineNumber: "123456", primaryLine: true }
        ) {
          connectionPromiseId
          success
          message
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.addConnectionPromiseLine).toMatchInlineSnapshot(`
    Object {
      "code": 4041,
      "connectionPromiseId": null,
      "message": "Connection Promise not supported for this line number.",
      "success": false,
    }
  `);
});
