import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getConnectionPromiseMock } from 'datasources/line/assure/connectionPromise/mocks/handlers';

beforeEach(() => {
  server.use(getConnectionPromiseMock);
});

test('returns connection promise configuration for the nominated line number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          connectionPromise(lineNumber: "0219876543") {
            lines {
              connectionPromiseId
              lineNumber
              primaryLine
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.connectionPromise).toMatchSnapshot();
});

test('returns error for invalid line number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          connectionPromise(lineNumber: "123456") {
            lines {
              connectionPromiseId
              lineNumber
              primaryLine
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeDefined();
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [GraphQLError: 400: Bad Request],
    ]
  `);
});
